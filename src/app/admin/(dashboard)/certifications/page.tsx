import { requireAdminPage } from "@/lib/admin";
import { listEntries } from "@/services/content";
import { sections } from "@/constants/content";
import { PageHeading } from "@/components/admin/page-heading";
import { CertificationsEditor } from "./partials/certifications-editor";

export default async function Page() {
  await requireAdminPage();
  const entries = await listEntries("certifications");
  return (
    <>
      <PageHeading
        title={sections["certifications"].title}
        description="Edit the content shown on your portfolio."
      />
      <CertificationsEditor entries={entries} />
    </>
  );
}
