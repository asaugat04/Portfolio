import type { ContentData } from "@/schemas/content";

export function TimelineItem({
  data,
}: {
  data: ContentData<"experience"> | ContentData<"education">;
}) {
  return (
    <div className="relative py-[22px] before:absolute before:left-[38px] before:h-full before:w-[3px] before:bg-[#474559] before:content-[''] last:before:h-0">
      <div className="absolute size-[75px] rounded-[100%] bg-[#474559] text-center leading-[75px] [&_span]:block [&_span]:text-[16px] [&_span]:leading-[75px] [&_span]:font-bold [&_span]:text-white">
        <span>{data.year}</span>
      </div>
      <div className="ml-[6em] inline-block max-w-[432px] align-top [&_small]:ml-[15px] [&_small]:inline-block [&_small]:align-middle [&_small]:text-[16px] [&_small]:font-bold [&_small]:text-[#474559] max-[581px]:[&_small]:mx-0 max-[581px]:[&_small]:mt-[10px] max-[581px]:[&_small]:block portfolio-dark:[&_small]:text-[#d2d2d2]">
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
