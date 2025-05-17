export const formatRelativeUrl = (url: string) => {
  const leadingSlash = url.startsWith("/") ? url : `/${url}`;
  const trailingSlash = leadingSlash.endsWith("/")
    ? leadingSlash
    : `${leadingSlash}/`;
  return trailingSlash;
};
