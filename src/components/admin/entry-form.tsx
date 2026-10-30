"use client";
import { useId, useState, type FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  EditorFieldInput,
  type EditorField,
} from "@/components/admin/editor-field";
export type { EditorField } from "@/components/admin/editor-field";
import {
  contentSchemas,
  type Section,
  type ContentEntry,
} from "@/schemas/content";
import { apiFetch } from "@/lib/api/client";
import { routes } from "@/constants/routes";

export function EntryForm({
  section,
  entry,
  fields,
  position,
  onSaved,
  onBusyChange,
}: {
  section: Section;
  entry?: ContentEntry;
  fields: EditorField[];
  position: number;
  onSaved: () => void;
  onBusyChange: (busy: boolean) => void;
}) {
  const prefix = useId();
  const [values, setValues] = useState<Record<string, string | boolean>>(() =>
    Object.fromEntries(
      fields.map(({ key, type }) => {
        const value = entry?.data[key as keyof typeof entry.data] as unknown;
        return [
          key,
          Array.isArray(value)
            ? value.join("\n")
            : typeof value === "boolean"
              ? value
              : typeof value === "string"
                ? value
                : type === "checkbox"
                  ? true
                  : "",
        ];
      }),
    ),
  );
  const [visible, setVisible] = useState(entry?.visible ?? true);
  const [order, setOrder] = useState(entry?.position ?? position);
  const [pending, setPending] = useState(false);
  const [selected, setSelected] = useState<{ key: string; file: File }>();
  const [error, setError] = useState("");
  function update(key: string, value: string | boolean) {
    setValues((current) => ({ ...current, [key]: value }));
  }
  async function submit(event: FormEvent) {
    event.preventDefault();
    setError("");
    const raw = Object.fromEntries(
      fields.map(({ key, type }) => [
        key,
        type === "lines"
          ? String(values[key])
              .split("\n")
              .map((line) => line.trim())
              .filter(Boolean)
          : values[key],
      ]),
    );
    const result = contentSchemas[section].safeParse(raw);
    if (
      !result.success &&
      result.error.issues.some((issue) => issue.path[0] !== selected?.key)
    ) {
      setError(
        result.error.issues
          .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
          .join(". "),
      );
      return;
    }
    setPending(true);
    onBusyChange(true);
    try {
      const input = { data: raw, position: order, visible };
      let body: typeof input | FormData = input;
      if (selected) {
        body = new FormData();
        body.set("entry", JSON.stringify(input));
        body.set("file", selected.file);
      }
      await apiFetch(
        entry ? routes.entry(section, entry.id) : routes.content(section),
        {
          method: entry ? "PATCH" : "POST",
          body,
          timeout: 60000,
        },
      );
      onSaved();
    } catch (error) {
      setError(error instanceof Error ? error.message : "Unable to save");
    } finally {
      setPending(false);
      onBusyChange(false);
    }
  }
  return (
    <form onSubmit={submit} className="space-y-5">
      <fieldset disabled={pending} className="space-y-5">
        {fields.map((field) => (
          <EditorFieldInput
            key={field.key}
            field={field}
            id={`${prefix}-${field.key}`}
            value={values[field.key]}
            onChange={(value) => update(field.key, value)}
            file={selected?.key === field.key ? selected.file : undefined}
            onFileChange={(file) =>
              setSelected(file ? { key: field.key, file } : undefined)
            }
          />
        ))}
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor={`${prefix}-order`}>Display order</Label>
            <Input
              id={`${prefix}-order`}
              type="number"
              min={0}
              max={10000}
              required
              value={order}
              onChange={(event) => setOrder(Number(event.target.value))}
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              id={`${prefix}-visible`}
              type="checkbox"
              checked={visible}
              onChange={(event) => setVisible(event.target.checked)}
              className="size-4 accent-neutral-900"
            />
            <Label htmlFor={`${prefix}-visible`}>Visible on website</Label>
          </div>
        </div>
      </fieldset>
      {error && (
        <p role="alert" className="text-sm text-red-600">
          {error}
        </p>
      )}
      <Button type="submit" disabled={pending}>
        {pending ? "Saving…" : "Save changes"}
      </Button>
    </form>
  );
}
