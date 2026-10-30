import { requireAdminPage } from "@/lib/admin";
import { listEntries } from "@/services/content";
import { sections } from "@/constants/content";
import { PageHeading } from "@/components/admin/page-heading";
import { ExperienceEditor } from "./partials/experience-editor";

export default async function Page() {
  await requireAdminPage();
  const entries = await listEntries("experience");
  return (
    <>
      <PageHeading
        title={sections["experience"].title}
        description="Edit the content shown on your portfolio."
      />
      <ExperienceEditor entries={entries} />
    </>
  );
}
