import { match } from "ts-pattern";

const removeLeadingSlash = (url: string) => {
  return url.startsWith("/") ? url.slice(1) : url;
};

const removeTrailingSlash = (url: string) => {
  return url.endsWith("/") ? url.slice(0, -1) : url;
};

export const removeSlashes = (url: string) => {
  return removeLeadingSlash(removeTrailingSlash(url));
};

type RelativeUrlOptions = {
  url: string;
  leadingSlash: boolean;
  trailingSlash: boolean;
};

export const formatRelativeUrl = ({
  url: originalUrl,
  leadingSlash,
  trailingSlash,
}: RelativeUrlOptions) => {
  const noSlashes = removeSlashes(originalUrl);
  return match({ url: noSlashes, leadingSlash, trailingSlash })
    .with({ url: "", leadingSlash: true }, () => "/")
    .with({ url: "", trailingSlash: true }, () => "/")
    .with({ leadingSlash: true, trailingSlash: true }, ({ url }) => `/${url}/`)
    .with({ leadingSlash: true, trailingSlash: false }, ({ url }) => `/${url}`)
    .with({ leadingSlash: false, trailingSlash: true }, ({ url }) => `${url}/`)
    .with({ leadingSlash: false, trailingSlash: false }, ({ url }) => url)
    .exhaustive();
};
