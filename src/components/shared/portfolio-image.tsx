"use client";
import Image, { type ImageProps, type ImageLoaderProps } from "next/image";

function cloudinaryLoader({ src, width }: ImageLoaderProps) {
  return src.replace(
    "/image/upload/",
    `/image/upload/c_limit,w_${width},q_auto,f_auto/`,
  );
}

export function PortfolioImage({
  src,
  alt,
  ...props
}: Omit<ImageProps, "src" | "loader" | "width" | "height"> & {
  src: string;
  width: number;
  height: number;
}) {
  const cloudinary =
    /^https:\/\/res\.cloudinary\.com\/[^/]+\/image\/upload\//.test(src);
  return (
    <Image
      {...props}
      src={src}
      alt={alt}
      loader={cloudinary ? cloudinaryLoader : undefined}
      unoptimized={!cloudinary && /^https?:/.test(src)}
    />
  );
}
