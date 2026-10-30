import { requireAdminPage } from "@/lib/admin";
import { listEntries } from "@/services/content";
import { sections } from "@/constants/content";
import { PageHeading } from "@/components/admin/page-heading";
import { ContactDetailsEditor } from "./partials/contact-details-editor";

export default async function Page() {
  await requireAdminPage();
  const entries = await listEntries("contact-details");
  return (
    <>
      <PageHeading
        title={sections["contact-details"].title}
        description="Edit the content shown on your portfolio."
      />
      <ContactDetailsEditor entries={entries} />
    </>
  );
}
