import { GuideMeta } from "~/guides";

type Props = {
  guideMeta?: GuideMeta;
};

export const MetaTags = ({ guideMeta }: Props) => {
  const title = guideMeta?.title ?? "PokemonRNG.com - Become The Very Best";
  const description =
    guideMeta?.description ?? "Train Smarter, Shine Brighter — Together.";

  return (
    <>
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="theme-color" content="#ffffff" />
      <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      <link rel="icon" href="/jirachi.png" type="image/png" sizes="128x128" />

      {/* Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content="/jirachi.png" />
      <meta property="og:url" content="https://pokemonrng.com" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content="/jirachi.png" />
    </>
  );
};
