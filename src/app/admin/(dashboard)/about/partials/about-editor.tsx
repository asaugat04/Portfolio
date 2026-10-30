import { ContentManager } from "@/components/admin/content-manager";
import type { ContentEntry } from "@/schemas/content";

export function AboutEditor({ entries }: { entries: ContentEntry<"about">[] }) {
  return (
    <ContentManager
      section="about"
      entries={entries}
      fields={[
        {
          key: "greeting",
          label: "Welcome text",
        },
        {
          key: "name",
          label: "Name",
        },
        {
          key: "role",
          label: "Role",
        },
        {
          key: "description",
          label: "About description",
          type: "textarea",
        },
        {
          key: "image",
          label: "Illustration",
          type: "image",
        },
      ]}
    />
  );
}
