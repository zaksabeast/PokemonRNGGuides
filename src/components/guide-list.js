import React from 'react';
import { Link } from 'gatsby';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import VisibilityIcon from '@material-ui/icons/Visibility';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import orderBy from 'lodash/orderBy';

const useStyles = makeStyles(theme => ({
  guideInfo: {
    display: 'flex',
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(6),
  },
  viewButton: {
    marginRight: theme.spacing(4),
  },
  subCategoryTitle: {
    marginTop: theme.spacing(6),
  },
}));

const getGuideTitleId = slug => `guide-${slug}-title`;
const getGuideDescriptionId = slug => `guide-${slug}-description`;

export const GuideList = ({ subCategoryTitle, guides }) => {
  const classes = useStyles();

  const orderedGuides = orderBy(guides, guide => guide.frontmatter.title);

  const guideList = orderedGuides.map((guide, index) => {
    const { title, slug, description } = guide.frontmatter;
    const guideTitleId = getGuideTitleId(slug);
    const guideDescriptionId = getGuideDescriptionId(slug);

    return (
      <React.Fragment key={title}>
        <ListItem className={classes.guideInfo} disableGutters>
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
        {index < orderedGuides.length - 1 && (
          <Divider aria-hidden="true" />
        )}
      </React.Fragment>
    );
  });

  return (
    <React.Fragment>
      <Typography
        variant="h4"
        component="h2"
        className={classes.subCategoryTitle}
      >
        {subCategoryTitle}
      </Typography>
      <List>{guideList}</List>
    </React.Fragment>
  );
};
