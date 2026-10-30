import { ContentManager } from "@/components/admin/content-manager";
import type { ContentEntry } from "@/schemas/content";

export function SkillsEditor({
  entries,
}: {
  entries: ContentEntry<"skills">[];
}) {
  return (
    <ContentManager
      section="skills"
      entries={entries}
      fields={[
        {
          key: "title",
          label: "Category",
        },
        {
          key: "description",
          label: "Skills",
          type: "textarea",
        },
      ]}
    />
  );
}
