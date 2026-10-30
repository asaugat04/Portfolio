import { requireAdminPage } from "@/lib/admin";
import { listEntries } from "@/services/content";
import { sections } from "@/constants/content";
import { PageHeading } from "@/components/admin/page-heading";
import { ResumeEditor } from "./partials/resume-editor";

export default async function Page() {
  await requireAdminPage();
  const entries = await listEntries("resume");
  return (
    <>
      <PageHeading
        title={sections["resume"].title}
        description="Edit the content shown on your portfolio."
      />
      <ResumeEditor entries={entries} />
    </>
  );
}
