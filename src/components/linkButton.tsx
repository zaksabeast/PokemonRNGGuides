import { Route } from "~/routes/defs";
import { Button } from "./button";
import { Link } from "./link";

type LinkButtonProps = {
  trackerId: string;
  href: Route;
  disabled?: boolean;
  type?: React.ComponentProps<typeof Button>["type"];
  children?: React.ReactNode;
};

export const LinkButton = ({
  trackerId,
  href,
  disabled,
  type,
  children,
}: LinkButtonProps) => {
  return (
    <Link href={href} flex={1} display="flex">
      <Button flex={1} trackerId={trackerId} disabled={disabled} type={type}>
        {children}
      </Button>
    </Link>
  );
};
