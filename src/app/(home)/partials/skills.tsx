import type { ContentEntry } from "@/schemas/content";
export function Skills({ entries }: { entries: ContentEntry<"skills">[] }) {
  if (!entries.length) return null;
  return (
    <div>
      <h2 className="mb-6 max-[992px]:mt-[2em]">Skills</h2>
      <div className="mx-auto w-full px-[15px] min-[576px]:max-w-[540px] min-[768px]:max-w-[720px] min-[992px]:max-w-[960px] min-[1200px]:max-w-[1140px]">
        <div className="-mx-[15px] flex flex-wrap">
          <div className="relative w-full px-[15px]">
            {entries.map(({ id, data }) => (
              <div key={id}>
                <div
                  className="absolute mt-2 size-[75px] rounded-[100%] bg-[#474559] text-center leading-[75px] [&_span]:block [&_span]:text-[16px] [&_span]:leading-[75px] [&_span]:font-bold [&_span]:text-white"
                  style={{ width: 10, height: 10 }}
                />
                <div
                  className="mb-2 ml-[6em] inline-block max-w-[432px] align-top [&_small]:ml-[15px] [&_small]:inline-block [&_small]:align-middle [&_small]:text-[16px] [&_small]:font-bold [&_small]:text-[#474559] max-[581px]:[&_small]:mx-0 max-[581px]:[&_small]:mt-[10px] max-[581px]:[&_small]:block portfolio-dark:[&_small]:text-[#d2d2d2]"
                  style={{ marginLeft: 16 }}
                >
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
