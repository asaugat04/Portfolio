import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { sectionKeys, sections } from "@/constants/content";
import { routes } from "@/constants/routes";
export function Overview({
  entries,
  messages,
  unread,
  pendingEmail,
}: {
  entries: number;
  messages: number;
  unread: number;
  pendingEmail: number;
}) {
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Content entries", value: entries },
          { label: "Messages", value: messages },
          { label: "Unread messages", value: unread },
          { label: "Pending email notifications", value: pendingEmail },
        ].map(({ label, value }) => (
          <Card key={label}>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-neutral-500">
                {label}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-3xl font-semibold">
              {value}
            </CardContent>
          </Card>
        ))}
      </div>
      <h2 className="mt-10 mb-4 text-lg font-semibold">Your portfolio</h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {sectionKeys.map((key) => (
          <Link
            key={key}
            href={routes.section(key)}
            className="rounded-lg border bg-white p-5 text-sm font-medium transition hover:border-neutral-400"
          >
            Manage {sections[key].title.toLowerCase()} →
          </Link>
        ))}
      </div>
    </>
  );
}
