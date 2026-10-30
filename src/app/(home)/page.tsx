import { getPortfolio } from "@/services/content";
import { homeNavigation } from "@/constants/routes";
import { site } from "@/constants/site";
import { About } from "./partials/about";
import { Certifications } from "./partials/certifications";
import { Projects } from "./partials/projects";
import { Experience } from "./partials/experience";
import { Education } from "./partials/education";
import { Skills } from "./partials/skills";
import { Contact } from "./partials/contact";
import { SiteShell } from "./partials/site-shell";
import "./portfolio.css";

export default async function HomePage() {
  const content = await getPortfolio();
  const hasResume = Boolean(
    content.experience.length ||
    content.education.length ||
    content.skills.length,
  );
  const anchors = [
    content.about.length && "#about",
    content.certifications.length && "#project",
    content.projects.length && "#projects",
    hasResume && "#resume",
    "#contact",
  ];
  const navigation = homeNavigation.filter(({ href }) =>
    anchors.includes(href),
  );
  const contact = content["contact-details"][0]?.data;
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: content.about[0]?.data.name ?? site.name,
    url: site.url,
    image: contact ? new URL(contact.image, site.url).toString() : undefined,
    jobTitle: content.about[0]?.data.role,
    email: contact ? `mailto:${contact.email}` : undefined,
    telephone: contact?.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: contact?.location,
      addressCountry: "NP",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: content.education.at(-1)?.data.organization,
    },
    worksFor: {
      "@type": "Organization",
      name: content.experience[0]?.data.organization,
    },
    sameAs: content["social-links"].map((entry) => entry.data.url),
    knowsAbout: [
      "React",
      "Next.js",
      "TypeScript",
      "NestJS",
      "PostgreSQL",
      "TypeORM",
    ],
  };
  return (
    <SiteShell navigation={navigation}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(person).replaceAll("<", "\\u003c"),
        }}
      />
      <main>
        <About
          about={content.about[0]?.data}
          resume={content.resume[0]?.data}
        />
        <Certifications entries={content.certifications} />
        <Projects entries={content.projects} />
        {hasResume && (
          <section
            className="items-center justify-center py-12 min-[992px]:flex"
            id="resume"
          >
            <div className="portfolio-container">
              <div className="portfolio-row">
                <div className="portfolio-column min-[992px]:w-1/2">
                  <Experience entries={content.experience} />
                </div>
                <div className="portfolio-column min-[992px]:w-1/2">
                  <Education entries={content.education} />
                  <Skills entries={content.skills} />
                </div>
              </div>
            </div>
          </section>
        )}
        <Contact details={contact} socials={content["social-links"]} />
      </main>
      <footer className="py-12">
        <div className="portfolio-container">
          <div className="portfolio-row">
            <div className="portfolio-column">
              <p className="copyright-text text-center">
                Copyright © 2026 {contact?.name ?? site.name}. All rights
                reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </SiteShell>
  );
}
