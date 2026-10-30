import { requireAdminPage } from "@/lib/admin";
import { listEntries } from "@/services/content";
import { sections } from "@/constants/content";
import { PageHeading } from "@/components/admin/page-heading";
import { AboutEditor } from "./partials/about-editor";

export default async function Page() {
  await requireAdminPage();
  const entries = await listEntries("about");
  return (
    <>
      <PageHeading
        title={sections["about"].title}
        description="Edit the content shown on your portfolio."
      />
      <AboutEditor entries={entries} />
    </>
  );
}
