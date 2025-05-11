import { GuideMeta } from "~/guides";
import { map } from "lodash-es";

const domain = "https://pokemonrng.com";

const joinUrl = (base: string, slug: string) => {
  const baseHasSlash = base.endsWith("/");
  const slugHasSlash = slug.startsWith("/");

  if (baseHasSlash && slugHasSlash) {
    return `${base}${slug.slice(1)}`;
  }

  if (!baseHasSlash && !slugHasSlash) {
    return `${base}/${slug}`;
  }

  return `${base}${slug}`;
};

type Props = {
  guideMeta: GuideMeta;
};

export const MetaTags = ({ guideMeta }: Props) => {
  const title = guideMeta.title;
  const description = guideMeta.description;
  const fullUrl = joinUrl(domain, guideMeta.slug);
  const canonicalUrl =
    guideMeta.canonical == null
      ? fullUrl
      : joinUrl(domain, guideMeta.canonical);

  const translations = map(guideMeta.translations, (slug, lang) => (
    <link
      key={lang}
      rel="alternate"
      hrefLang={lang}
      href={joinUrl(domain, slug)}
    />
  ));

  return (
    <>
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="theme-color" content="#ffffff" />
      <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      <link rel="icon" href="/jirachi.png" type="image/png" sizes="128x128" />
      <link rel="canonical" href={canonicalUrl} />

      <link rel="alternate" hrefLang="x-default" href={canonicalUrl} />
      {translations}

      {/* Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content="https://pokemonrng.com/jirachi.png" />
      <meta property="og:url" content={canonicalUrl} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta
        property="twitter:image"
        content="https://pokemonrng.com/jirachi.png"
      />
    </>
  );
};
