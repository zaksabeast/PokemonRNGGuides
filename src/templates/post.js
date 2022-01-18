import React from 'react';
import { graphql } from 'gatsby';
import { MDXProvider } from '@mdx-js/react';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { makeStyles } from '@material-ui/core/styles';
import { MainLayout } from '../layouts/main';
import { mdxComponents } from '../components/mdx-components';
import { RoughDraftAlert } from '../components/rough-draft-alert';

const useStyles = makeStyles(theme => ({
  roughDraftAlert: {
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(6),
  },
}));

const PostTemplate = ({ children, pageResources, data }) => {
  const classes = useStyles();
  const frontmatter =
    // .mdx files
    data?.mdx?.frontmatter ||
    // .md files
    pageResources?.json?.pageContext?.frontmatter ||
    {};

  return (
    <MainLayout title={frontmatter.title} description={frontmatter.description}>
      {frontmatter.isRoughDraft && (
        <div className={classes.roughDraftAlert}>
          <RoughDraftAlert />
        </div>
      )}
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
        isRoughDraft
      }
      body
    }
  }
`;
