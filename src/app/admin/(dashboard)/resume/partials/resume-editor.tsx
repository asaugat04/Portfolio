import { ContentManager } from "@/components/admin/content-manager";
import type { ContentEntry } from "@/schemas/content";

export function ResumeEditor({
  entries,
}: {
  entries: ContentEntry<"resume">[];
}) {
  return (
    <ContentManager
      section="resume"
      entries={entries}
      fields={[
        {
          key: "url",
          label: "R\u00e9sum\u00e9 PDF",
          type: "pdf",
        },
        {
          key: "filename",
          label: "Download filename",
        },
      ]}
    />
  );
}
