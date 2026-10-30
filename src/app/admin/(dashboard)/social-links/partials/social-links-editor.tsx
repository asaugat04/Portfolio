import { ContentManager } from "@/components/admin/content-manager";
import type { ContentEntry } from "@/schemas/content";

export function SocialLinksEditor({
  entries,
}: {
  entries: ContentEntry<"social-links">[];
}) {
  return (
    <ContentManager
      section="social-links"
      entries={entries}
      fields={[
        {
          key: "title",
          label: "Platform name",
        },
        {
          key: "url",
          label: "Profile URL",
          type: "url",
        },
        {
          key: "icon",
          label: "Icon",
          type: "icon",
        },
      ]}
    />
  );
}
