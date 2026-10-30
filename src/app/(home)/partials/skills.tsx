import type { ContentEntry } from "@/schemas/content";
export function Skills({ entries }: { entries: ContentEntry<"skills">[] }) {
  if (!entries.length) return null;
  return (
    <div>
      <h2 className="mobile-mt-2 mb-6">Skills</h2>
      <div className="portfolio-container">
        <div className="portfolio-row">
          <div className="portfolio-column">
            {entries.map(({ id, data }) => (
              <div key={id}>
                <div
                  className="timeline-yr mt-2"
                  style={{ width: 10, height: 10 }}
                />
                <div className="timeline-info mb-2" style={{ marginLeft: 16 }}>
                  <h3 className="!text-[1.25rem]">
                    <span>
                      {data.title}
                      <small style={{ fontSize: "small", fontWeight: 300 }}>
                        {" "}
                        {data.description}
                      </small>
                    </span>
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
