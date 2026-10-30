import { ContentManager } from "@/components/admin/content-manager";
import type { ContentEntry } from "@/schemas/content";

export function EducationEditor({
  entries,
}: {
  entries: ContentEntry<"education">[];
}) {
  return (
    <ContentManager
      section="education"
      entries={entries}
      fields={[
        {
          key: "year",
          label: "Year",
        },
        {
          key: "title",
          label: "Qualification",
        },
        {
          key: "organization",
          label: "Institution",
        },
        {
          key: "lineBreak",
          label: "Institution on a new line",
          type: "checkbox",
        },
      ]}
    />
  );
}
