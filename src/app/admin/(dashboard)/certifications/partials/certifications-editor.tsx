import { ContentManager } from "@/components/admin/content-manager";
import type { ContentEntry } from "@/schemas/content";

export function CertificationsEditor({
  entries,
}: {
  entries: ContentEntry<"certifications">[];
}) {
  return (
    <ContentManager
      section="certifications"
      entries={entries}
      fields={[
        {
          key: "title",
          label: "Certification title",
        },
        {
          key: "description",
          label: "Description",
          type: "textarea",
        },
        {
          key: "image",
          label: "Certificate image",
          type: "image",
        },
      ]}
    />
  );
}
