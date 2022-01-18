import { graphql, useStaticQuery } from 'gatsby';

export const useGuideList = () => {
  const getPages = graphql`
    query {
      allMdx(
        filter: {
          fileAbsolutePath: { regex: "/guides/" }
          frontmatter: { slug: { ne: "/" } }
        }
      ) {
        nodes {
          fields {
            pagePath
          }
          frontmatter {
            title
            description
            slug
            isRoughDraft
          }
        }
      }
    }
  `;
  return useStaticQuery(getPages).allMdx.nodes.reduce(
    (result, { fields, frontmatter }) => {
      if (frontmatter.isRoughDraft) {
        return result;
      }

      const splitPagePath = fields.pagePath.split('/');
      const category = splitPagePath[1] || '';
      const bundledGuides = result[category] || [];
      const guide = {
        slug: frontmatter.slug,
        title: frontmatter.title,
        description: frontmatter.description,
        category,
      };

      bundledGuides.push(guide);
      result[category] = bundledGuides;

      return result;
    },
    {},
  );
};
