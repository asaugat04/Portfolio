import "server-only";
import { getDb } from "@/lib/db";
import { destroyAsset } from "@/lib/cloudinary";
import { serverEnv } from "@/constants/env.server";

// shortcut: failed cleanup retries on the next content change; add a scheduled sweep if unattended cleanup is needed.
export async function cleanupAssets() {
  try {
    const db = getDb();
    const [entries, assets] = await Promise.all([
      db.contentEntry.findMany({ select: { data: true } }),
      db.mediaAsset.findMany({
        where: {
          OR: [
            { pending: false },
            { createdAt: { lt: new Date(Date.now() - 3600000) } },
          ],
        },
      }),
    ]);
    const referenced = new Set(
      entries.flatMap(({ data }) =>
        data && typeof data === "object" && !Array.isArray(data)
          ? Object.values(data).filter((value) => typeof value === "string")
          : [],
      ),
    );
    const cloudPaths = [...referenced].flatMap((value) => {
      try {
        const url = new URL(value);
        return url.origin === "https://res.cloudinary.com" &&
          url.pathname.startsWith(
            `/${serverEnv.CLOUDINARY_CLOUD_NAME}/image/upload/`,
          )
          ? [decodeURIComponent(url.pathname).replace(/\.[^/.]+$/, "")]
          : [];
      } catch {
        return [];
      }
    });
    for (const asset of assets) {
      if (
        (asset.url && referenced.has(asset.url)) ||
        cloudPaths.some((path) => path.endsWith(`/${asset.publicId}`))
      )
        continue;
      try {
        await destroyAsset(asset.publicId);
        await db.mediaAsset.deleteMany({ where: { publicId: asset.publicId } });
      } catch {
        console.error("Asset cleanup will retry", asset.publicId);
      }
    }
  } catch {
    console.error("Unable to run asset cleanup");
  }
}
