import { revalidatePath } from "next/cache";
import { requireAdminRequest } from "@/lib/admin";
import { apiError, entryBody } from "@/lib/api/errors";
import { sectionSchema } from "@/schemas/content";
import { saveEntry } from "@/services/content";
import { routes } from "@/constants/routes";

type Context = { params: Promise<{ section: string }> };
export async function POST(request: Request, { params }: Context) {
  try {
    await requireAdminRequest(request);
    const section = sectionSchema.parse((await params).section);
    const { input, file } = await entryBody(request);
    const entry = await saveEntry(section, input, undefined, file);
    revalidatePath(routes.home);
    revalidatePath(routes.admin, "layout");
    return Response.json({ id: entry.id }, { status: 201 });
  } catch (error) {
    return apiError(error);
  }
}
