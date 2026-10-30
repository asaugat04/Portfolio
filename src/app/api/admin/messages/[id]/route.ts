import { revalidatePath } from "next/cache";
import { requireAdminRequest } from "@/lib/admin";
import { apiError, jsonBody } from "@/lib/api/errors";
import { getDb } from "@/lib/db";
import { messageUpdateSchema } from "@/schemas/contact";
import { routes } from "@/constants/routes";

type Context = { params: Promise<{ id: string }> };
export async function PATCH(request: Request, { params }: Context) {
  try {
    await requireAdminRequest(request);
    const { read } = messageUpdateSchema.parse(await jsonBody(request));
    await getDb().message.update({
      where: { id: (await params).id },
      data: { readAt: read ? new Date() : null },
    });
    revalidatePath(routes.admin, "layout");
    return Response.json({ ok: true });
  } catch (error) {
    return apiError(error);
  }
}
export async function DELETE(request: Request, { params }: Context) {
  try {
    await requireAdminRequest(request);
    await getDb().message.delete({ where: { id: (await params).id } });
    revalidatePath(routes.admin, "layout");
    return Response.json({ ok: true });
  } catch (error) {
    return apiError(error);
  }
}
