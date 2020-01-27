import { graphql, useStaticQuery } from "gatsby"

export const useMenuLinks = () => {
  const getPages = graphql`
    query {
      allFile(filter: { relativePath: { regex: "/pages(.*?).js/" } }) {
        nodes {
          relativePath
        }
      }
    }
  `

  const pageLinks = useStaticQuery(getPages).allFile.nodes.map(
    ({ relativePath }) => {
      const slug = relativePath.replace("pages/", "").replace(".js", "")
      return {
        slug: `/${slug}`,
        pageName: slug.toUpperCase(),
      }
    }
  )

  return [{ path: "/", pageName: "HOME" }, ...pageLinks]
}
