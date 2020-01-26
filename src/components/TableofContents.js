import React from "react";

// MUI
import makeStyles from "@material-ui/core/styles/makeStyles";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const useStyles = makeStyles(theme => ({
  root: {
    [`${theme.breakpoints.up("xs")} and (orientation: landscape)`]: {
      top: 48
    },
    [theme.breakpoints.up("sm")]: {
      top: 64
    },
    backgroundColor: theme.palette.background.paper,
    padding: "0px 16px 16px 0px",
    width: "175px",
    position: "sticky",
    top: 56,
    alignSelf: "flex-start",
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  },
  nested: {
    paddingLeft: theme.spacing(4)
  }
}));

export default function NestedList() {
  const classes = useStyles();

  return (
    <List
      dense={true}
      disablePadding={true}
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader id="nested-list-subheader">
          Table of Contents
        </ListSubheader>
      }
      className={classes.root}
    >
      <ListItem selected={true}>
        <ListItemText primary="Tools" />
      </ListItem>
      <ListItem>
        <ListItemText primary="Step 1" />
      </ListItem>
      <ListItem>
        <ListItemText primary="Step 2" />
      </ListItem>
      <ListItem>
        <ListItemText primary="Step 3" />
      </ListItem>
    </List>
  );
}
