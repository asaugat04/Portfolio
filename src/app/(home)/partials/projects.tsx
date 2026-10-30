import { PortfolioImage } from "@/components/shared/portfolio-image";
import { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import type { ContentEntry } from "@/schemas/content";

function ProjectCard({ data }: { data: ContentEntry<"projects">["data"] }) {
  return (
    <div className="project-card">
      {data.image && (
        <PortfolioImage
          src={data.image}
          width={1200}
          height={800}
          sizes="(min-width: 992px) 480px, 100vw"
          alt={data.title}
          className="mb-4 h-auto w-full rounded-lg"
          loading="lazy"
        />
      )}
      <h3 className="project-card-title">{data.title}</h3>
      <p className="project-card-subtitle">{data.subtitle}</p>
      <div className="project-tags">
        {data.tags.map((tag) => (
          <Fragment key={tag}>
            <span className="tech-tag">{tag}</span>{" "}
          </Fragment>
        ))}
      </div>
      <ul className="project-checklist">
        {data.highlights.map((highlight, i) => (
          <li key={i}>
            <FontAwesomeIcon icon={faCheck} aria-hidden="true" /> {highlight}
          </li>
        ))}
      </ul>
    </div>
  );
}
export function Projects({ entries }: { entries: ContentEntry<"projects">[] }) {
  if (!entries.length) return null;
  return (
    <section className="py-12" id="projects">
      <div className="portfolio-container">
        <div className="portfolio-row">
          <div className="portfolio-column mx-auto text-center min-[992px]:w-11/12">
            <div className="mx-auto min-[992px]:w-8/12">
              <h2>Featured Projects</h2>
              <br />
              <br />
            </div>
          </div>
        </div>
        <div className="portfolio-row">
          {entries.map((entry) => (
            <div
              className="portfolio-column mb-6 min-[992px]:w-1/2"
              key={entry.id}
            >
              <ProjectCard data={entry.data} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
