import React, { Fragment } from "react"
import { graphql } from "gatsby"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"
import { MainLayout } from "../layouts/main"
import { MetaTags } from "../components/meta-tags"

const useStyles = makeStyles(theme => ({
  title: {
    padding: "5% 5% 1% 5%",
  },
  content: {
    marginTop: theme.mixins.toolbar.minHeight,
    [theme.breakpoints.up("md")]: {
      maxWidth: 800,
      width: "75%",
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  body: {
    padding: "0 5% 5% 5%",
  },
  paper: {
    marginLeft: "10%",
    marginRight: "10%",
  },
}))

export default ({ data }) => {
  const classes = useStyles()
  const post = data.markdownRemark

  return (
    <Fragment>
      <MetaTags
        title={post.frontmatter.title}
        description={post.frontmatter.description}
      />
      <MainLayout title={post.frontmatter.title}>
        <div className={classes.content}>
          <div className={classes.title}>
            <Typography variant="h3" component="h1">
              {post.frontmatter.title}
            </Typography>
            <Typography variant="subtitle1">
              {post.frontmatter.description}
            </Typography>
          </div>
          <Typography
            component="div"
            className={classes.body}
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
        </div>
      </MainLayout>
    </Fragment>
  )
}

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
`
