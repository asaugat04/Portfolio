import { revalidatePath } from "next/cache";
import { requireAdminRequest } from "@/lib/admin";
import { apiError } from "@/lib/api/errors";
import { notifyMessage } from "@/services/messages";
import { routes } from "@/constants/routes";
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await requireAdminRequest(request);
    const { id } = await params;
    await notifyMessage(id);
    revalidatePath(routes.admin, "layout");
    return Response.json({ ok: true });
  } catch (error) {
    return apiError(error);
  }
}
