import { requireAdminPage } from "@/lib/admin";
import { getDb } from "@/lib/db";
import { PageHeading } from "@/components/admin/page-heading";
import { Overview } from "./partials/overview";
export default async function DashboardPage() {
  await requireAdminPage();
  const db = getDb();
  const [entries, messages, unread, pendingEmail] = await Promise.all([
    db.contentEntry.count(),
    db.message.count(),
    db.message.count({ where: { readAt: null } }),
    db.message.count({ where: { emailSentAt: null } }),
  ]);
  return (
    <>
      <PageHeading
        title="Overview"
        description="Manage your content and keep up with new inquiries."
      />
      <Overview
        entries={entries}
        messages={messages}
        unread={unread}
        pendingEmail={pendingEmail}
      />
    </>
  );
}
