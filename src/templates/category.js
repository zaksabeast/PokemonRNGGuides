import React from 'react';
import { graphql, Link } from 'gatsby';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { MainLayout } from '../layouts/main';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import VisibilityIcon from '@material-ui/icons/Visibility';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles(theme => ({
  guideInfo: {
    display: 'flex',
    paddingTop: '3rem',
    paddingBottom: '3rem',
    margin: 0,
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  viewButton: {
    marginRight: '2rem',
  },
}));

const getGuideTitleId = index => `guide-${index}-title`;
const getGuideDescriptionId = index => `guide-${index}-description`;

const CategoryTemplate = ({ data, pageContext }) => {
  const classes = useStyles();
  const guides = data.allMarkdownRemark.nodes;

  const guideList = guides.map((guide, index) => {
    const { title, slug, description } = guide.frontmatter;
    const guideTitleId = getGuideTitleId(index);
    const guideDescriptionId = getGuideDescriptionId(index);

    return (
      <ListItem className={classes.guideInfo} key={title} disableGutters>
        <IconButton
          component={Link}
          className={classes.viewButton}
          to={`/${slug}`}
          role="link"
          aria-labelledby={`${guideTitleId} ${guideDescriptionId}`}
        >
          <VisibilityIcon />
        </IconButton>
        <ListItemText>
          <Typography variant="h5" component="p" id={guideTitleId}>
            {title}
          </Typography>
          <Typography variant="body2" id={guideDescriptionId}>
            {description}
          </Typography>
        </ListItemText>
      </ListItem>
    );
  });

  return (
    <MainLayout title={pageContext.category}>
      <List>{guideList}</List>
    </MainLayout>
  );
};

export default CategoryTemplate;

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
`;
