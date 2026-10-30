"use client";
import { useId, useState } from "react";
import { Upload } from "lucide-react";
import { uploadLimits } from "@/constants/content";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function UploadField({
  id,
  value,
  onChange,
  file,
  onFileChange,
  pdf = false,
}: {
  id: string;
  value: string;
  onChange: (value: string) => void;
  file?: File;
  onFileChange: (file?: File) => void;
  pdf?: boolean;
}) {
  const fileId = useId();
  const [error, setError] = useState("");
  function select(file?: File) {
    if (!file) return;
    if (file.size > (pdf ? uploadLimits.pdf : uploadLimits.image)) {
      setError("Maximum file size is 4 MB.");
      return;
    }
    setError("");
    onFileChange(file);
  }
  return (
    <div className="space-y-2">
      <Input
        id={id}
        value={value}
        onChange={(event) => {
          onFileChange(undefined);
          onChange(event.target.value);
        }}
        placeholder="Asset URL or local path"
      />
      <Label
        htmlFor={fileId}
        className="flex w-fit cursor-pointer items-center gap-2 rounded-md border px-3 py-2 text-sm font-normal"
      >
        <Upload className="size-4" />
        Choose {pdf ? "PDF" : "image"}
      </Label>
      <input
        id={fileId}
        className="sr-only"
        type="file"
        accept={pdf ? "application/pdf" : "image/jpeg,image/png,image/webp"}
        onChange={(event) => {
          select(event.target.files?.[0]);
          event.target.value = "";
        }}
      />
      <p className="text-xs text-neutral-500">
        {pdf ? "PDF" : "JPG, PNG, WebP"} · up to 4 MB
      </p>
      {file && (
        <p className="text-sm" role="status">
          {file.name} — uploads when you save.
        </p>
      )}
      {error && (
        <p role="alert" className="text-sm text-red-600">
          {error}
        </p>
      )}
      {value && !pdf && !file && (
        <img
          src={value}
          alt="Current upload"
          className="mt-2 max-h-32 max-w-full rounded border object-contain"
        />
      )}
      {value && pdf && !file && (
        <a
          href={value}
          target="_blank"
          rel="noreferrer"
          className="text-sm underline"
        >
          Open current résumé
        </a>
      )}
    </div>
  );
}
