import { ContentManager } from "@/components/admin/content-manager";
import type { ContentEntry } from "@/schemas/content";

export function ExperienceEditor({
  entries,
}: {
  entries: ContentEntry<"experience">[];
}) {
  return (
    <ContentManager
      section="experience"
      entries={entries}
      fields={[
        {
          key: "year",
          label: "Year",
        },
        {
          key: "title",
          label: "Position",
        },
        {
          key: "organization",
          label: "Organization",
        },
        {
          key: "description",
          label: "Description",
          type: "textarea",
        },
      ]}
    />
  );
}
