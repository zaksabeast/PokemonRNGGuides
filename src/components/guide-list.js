import React from 'react';
import { Link } from 'gatsby';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
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
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  viewButton: {
    marginRight: '2rem',
  },
  subCategoryTitle: {
    marginTop: '3rem',
  },
}));

const getGuideTitleId = slug => `guide-${slug}-title`;
const getGuideDescriptionId = slug => `guide-${slug}-description`;

export const GuideList = ({ subCategoryTitle, guides }) => {
  const classes = useStyles();

  const guideList = guides.map(guide => {
    const { title, slug, description } = guide.frontmatter;
    const guideTitleId = getGuideTitleId(slug);
    const guideDescriptionId = getGuideDescriptionId(slug);

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
