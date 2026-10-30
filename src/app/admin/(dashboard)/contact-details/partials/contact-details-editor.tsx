import { ContentManager } from "@/components/admin/content-manager";
import type { ContentEntry } from "@/schemas/content";

export function ContactDetailsEditor({
  entries,
}: {
  entries: ContentEntry<"contact-details">[];
}) {
  return (
    <ContentManager
      section="contact-details"
      entries={entries}
      fields={[
        {
          key: "name",
          label: "Display name",
        },
        {
          key: "email",
          label: "Public email",
          type: "email",
        },
        {
          key: "phone",
          label: "Phone number",
        },
        {
          key: "location",
          label: "Location",
        },
        {
          key: "image",
          label: "Profile photo",
          type: "image",
        },
      ]}
    />
  );
}
