import { revalidatePath } from "next/cache";
import { requireAdminRequest } from "@/lib/admin";
import { apiError, entryBody } from "@/lib/api/errors";
import { sectionSchema } from "@/schemas/content";
import { saveEntry, deleteEntry } from "@/services/content";
import { routes } from "@/constants/routes";

type Context = { params: Promise<{ section: string; id: string }> };
export async function PATCH(request: Request, { params }: Context) {
  try {
    await requireAdminRequest(request);
    const { section: raw, id } = await params;
    const { input, file } = await entryBody(request);
    const entry = await saveEntry(sectionSchema.parse(raw), input, id, file);
    revalidatePath(routes.home);
    revalidatePath(routes.admin, "layout");
    return Response.json({ id: entry.id });
  } catch (error) {
    return apiError(error);
  }
}
export async function DELETE(request: Request, { params }: Context) {
  try {
    await requireAdminRequest(request);
    const { section, id } = await params;
    await deleteEntry(sectionSchema.parse(section), id);
    revalidatePath(routes.home);
    revalidatePath(routes.admin, "layout");
    return Response.json({ ok: true });
  } catch (error) {
    return apiError(error);
  }
}
