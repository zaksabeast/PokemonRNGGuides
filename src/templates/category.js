import React from "react"
import { graphql, Link } from "gatsby"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"
import { MainLayout } from "../layouts/main"
import Divider from "@material-ui/core/Divider"
import VisibilityIcon from "@material-ui/icons/Visibility"
import IconButton from "@material-ui/core/IconButton"

const useStyles = makeStyles({
  guideInfo: {
    display: "flex",
    padding: "3rem 2rem",
  },
  divider: {
    marginLeft: "2rem",
    marginRight: "2rem",
  },
  viewButton: {
    marginRight: "2rem",
  },
})

const CategoryTemplate = ({ data, pageContext }) => {
  const classes = useStyles()
  const guides = data.allMarkdownRemark.nodes
  const { category } = pageContext
  const guideList = guides.map((guide, index) => {
    const { title, slug, description } = guide.frontmatter
    return (
      <React.Fragment key={title}>
        {index > 0 && <Divider className={classes.divider} />}
        <div className={classes.guideInfo}>
          <IconButton component={Link} className={classes.viewButton} to={slug}>
            <VisibilityIcon />
          </IconButton>
          <div>
            <Typography variant="h5">{title}</Typography>
            <Typography variant="body2">{description}</Typography>
          </div>
        </div>
      </React.Fragment>
    )
  })

  return <MainLayout title={category}>{guideList}</MainLayout>
}

export default CategoryTemplate

export const query = graphql`
  query($categoryRegex: String!) {
    allMarkdownRemark(
      filter: { fields: { pagePath: { regex: $categoryRegex } } }
    ) {
      nodes {
        frontmatter {
          title
          description
          slug
        }
      }
    }
  }
`
