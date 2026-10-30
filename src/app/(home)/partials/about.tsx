import { FileText } from "lucide-react";
import { PortfolioImage } from "@/components/shared/portfolio-image";
import { routes } from "@/constants/routes";
import type { ContentData } from "@/schemas/content";

export function About({
  about,
  resume,
}: {
  about?: ContentData<"about">;
  resume?: ContentData<"resume">;
}) {
  if (!about) return null;
  return (
    <section
      className="items-center justify-center py-32 max-[992px]:pb-16 max-[321px]:py-16 min-[992px]:flex"
      id="about"
    >
      <div className="mx-auto w-full px-[15px] min-[576px]:max-w-[540px] min-[768px]:max-w-[720px] min-[992px]:max-w-[960px] min-[1200px]:max-w-[1140px]">
        <div className="-mx-[15px] flex flex-wrap">
          <div className="relative flex w-full items-center px-[15px] min-[992px]:w-7/12">
            <div className="max-[321px]:text-center">
              <small className="rounded-[50px] text-[14px] font-bold tracking-[0.2px] text-[#5b5b5b] portfolio-dark:bg-[#0d0c15] portfolio-dark:text-white">
                {about.greeting === "Welcome to my Portfolio Website!" ? (
                  <>
                    Welcome to{" "}
                    <span className="max-[321px]:block">
                      my Portfolio Website!
                    </span>
                  </>
                ) : (
                  about.greeting
                )}
              </small>
              <h1 className="animated-text relative max-[321px]:mt-0">
                <span className="mr-2">Hello, I&apos;m</span>{" "}
                <div className="relative inline-block min-w-[420px] align-bottom max-[768px]:min-w-[320px] max-[581px]:min-w-[280px]">
                  <span className="animated-item">
                    {about.name.replaceAll(" ", "\u00a0")}
                  </span>
                  <span className="animated-item">{about.role}</span>
                </div>
              </h1>
              <p>{about.description}</p>
              <div className="mt-6 max-[581px]:text-center">
                {resume && (
                  <a
                    href={routes.resumeDownload}
                    download={resume.filename}
                    className="inline-block rounded-[50px] border border-transparent bg-[#eee] px-[29px] py-[13px] text-center align-middle text-[14px] leading-[normal] font-bold text-[#5b5b5b] transition-all duration-400 ease-[ease] hover:text-black! max-[581px]:my-[10px] max-[581px]:block min-[992px]:mr-2"
                  >
                    <FileText
                      className="mr-1 inline-block size-4 align-[-0.125em]"
                      aria-hidden="true"
                    />{" "}
                    Download Resume
                  </a>
                )}{" "}
                <a
                  href="#contact"
                  className="inline-block rounded-[50px] border border-transparent bg-[#474559] px-[29px] py-[13px] text-center align-middle text-[14px] leading-[normal] font-bold text-white transition-all duration-400 ease-[ease] hover:bg-[#ffc200] hover:text-black! max-[581px]:my-[10px] max-[581px]:block"
                >
                  Contact Me
                </a>
              </div>
            </div>
          </div>
          <div className="relative w-full px-[15px] min-[992px]:w-5/12">
            <div className="max-[992px]:mt-[4em]">
              <PortfolioImage
                src={about.image}
                className="h-auto max-w-full"
                alt="Software engineer illustration"
                width={500}
                height={400}
                sizes="(min-width: 1200px) 445px, (min-width: 992px) 370px, 100vw"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
