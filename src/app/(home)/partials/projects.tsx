import { PortfolioImage } from "@/components/shared/portfolio-image";
import { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import type { ContentEntry } from "@/schemas/content";

function ProjectCard({ data }: { data: ContentEntry<"projects">["data"] }) {
  return (
    <div className="h-full rounded-[12px] bg-[#f7f7f9] px-[30px] py-7 text-left transition-all duration-300 ease-[ease] portfolio-dark:bg-[#0d0c15]">
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
      <h3 className="mb-[2px]">{data.title}</h3>
      <p className="mb-4 text-[14px] text-[#5b5b5b] portfolio-dark:text-[#d2d2d2]">
        {data.subtitle}
      </p>
      <div className="mb-[18px]">
        {data.tags.map((tag) => (
          <Fragment key={tag}>
            <span className="mr-2 mb-2 inline-block rounded-[50px] bg-[#474559] px-[14px] py-[5px] text-[12px] font-bold text-white">
              {tag}
            </span>{" "}
          </Fragment>
        ))}
      </div>
      <ul className="[&_li]:mb-[10px] [&_li]:text-[15px] [&_li]:leading-[1.6] [&_li]:text-[#5b5b5b] portfolio-dark:[&_li]:text-[#d2d2d2] [&_svg]:mr-2 [&_svg]:text-[#ffc200]">
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
      <div className="mx-auto w-full px-[15px] min-[576px]:max-w-[540px] min-[768px]:max-w-[720px] min-[992px]:max-w-[960px] min-[1200px]:max-w-[1140px]">
        <div className="-mx-[15px] flex flex-wrap">
          <div className="relative mx-auto w-full px-[15px] text-center min-[992px]:w-11/12">
            <div className="mx-auto min-[992px]:w-8/12">
              <h2>Featured Projects</h2>
              <br />
              <br />
            </div>
          </div>
        </div>
        <div className="-mx-[15px] flex flex-wrap">
          {entries.map((entry) => (
            <div
              className="relative mb-6 w-full px-[15px] min-[992px]:w-1/2"
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
