import "server-only";
import { v2 as cloudinary } from "cloudinary";
import { serverEnv } from "@/constants/env.server";
import { uploadLimits } from "@/constants/content";
import { HttpError } from "@/lib/api/errors";

cloudinary.config({
  cloud_name: serverEnv.CLOUDINARY_CLOUD_NAME,
  api_key: serverEnv.CLOUDINARY_API_KEY,
  api_secret: serverEnv.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function uploadAsset(file: File, pdf: boolean, publicId: string) {
  if (
    pdf
      ? file.type !== "application/pdf"
      : !["image/jpeg", "image/png", "image/webp"].includes(file.type)
  )
    throw new HttpError(
      400,
      pdf ? "Choose a PDF" : "Choose a JPG, PNG, or WebP image",
    );
  if (file.size > (pdf ? uploadLimits.pdf : uploadLimits.image))
    throw new HttpError(413, "File too large");
  const bytes = Buffer.from(await file.arrayBuffer());
  const header = bytes.subarray(0, 12);
  const valid = pdf
    ? header.subarray(0, 5).toString() === "%PDF-"
    : (file.type === "image/png" &&
        header
          .subarray(0, 8)
          .equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))) ||
      (file.type === "image/jpeg" &&
        header[0] === 255 &&
        header[1] === 216 &&
        header[2] === 255) ||
      (file.type === "image/webp" &&
        header.subarray(0, 4).toString() === "RIFF" &&
        header.subarray(8).toString() === "WEBP");
  if (!valid) throw new HttpError(400, "File contents do not match its type");
  return new Promise<{ publicId: string; url: string }>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        public_id: publicId,
        resource_type: "image",
        format: pdf ? "pdf" : undefined,
        allowed_formats: pdf ? ["pdf"] : ["jpg", "jpeg", "png", "webp"],
      },
      (error, result) => {
        if (error || !result) reject(new Error("Upload failed"));
        else resolve({ publicId: result.public_id, url: result.secure_url });
      },
    );
    stream.end(bytes);
  });
}

export async function destroyAsset(publicId: string) {
  const result = await cloudinary.uploader.destroy(publicId, {
    resource_type: "image",
    invalidate: true,
  });
  if (result.result !== "ok" && result.result !== "not found")
    throw new Error("Asset cleanup failed");
}
