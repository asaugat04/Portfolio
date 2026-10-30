import { getPortfolio } from "@/services/content";
import { routes } from "@/constants/routes";
import { clientEnv } from "@/constants/env.client";
import { apiError, HttpError } from "@/lib/api/errors";

export async function GET() {
  try {
    const resume = (await getPortfolio()).resume[0]?.data;
    if (!resume) throw new HttpError(404, "Résumé not found");
    const source = new URL(resume.url, clientEnv.NEXT_PUBLIC_SITE_URL);
    if (
      source.origin === new URL(clientEnv.NEXT_PUBLIC_SITE_URL).origin &&
      source.pathname === routes.resumeDownload
    )
      throw new HttpError(
        400,
        "The résumé URL must point to the PDF file itself",
      );
    const upstream = await fetch(source, {
      cache: "no-store",
      signal: AbortSignal.timeout(15000),
    });
    if (
      !upstream.ok ||
      !upstream.headers.get("content-type")?.includes("application/pdf")
    )
      throw new HttpError(502, "Unable to download résumé");
    const filename = encodeURIComponent(resume.filename).replace(
      /['()*]/g,
      (character) => `%${character.charCodeAt(0).toString(16).toUpperCase()}`,
    );
    return new Response(upstream.body, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="resume.pdf"; filename*=UTF-8''${filename}`,
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    return apiError(error);
  }
}
