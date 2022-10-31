const kebabCase = require('lodash/kebabCase');
const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === 'Mdx') {
    const pagePath = createFilePath({ node, getNode, basePath: 'pages' });

    createNodeField({
      node,
      name: 'pagePath',
      value: pagePath,
    });
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const result = await graphql(`
    query {
      allMdx {
        edges {
          node {
            fields {
              pagePath
            }
            frontmatter {
              slug
            }
          }
        }
      }
    }
  `);

  const slugs = result.data.allMdx.edges.map(
    ({ node }) => node.frontmatter.slug,
  );

  const unique = new Set();
  const duplicateSlug = slugs.find(
    item => unique.size === unique.add(item).size,
  );
  if (duplicateSlug != null) {
    throw new Error(
      `Found duplicate slug: ${duplicateSlug}.  Please update the slug to be unique.`,
    );
  }

  // Category pages
  result.data.allMdx.edges.forEach(({ node }) => {
    const category = node.fields.pagePath.split('/')[1] || '';

    if (category.length > 0) {
      createPage({
        path: kebabCase(category),
        component: path.resolve('./src/templates/category.js'),
        context: { categoryRegex: `/${category}/`, category },
      });
    }
  });

  // Guide pages
  result.data.allMdx.edges.forEach(({ node }) => {
    createPage({
      path: node.frontmatter.slug,
      component: path.resolve(`./src/templates/post.js`),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        slug: node.frontmatter.slug,
      },
    });
  });
};
