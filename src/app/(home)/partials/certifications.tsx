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
      <div className="portfolio-container">
        <div className="portfolio-row">
          <div className="portfolio-column mx-auto text-center min-[992px]:w-11/12">
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
                  <div className="carousel-navigation">
                    <button
                      className="carousel-arrow -left-[15px] min-[992px]:-left-[45px]"
                      aria-label="Previous certification"
                      onClick={() => move(-1)}
                    >
                      <ChevronLeft size={100} aria-hidden="true" />
                    </button>
                    <button
                      className="carousel-arrow -right-[15px] min-[992px]:-right-[45px]"
                      aria-label="Next certification"
                      onClick={() => move(1)}
                    >
                      <ChevronRight size={100} aria-hidden="true" />
                    </button>
                  </div>
                  <div className="carousel-dots">
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
