import Link from "next/link";
import { ReactNode } from "react";
import { LinkItUrl, LinkIt } from "react-linkify-it";
import UserLinkWithTooltip from "./UserLinkWithTooltip";
interface LinkifyProps {
  children: ReactNode;
}

const Linkify = ({ children }: LinkifyProps) => {
  return (
    <LinkifyUsername>
      <LinkifyHashtag>
        <LinkItUrl className="text-primary hover:underline">
          {children}
        </LinkItUrl>
      </LinkifyHashtag>
    </LinkifyUsername>
  );
};

export default Linkify;

const LinkifyUsername = ({ children }: LinkifyProps) => {
  return (
    <LinkIt
      regex={/(@[a-zA-Z0-9_-]+)/}
      component={(match, key) => (
        <UserLinkWithTooltip username={match.slice(1)} key={key}>
          {match}
        </UserLinkWithTooltip>
      )}
    >
      {children}
    </LinkIt>
  );
};

const LinkifyHashtag = ({ children }: LinkifyProps) => {
  return (
    <LinkIt
      regex={/(#[a-zA-Z0-9]+)/}
      component={(match, key) => (
        <Link
          className="text-primary hover:underline"
          key={key}
          href={`/hashtag/${match.slice(1)}`}
        >
          {match}
        </Link>
      )}
    >
      {children}
    </LinkIt>
  );
};
