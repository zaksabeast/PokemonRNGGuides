import React from 'react';
import { Helmet } from 'react-helmet';
import JIRACHI_PNG from '../../static/jirachi.png';

export const MetaTags = ({
  title,
  description = 'Learn how to get the exact Pokemon you want with RNG',
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <link rel="icon" type="image/png" href={JIRACHI_PNG} />

      {/* Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={JIRACHI_PNG} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={JIRACHI_PNG} />
    </Helmet>
  );
};
