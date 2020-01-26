import React from "react";
import map from "lodash/map";

// MUI
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";

// Components
import linksArray from "../SiteLinks";

// React-router
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  menu: {
    display: "flex",
    marginLeft: "auto",
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  }
}));

export default function Menu() {
  const classes = useStyles();
  return (
    <div className={classes.menu}>
      {map(linksArray, (link, index) => (
        <Button color="inherit" component={Link} to={link.link} key={index}>
          {link.text}
        </Button>
      ))}
    </div>
  );
}
