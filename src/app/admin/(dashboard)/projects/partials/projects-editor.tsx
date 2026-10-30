import { ContentManager } from "@/components/admin/content-manager";
import type { ContentEntry } from "@/schemas/content";

export function ProjectsEditor({
  entries,
}: {
  entries: ContentEntry<"projects">[];
}) {
  return (
    <ContentManager
      section="projects"
      entries={entries}
      fields={[
        {
          key: "title",
          label: "Project name",
        },
        {
          key: "subtitle",
          label: "Subtitle",
        },
        {
          key: "tags",
          label: "Technologies",
          type: "lines",
        },
        {
          key: "highlights",
          label: "Highlights",
          type: "lines",
        },
        {
          key: "image",
          label: "Project image (optional)",
          type: "image",
        },
      ]}
    />
  );
}
