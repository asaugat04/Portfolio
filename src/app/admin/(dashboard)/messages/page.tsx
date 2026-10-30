import { requireAdminPage } from "@/lib/admin";
import { getDb } from "@/lib/db";
import { PageHeading } from "@/components/admin/page-heading";
import { MessageList } from "./partials/message-list";
import { Button } from "@/components/ui/button";
import { routes } from "@/constants/routes";
import Link from "next/link";

export default async function MessagesPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  await requireAdminPage();
  const raw = Number((await searchParams).page ?? 1);
  const page = Number.isSafeInteger(raw) && raw > 0 ? raw : 1;
  const pageSize = 20;
  const [messages, total] = await Promise.all([
    getDb().message.findMany({
      orderBy: [{ createdAt: "desc" }, { id: "desc" }],
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    getDb().message.count(),
  ]);
  return (
    <>
      <PageHeading
        title="Messages"
        description="Inquiries from your portfolio contact form."
      />
      <MessageList
        messages={messages.map((message) => ({
          ...message,
          createdAt: message.createdAt.toISOString(),
          readAt: message.readAt?.toISOString() ?? null,
          emailSentAt: message.emailSentAt?.toISOString() ?? null,
        }))}
      />
      <div className="mt-6 flex items-center justify-between gap-4 text-sm text-neutral-500">
        <span>
          {total} messages · Page {page}
        </span>
        <div className="flex gap-2">
          {page > 1 && (
            <Button variant="outline" asChild>
              <Link href={`${routes.section("messages")}?page=${page - 1}`}>
                Previous
              </Link>
            </Button>
          )}
          {page * pageSize < total && (
            <Button variant="outline" asChild>
              <Link href={`${routes.section("messages")}?page=${page + 1}`}>
                Next
              </Link>
            </Button>
          )}
        </div>
      </div>
    </>
  );
}
