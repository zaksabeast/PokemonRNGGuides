import React from 'react';
import { graphql } from 'gatsby';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { MainLayout } from '../layouts/main';

const useStyles = makeStyles({
  body: {
    padding: '0 2.5rem 2.5rem 2.5rem',
    '& h2': {
      fontSize: '2rem',
      marginTop: '3rem',
    },
  },
});

const PostTemplate = ({ data }) => {
  const classes = useStyles();
  const post = data.markdownRemark;

  return (
    <MainLayout
      title={post.frontmatter.title}
      description={post.frontmatter.description}
    >
      <Typography
        component="div"
        className={classes.body}
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
    </MainLayout>
  );
};

export default PostTemplate;

export const query = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        description
      }
    }
  }
`;
