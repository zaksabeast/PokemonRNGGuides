import { Route } from "~/routes/defs";

export type SlugOrExternalLink =
  | {
      type: "slug";
      slug: Route;
    }
  | {
      type: "externalLink";
      externalLink: string;
    };
