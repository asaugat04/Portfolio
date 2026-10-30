import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faGithub,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import type { ContentData } from "@/schemas/content";
const icons = {
  facebook: faFacebook,
  instagram: faInstagram,
  github: faGithub,
  linkedin: faLinkedin,
  link: faLink,
};
export function SocialIcon({
  name,
}: {
  name: ContentData<"social-links">["icon"];
}) {
  return <FontAwesomeIcon icon={icons[name]} aria-hidden="true" />;
}
