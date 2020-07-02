import React from 'react';
import kebabCase from 'lodash/kebabCase';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import { Link } from 'gatsby';
import { GITHUB_URL, DISCORD_URL } from '../constants';
import { useGuideList } from '../utils/use-guide-list';

const useStyles = makeStyles(theme => ({
  root: {
    width: 250,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  divider: {
    marginTop: '0.5rem',
    marginBottom: '0.5rem',
  },
}));

export const NavDrawer = ({ isOpen, onClose, isLargerScreen }) => {
  const classes = useStyles();
  const guides = useGuideList();
  const guideCategories = Object.keys(guides)
    .sort()
    .map(category => {
      const toUrl = `/${kebabCase(category)}`;
      return (
        <ListItem component={Link} to={toUrl} key={category} button>
          <ListItemText>{category}</ListItemText>
        </ListItem>
      );
    });

  return (
    <Drawer
      className={classes.root}
      variant={isLargerScreen ? 'persistent' : 'temporary'}
      anchor="left"
      open={isOpen}
      onClose={onClose}
      classes={{ paper: classes.root }}
    >
      <div className={classes.header}>
        <IconButton onClick={onClose}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <List>
        <ListItem component={Link} to="/" button>
          <ListItemText>Home</ListItemText>
        </ListItem>
        <ListItem component="a" href={GITHUB_URL} button>
          <ListItemText>Contribute</ListItemText>
        </ListItem>
        <ListItem component="a" href={DISCORD_URL} button>
          <ListItemText>Discord</ListItemText>
        </ListItem>
        <Divider className={classes.divider} />
        {guideCategories}
      </List>
    </Drawer>
  );
};
