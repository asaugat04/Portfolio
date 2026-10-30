import { requireAdminPage } from "@/lib/admin";
import { listEntries } from "@/services/content";
import { sections } from "@/constants/content";
import { PageHeading } from "@/components/admin/page-heading";
import { EducationEditor } from "./partials/education-editor";

export default async function Page() {
  await requireAdminPage();
  const entries = await listEntries("education");
  return (
    <>
      <PageHeading
        title={sections["education"].title}
        description="Edit the content shown on your portfolio."
      />
      <EducationEditor entries={entries} />
    </>
  );
}
