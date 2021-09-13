import React from 'react';
import { graphql } from 'gatsby';
import { MDXProvider } from '@mdx-js/react';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { MainLayout } from '../layouts/main';
import { mdxComponents } from '../components/mdx-components';

const PostTemplate = ({ children, pageResources, data }) => {
  const frontmatter =
    // .mdx files
    data?.mdx?.frontmatter ||
    // .md files
    pageResources?.json?.pageContext?.frontmatter ||
    {};

  return (
    <MainLayout title={frontmatter.title} description={frontmatter.description}>
      <MDXProvider components={mdxComponents}>
        {/* children is for .mdx files and data.mdx.body is for .md files */}
        {children || <MDXRenderer>{data?.mdx?.body}</MDXRenderer>}
      </MDXProvider>
    </MainLayout>
  );
};

export default PostTemplate;

export const query = graphql`
  query ($slug: String!) {
    mdx(frontmatter: { slug: { eq: $slug } }) {
      frontmatter {
        title
        description
      }
      body
    }
  }
`;
