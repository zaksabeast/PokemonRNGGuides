import { Button } from "./button";
import { Link } from "./link";
import { Icon } from "./icons";
import { SlugOrExternalLink } from "~/types/navigation";

type LinkButtonProps = {
  trackerId: string;
  type?: React.ComponentProps<typeof Button>["type"];
  children?: React.ReactNode;
  icon?: React.ReactNode;
  link: SlugOrExternalLink | null;
};

export const LinkButton = ({ trackerId, link, ...props }: LinkButtonProps) => {
  if (link == null) {
    return <Button flex={1} trackerId={trackerId} disabled {...props} />;
  }
  if (link.type === "slug") {
    return (
      <Link href={link.slug} flex={1} display="flex">
        <Button flex={1} trackerId={trackerId} {...props} />
      </Link>
    );
  }

  return (
    <Button
      href={link.externalLink}
      flex={1}
      trackerId={trackerId}
      iconPosition="end"
      icon={<Icon name="OpenInNew" />}
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  );
};
