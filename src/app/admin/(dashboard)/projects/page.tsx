import { requireAdminPage } from "@/lib/admin";
import { listEntries } from "@/services/content";
import { sections } from "@/constants/content";
import { PageHeading } from "@/components/admin/page-heading";
import { ProjectsEditor } from "./partials/projects-editor";

export default async function Page() {
  await requireAdminPage();
  const entries = await listEntries("projects");
  return (
    <>
      <PageHeading
        title={sections["projects"].title}
        description="Edit the content shown on your portfolio."
      />
      <ProjectsEditor entries={entries} />
    </>
  );
}
