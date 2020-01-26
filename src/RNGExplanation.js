import React from "react";
import makeStyles from "@material-ui/styles/makeStyles";
import Markdown from "./Markdown";
import { testMarkdown } from "./testMarkdown";

const useStyles = makeStyles(theme => ({
  header: {
    height: "100px",
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    marginTop: 56,
    [`${theme.breakpoints.up("xs")} and (orientation: landscape)`]: {
      marginTop: 48
    },
    [theme.breakpoints.up("sm")]: {
      marginTop: 64
    },
    padding: "20px"
  },
  text: {
    margin: "35px",
    [theme.breakpoints.up("lg")]: {
      margin: "35px auto"
    },
    maxWidth: "800px",
    marginTop: 66,
    [`${theme.breakpoints.up("xs")} and (orientation: landscape)`]: {
      marginTop: 58
    },
    [theme.breakpoints.up("sm")]: {
      marginTop: 74
    }
  }
}));

export default function RNGExplanation() {
  const classes = useStyles();
  return (
    <div className={classes.text}>
      <Markdown>{testMarkdown}</Markdown>
    </div>
  );
}
