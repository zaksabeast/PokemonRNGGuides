import React from 'react';
import kebabCase from 'lodash/kebabCase';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import MUIListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import { Link } from 'gatsby';
import { DISCORD_URL, CONTRIBUTING_URL } from '../constants';
import { useGuideList } from '../utils/use-guide-list';
import { sortCategories } from '../utils/sort-categories';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles(theme => ({
  root: {
    width: 250,
  },
  toolbarSpace: {
    ...theme.mixins.toolbar,
  },
  divider: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

const ListItem = props => {
  return (
    <li>
      <MUIListItem component={Link} {...props} />
    </li>
  );
};

export const NavDrawer = ({ isOpen, onClose }) => {
  const theme = useTheme();
  const isLargerScreen = useMediaQuery(theme.breakpoints.up('md'));
  const classes = useStyles();
  const guides = useGuideList();
  const sortedGuideList = Object.keys(guides).sort(sortCategories);
  const guideCategories = sortedGuideList.map(category => {
    const toUrl = `/${kebabCase(category)}`;
    return (
      <ListItem to={toUrl} key={category} role="link" button>
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
      {/* 
          This is a hacky workaround, but allows using MUI's theme styles to create a space.
          This will be good in the event MUI changes the toolbar size
          or adds new sizes for different screen sizes
      */}
      <div className={classes.toolbarSpace} />
      <nav>
        <List>
          <ListItem component={Link} to="/" role="link" button>
            <ListItemText>Home</ListItemText>
          </ListItem>
          <ListItem component={Link} to={CONTRIBUTING_URL} role="link" button>
            <ListItemText>Contribute</ListItemText>
          </ListItem>
          <ListItem component="a" href={DISCORD_URL} button>
            <ListItemText>Discord</ListItemText>
          </ListItem>
          <ListItem to="/rough-drafts" role="link" button>
            <ListItemText>Rough Drafts</ListItemText>
          </ListItem>
          <Divider className={classes.divider} />
          {guideCategories}
        </List>
      </nav>
    </Drawer>
  );
};
