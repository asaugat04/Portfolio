"use client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { UploadField } from "@/components/admin/upload-field";

export type EditorField = {
  key: string;
  label: string;
  type?:
    | "textarea"
    | "lines"
    | "image"
    | "pdf"
    | "email"
    | "url"
    | "checkbox"
    | "icon";
};

type Props = {
  field: EditorField;
  id: string;
  value: string | boolean;
  onChange: (value: string | boolean) => void;
  file?: File;
  onFileChange: (file?: File) => void;
};

function FieldControl({
  field,
  id,
  value,
  onChange,
  file,
  onFileChange,
}: Props) {
  switch (field.type) {
    case "textarea":
    case "lines":
      return (
        <Textarea
          id={id}
          rows={field.type === "lines" ? 4 : 6}
          value={String(value)}
          onChange={(event) => onChange(event.target.value)}
        />
      );
    case "image":
    case "pdf":
      return (
        <UploadField
          id={id}
          value={String(value)}
          pdf={field.type === "pdf"}
          onChange={onChange}
          file={file}
          onFileChange={onFileChange}
        />
      );
    case "checkbox":
      return (
        <input
          id={id}
          type="checkbox"
          checked={Boolean(value)}
          onChange={(event) => onChange(event.target.checked)}
          className="size-4 accent-neutral-900"
        />
      );
    case "icon":
      return (
        <select
          id={id}
          className="h-9 w-full rounded-md border bg-white px-3 text-sm"
          value={String(value)}
          onChange={(event) => onChange(event.target.value)}
          required
        >
          <option value="">Choose icon</option>
          {["facebook", "instagram", "github", "linkedin", "link"].map(
            (icon) => (
              <option key={icon} value={icon}>
                {icon}
              </option>
            ),
          )}
        </select>
      );
    default:
      return (
        <Input
          id={id}
          type={
            field.type === "email" || field.type === "url" ? field.type : "text"
          }
          value={String(value)}
          onChange={(event) => onChange(event.target.value)}
        />
      );
  }
}

export function EditorFieldInput(props: Props) {
  return (
    <div className="space-y-2">
      <Label htmlFor={props.id}>{props.field.label}</Label>
      <FieldControl {...props} />
      {props.field.type === "lines" && (
        <p className="text-xs text-neutral-500">One item per line.</p>
      )}
    </div>
  );
}
