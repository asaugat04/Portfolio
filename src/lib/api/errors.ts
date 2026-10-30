import "server-only";
import { ZodError } from "zod";
import { Prisma } from "@/generated/prisma/client";
import { jsonBodyLimit, uploadLimits } from "@/constants/content";

export class HttpError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}

export function apiError(error: unknown) {
  if (error instanceof HttpError)
    return Response.json({ error: error.message }, { status: error.status });
  if (error instanceof ZodError)
    return Response.json(
      { error: error.issues[0]?.message ?? "Invalid input" },
      { status: 400 },
    );
  if (error instanceof SyntaxError)
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  if (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === "P2025"
  )
    return Response.json({ error: "Not found" }, { status: 404 });
  console.error(
    "API request failed",
    error instanceof Prisma.PrismaClientKnownRequestError
      ? `${error.name}: ${error.code}`
      : error instanceof Error
        ? error.name
        : "Unknown error",
  );
  return Response.json(
    { error: "Service temporarily unavailable. Please try again." },
    { status: 503 },
  );
}

async function readBody(request: Request, limit: number) {
  if (Number(request.headers.get("content-length")) > limit)
    throw new HttpError(413, "Request too large");
  const reader = request.body?.getReader();
  if (!reader) return new Uint8Array();
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > limit) {
        await reader.cancel();
        throw new HttpError(413, "Request too large");
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }
  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return bytes;
}

export async function jsonBody(request: Request) {
  return JSON.parse(
    new TextDecoder().decode(await readBody(request, jsonBodyLimit)),
  );
}

export async function entryBody(
  request: Request,
): Promise<{ input: unknown; file?: File }> {
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.startsWith("multipart/form-data"))
    return { input: await jsonBody(request) };
  const bytes = await readBody(
    request,
    Math.max(uploadLimits.image, uploadLimits.pdf) + jsonBodyLimit,
  );
  let form: FormData;
  try {
    form = await new Response(bytes, {
      headers: { "content-type": contentType },
    }).formData();
  } catch {
    throw new HttpError(400, "Invalid multipart body");
  }
  const input = form.get("entry");
  const file = form.get("file");
  if (typeof input !== "string" || (file !== null && !(file instanceof File)))
    throw new HttpError(400, "Invalid entry");
  if (new TextEncoder().encode(input).byteLength > jsonBodyLimit)
    throw new HttpError(413, "Entry data too large");
  return {
    input: JSON.parse(input),
    file: file instanceof File ? file : undefined,
  };
}
