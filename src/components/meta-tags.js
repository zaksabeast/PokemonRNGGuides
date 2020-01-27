import React from "react"
import { Helmet } from "react-helmet"
import { JIRACHI_PNG } from "../constants"

export const MetaTags = ({ title, description }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta name="description" content={description} />
      <meta property="og:image" content={JIRACHI_PNG} />
      <link
        rel="icon"
        type="image/png"
        href={JIRACHI_PNG}
        class="jsx-2872336278 next-head"
      ></link>
    </Helmet>
  )
}
