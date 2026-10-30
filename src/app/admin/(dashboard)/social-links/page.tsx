import { requireAdminPage } from "@/lib/admin";
import { listEntries } from "@/services/content";
import { sections } from "@/constants/content";
import { PageHeading } from "@/components/admin/page-heading";
import { SocialLinksEditor } from "./partials/social-links-editor";

export default async function Page() {
  await requireAdminPage();
  const entries = await listEntries("social-links");
  return (
    <>
      <PageHeading
        title={sections["social-links"].title}
        description="Edit the content shown on your portfolio."
      />
      <SocialLinksEditor entries={entries} />
    </>
  );
}
