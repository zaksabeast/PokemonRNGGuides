import React from "react";
import map from "lodash/map";

// MUI
import makeStyles from "@material-ui/core/styles/makeStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Drawer from "@material-ui/core/Drawer";

// Components
import linksArray from "../SiteLinks";

// React-router
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  drawerPaper: {
    marginTop: theme.mixins.toolbar.minHeight
  },
  listItem: {
    textAlign: "center"
  }
}));

const Links = props =>
  map(linksArray, (link, index) => (
    <ListItem
      className={props.className}
      component={Link}
      to={link.link}
      key={index}
    >
      <ListItemText
        primaryTypographyProps={{ color: "textPrimary" }}
        primary={link.text}
      />
    </ListItem>
  ));

export default function AppBarDrawer(props) {
  const classes = useStyles();

  return (
    <Drawer
      variant="temporary"
      anchor="top"
      open={props.open}
      onClose={props.toggleDrawer}
      classes={{
        paper: classes.drawerPaper
      }}
    >
      <div role="presentation" onClick={props.toggleDrawer}>
        <List>
          <Links className={classes.listItem} />
        </List>
      </div>
    </Drawer>
  );
}
