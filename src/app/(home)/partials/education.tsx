import { TimelineItem } from "@/components/shared/timeline";
import type { ContentEntry } from "@/schemas/content";
export function Education({
  entries,
}: {
  entries: ContentEntry<"education">[];
}) {
  if (!entries.length) return null;
  return (
    <>
      <h2 className="mobile-mt-2 mb-6">Education</h2>
      <div>
        {entries.map((entry) => (
          <TimelineItem key={entry.id} data={entry.data} />
        ))}
      </div>
    </>
  );
}
