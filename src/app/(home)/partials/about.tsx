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
      className="full-screen items-center justify-center min-[992px]:flex"
      id="about"
    >
      <div className="portfolio-container">
        <div className="portfolio-row">
          <div className="portfolio-column flex items-center min-[992px]:w-7/12">
            <div className="about-text">
              <small className="small-text">
                {about.greeting === "Welcome to my Portfolio Website!" ? (
                  <>
                    Welcome to{" "}
                    <span className="mobile-block">my Portfolio Website!</span>
                  </>
                ) : (
                  about.greeting
                )}
              </small>
              <h1 className="animated-text relative">
                <span className="mr-2">Hello, I&apos;m</span>{" "}
                <div className="animated-info">
                  <span className="animated-item">
                    {about.name.replaceAll(" ", "\u00a0")}
                  </span>
                  <span className="animated-item">{about.role}</span>
                </div>
              </h1>
              <p>{about.description}</p>
              <div className="custom-btn-group mt-6">
                {resume && (
                  <a
                    href={routes.resumeDownload}
                    download={resume.filename}
                    className="custom-btn min-[992px]:mr-2"
                  >
                    <i className="uil uil-file-alt" aria-hidden="true" />{" "}
                    Download Resume
                  </a>
                )}{" "}
                <a href="#contact" className="custom-btn custom-btn-bg">
                  Contact Me
                </a>
              </div>
            </div>
          </div>
          <div className="portfolio-column min-[992px]:w-5/12">
            <div className="about-image">
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
