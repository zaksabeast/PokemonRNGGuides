import { graphql, useStaticQuery } from "gatsby"

export const useGuideList = () => {
  const getPages = graphql`
    query {
      allMarkdownRemark(filter: { frontmatter: { slug: { ne: "/" } } }) {
        nodes {
          fields {
            pagePath
          }
          frontmatter {
            title
            description
            slug
          }
        }
      }
    }
  `
  return useStaticQuery(getPages).allMarkdownRemark.nodes.map(
    ({ fields, frontmatter }) => {
      const splitPagePath = fields.pagePath.split("/")
      return {
        slug: frontmatter.slug,
        title: frontmatter.title,
        description: frontmatter.description,
        category: splitPagePath[1] || "",
        subcategory: splitPagePath[2] || "",
      }
    }
  )
}
