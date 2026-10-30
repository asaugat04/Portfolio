CREATE TABLE "MediaAsset" (
    "publicId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "pending" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "MediaAsset_pkey" PRIMARY KEY ("publicId")
);
CREATE UNIQUE INDEX "MediaAsset_url_key" ON "MediaAsset"("url");
