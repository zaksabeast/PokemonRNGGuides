import React from "react";

// MUI
import makeStyles from "@material-ui/styles/makeStyles";

// Components
import ToC from "../components/TableofContents";
import Header from "../components/Header";
import Markdown from "../Markdown";
import { guideMarkdown } from "../guideMarkdown";

const useStyles = makeStyles(theme => ({
  container: {
    width: "100%",
    display: "flex"
  },
  text: {
    margin: "35px 35px 35px 0px",
    width: "80%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      margin: "35px"
    }
  }
}));

export default function SingleGuide() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Header title="Sun/Moon" button={false} />
      <div className={classes.container}>
        <ToC />
        <div className={classes.text}>
          <Markdown>{guideMarkdown}</Markdown>
        </div>
      </div>
    </React.Fragment>
  );
}
