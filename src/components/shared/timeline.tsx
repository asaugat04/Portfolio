import type { ContentData } from "@/schemas/content";

export function TimelineItem({
  data,
}: {
  data: ContentData<"experience"> | ContentData<"education">;
}) {
  return (
    <div className="timeline-wrapper">
      <div className="timeline-yr">
        <span>{data.year}</span>
      </div>
      <div className="timeline-info">
        <h3>
          <span>{data.title}</span>
          {(!("lineBreak" in data) || data.lineBreak) && <br />}
          <small>{data.organization}</small>
        </h3>
        {"description" in data && <p>{data.description}</p>}
      </div>
    </div>
  );
}
