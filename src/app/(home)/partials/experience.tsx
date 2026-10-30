import { TimelineItem } from "@/components/shared/timeline";
import type { ContentEntry } from "@/schemas/content";
export function Experience({
  entries,
}: {
  entries: ContentEntry<"experience">[];
}) {
  if (!entries.length) return null;
  return (
    <>
      <h2 className="mb-6">Experience</h2>
      <div>
        {entries.map((entry) => (
          <TimelineItem key={entry.id} data={entry.data} />
        ))}
      </div>
    </>
  );
}
