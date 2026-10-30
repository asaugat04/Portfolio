import { getAuth } from "@/lib/auth";
import { apiError } from "@/lib/api/errors";

async function handler(request: Request) {
  try {
    return await getAuth().handler(request);
  } catch (error) {
    return apiError(error);
  }
}
export { handler as GET, handler as POST };
