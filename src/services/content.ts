import "server-only";
import { randomUUID } from "node:crypto";
import { unstable_cache, revalidateTag } from "next/cache";
import { after } from "next/server";
import { z } from "zod";
import { uploadAsset } from "@/lib/cloudinary";
import { cleanupAssets } from "@/services/assets";
import {
  sectionKeys,
  sections,
  portfolioCacheTag,
  cloudinaryFolder,
} from "@/constants/content";
import { getDb } from "@/lib/db";
import { HttpError } from "@/lib/api/errors";
import {
  contentSchemas,
  entryInputSchema,
  type ContentEntry,
  type Portfolio,
  type Section,
} from "@/schemas/content";

function parseEntry<K extends Section>(
  section: K,
  entry: { id: string; position: number; visible: boolean; data: unknown },
): ContentEntry<K> {
  return {
    id: entry.id,
    section,
    position: entry.position,
    visible: entry.visible,
    data: contentSchemas[section].parse(entry.data),
  } as ContentEntry<K>;
}

export async function listEntries<K extends Section>(
  section: K,
): Promise<ContentEntry<K>[]> {
  return (
    await getDb().contentEntry.findMany({
      where: { section },
      orderBy: [{ position: "asc" }, { id: "asc" }],
    })
  ).map((entry) => parseEntry(section, entry));
}

export const getPortfolio = unstable_cache(
  async (): Promise<Portfolio> => {
    const entries = await getDb().contentEntry.findMany({
      where: { visible: true },
      orderBy: [{ position: "asc" }, { id: "asc" }],
    });
    return Object.fromEntries(
      sectionKeys.map((section) => [
        section,
        entries
          .filter((entry) => entry.section === section)
          .map((entry) => parseEntry(section, entry)),
      ]),
    ) as Portfolio;
  },
  ["portfolio"],
  { revalidate: 3600, tags: [portfolioCacheTag] },
);

export async function saveEntry(
  section: Section,
  input: unknown,
  id?: string,
  file?: File,
) {
  const { data, ...meta } = entryInputSchema.parse(input);
  const assetField = section === "resume" ? "url" : "image";
  const schema = contentSchemas[section];
  if (file && !(assetField in schema.shape))
    throw new HttpError(400, "This section does not accept files");
  const values = (
    file ? schema.extend({ [assetField]: z.string().optional() }) : schema
  ).parse(data);
  const db = getDb();
  if (id && !(await db.contentEntry.findFirst({ where: { id, section } })))
    throw new HttpError(404, "Entry not found");
  let asset: { publicId: string; url: string } | undefined;
  let publicId: string | undefined;
  try {
    if (file) {
      publicId = `${cloudinaryFolder}/${randomUUID()}`;
      await db.mediaAsset.create({ data: { publicId } });
      asset = await uploadAsset(file, section === "resume", publicId);
    }
    const validated = schema.parse(
      asset ? { ...values, [assetField]: asset.url } : values,
    );
    const operation = sections[section].singleton
      ? db.contentEntry.upsert({
          where: { id: section },
          create: { id: section, section, ...meta, data: validated },
          update: { ...meta, data: validated },
        })
      : id
        ? db.contentEntry.update({
            where: { id },
            data: { ...meta, data: validated },
          })
        : db.contentEntry.create({
            data: { section, ...meta, data: validated },
          });
    const saved = asset
      ? (
          await db.$transaction([
            operation,
            db.mediaAsset.update({
              where: { publicId: asset.publicId },
              data: { pending: false, url: asset.url },
            }),
          ])
        )[0]
      : await operation;
    revalidateTag(portfolioCacheTag, { expire: 0 });
    return saved;
  } catch (error) {
    if (publicId)
      await db.mediaAsset
        .updateMany({
          where: { publicId },
          data: { pending: false },
        })
        .catch(() => {
          console.error("Asset remains pending for cleanup", publicId);
        });
    throw error;
  } finally {
    after(cleanupAssets);
  }
}

export async function deleteEntry(section: Section, id: string) {
  if (sections[section].singleton)
    throw new HttpError(
      400,
      "This section cannot be deleted. Use its visibility control instead.",
    );
  const result = await getDb().contentEntry.deleteMany({
    where: { section, id },
  });
  if (!result.count) throw new HttpError(404, "Entry not found");
  revalidateTag(portfolioCacheTag, { expire: 0 });
  after(cleanupAssets);
}
