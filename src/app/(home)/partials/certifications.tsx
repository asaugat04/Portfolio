"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PortfolioImage } from "@/components/shared/portfolio-image";
import { useState, type TouchEvent } from "react";
import type { ContentEntry } from "@/schemas/content";

export function Certifications({
  entries,
}: {
  entries: ContentEntry<"certifications">[];
}) {
  const [index, setIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  if (!entries.length) return null;
  const active = Math.min(index, entries.length - 1);
  const move = (delta: number) =>
    setIndex((active + delta + entries.length) % entries.length);
  function onTouchEnd(event: TouchEvent) {
    if (touchStart !== null) {
      const difference = touchStart - event.changedTouches[0].clientX;
      if (Math.abs(difference) > 40) move(difference > 0 ? 1 : -1);
    }
    setTouchStart(null);
  }
  return (
    <section className="py-12" id="project">
      <div className="mx-auto w-full px-[15px] min-[576px]:max-w-[540px] min-[768px]:max-w-[720px] min-[992px]:max-w-[960px] min-[1200px]:max-w-[1140px]">
        <div className="-mx-[15px] flex flex-wrap">
          <div className="relative mx-auto w-full px-[15px] text-center min-[992px]:w-11/12">
            <div className="mx-auto min-[992px]:w-8/12">
              <h2>My Certifications</h2>
              <br />
              <br />
            </div>
            <div
              className="relative"
              role="region"
              aria-roledescription="carousel"
              aria-label="Certifications"
              onKeyDown={(event) => {
                if (event.key === "ArrowLeft") move(-1);
                if (event.key === "ArrowRight") move(1);
              }}
            >
              <div
                className="touch-pan-y overflow-hidden"
                onTouchStart={(event) =>
                  setTouchStart(event.touches[0].clientX)
                }
                onTouchEnd={onTouchEnd}
              >
                <div
                  className="flex transition-transform duration-300 motion-reduce:transition-none"
                  style={{ transform: `translateX(-${active * 100}%)` }}
                >
                  {entries.map(({ id, data }, i) => (
                    <div
                      key={id}
                      className="certificate-slide w-full shrink-0"
                      aria-hidden={i !== active}
                    >
                      <div className="mx-12 aspect-[1600/1131]">
                        <PortfolioImage
                          src={data.image}
                          className="h-full w-full object-contain"
                          alt={`${data.title} certification`}
                          width={1600}
                          height={1131}
                          sizes="(min-width: 1200px) 920px, (min-width: 768px) 80vw, calc(100vw - 126px)"
                          loading="lazy"
                        />
                      </div>
                      <h3 className="mt-2">{data.title}</h3>
                      <p className="ml-6 w-[93%] px-1">{data.description}</p>
                    </div>
                  ))}
                </div>
              </div>
              {entries.length > 1 && (
                <>
                  <div className="mt-[10px] h-6 max-[581px]:hidden">
                    <button
                      className="absolute top-1/2 -left-[15px] size-[100px] -translate-y-1/2 hover:text-[#ffc200] min-[992px]:-left-[45px] portfolio-dark:text-white portfolio-dark:hover:text-white"
                      aria-label="Previous certification"
                      onClick={() => move(-1)}
                    >
                      <ChevronLeft size={100} aria-hidden="true" />
                    </button>
                    <button
                      className="absolute top-1/2 -right-[15px] size-[100px] -translate-y-1/2 hover:text-[#ffc200] min-[992px]:-right-[45px] portfolio-dark:text-white portfolio-dark:hover:text-white"
                      aria-label="Next certification"
                      onClick={() => move(1)}
                    >
                      <ChevronRight size={100} aria-hidden="true" />
                    </button>
                  </div>
                  <div className="h-6 text-center [&_button]:inline-block [&_button]:size-6 [&_button]:p-0 [&_button:hover_span]:bg-[#5b5b5b] [&_button[aria-current=true]_span]:bg-[#5b5b5b] [&_span]:mx-2 [&_span]:my-[5px] [&_span]:block [&_span]:size-2 [&_span]:rounded-[30px] [&_span]:bg-[#d6d6d6]">
                    {entries.map((entry, i) => (
                      <button
                        key={entry.id}
                        aria-label={`Show certification ${i + 1}`}
                        aria-current={i === active}
                        onClick={() => setIndex(i)}
                      >
                        <span />
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
