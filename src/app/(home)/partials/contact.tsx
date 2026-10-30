import { PortfolioImage } from "@/components/shared/portfolio-image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faLocationDot, faPhone } from "@fortawesome/free-solid-svg-icons";
import type { ContentData, ContentEntry } from "@/schemas/content";
import { ContactForm } from "./contact-form";
import { SocialIcon } from "@/components/shared/social-icon";

export function Contact({
  details,
  socials,
}: {
  details?: ContentData<"contact-details">;
  socials: ContentEntry<"social-links">[];
}) {
  return (
    <section className="py-12" id="contact">
      <div className="mx-auto w-full px-[15px] min-[576px]:max-w-[540px] min-[768px]:max-w-[720px] min-[992px]:max-w-[960px] min-[1200px]:max-w-[1140px]">
        <div className="-mx-[15px] flex flex-wrap">
          <div className="relative w-full px-[15px] min-[992px]:mr-12 min-[992px]:w-5/12">
            {details && (
              <>
                <h2 className="mb-6">Contact Me</h2>
                <div className="relative bottom-2 flex flex-col justify-between rounded-b-[3px] bg-[#474559] py-6 max-[992px]:px-8 min-[992px]:px-12 [&_a]:text-[#f7f3f3] [&_a:hover]:text-[#ffc200]! [&_p]:text-[#f7f3f3] portfolio-dark:[&_p]:text-[#d2d2d2]">
                  <div className="flex justify-between">
                    <div className="flex">
                      <PortfolioImage
                        src={details.image}
                        className="h-[100px] w-auto max-w-none rounded"
                        width={100}
                        height={100}
                        sizes="100px"
                        alt={`${details.name}, Software Engineer`}
                        loading="lazy"
                      />
                      <h2 className="ml-4 w-min text-white">{details.name}</h2>
                    </div>
                    <div className="flex h-min text-[larger] max-[581px]:h-auto max-[581px]:flex-col max-[581px]:items-start max-[581px]:justify-evenly [&_a]:inline-flex [&_a]:min-h-6 [&_a]:min-w-6 [&_a]:items-center [&_a]:leading-none [&_svg]:h-[1em] [&_svg]:w-auto">
                      {socials.map(({ id, data }) => (
                        <a
                          key={id}
                          href={data.url}
                          title={data.title}
                          aria-label={data.title}
                          className="mx-1"
                        >
                          <SocialIcon name={data.icon} />
                        </a>
                      ))}
                    </div>
                  </div>
                  <hr className="my-4 w-full border border-[#343a40]" />
                  <div className="mt-12">
                    {[
                      {
                        label: "Email",
                        value: details.email,
                        href: `mailto:${details.email}`,
                        icon: faEnvelope,
                      },
                      {
                        label: "Phone",
                        value: details.phone,
                        href: `tel:${details.phone.replaceAll("-", "")}`,
                        icon: faPhone,
                      },
                      {
                        label: "Location",
                        value: details.location,
                        icon: faLocationDot,
                      },
                    ].map(({ label, value, href, icon }) => (
                      <div className="flex items-start" key={label}>
                        <div className="h-[92.8px] text-[46.4px] text-[#ad8b20]">
                          <FontAwesomeIcon icon={icon} />
                        </div>
                        <div className="ml-4">
                          <h3 className="!m-0 !text-[1.25rem] text-white">
                            {label}
                          </h3>
                          <p className="!m-0">
                            {href ? <a href={href}>{value}</a> : value}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="relative w-full px-[15px] min-[992px]:w-1/2">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
