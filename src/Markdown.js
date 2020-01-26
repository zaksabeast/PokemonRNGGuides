import React from "react";
import ReactMarkdown from "markdown-to-jsx";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

const styles = theme => ({
  listItem: {
    marginTop: theme.spacing(1)
  },
  blockquote: {
    backgroundColor: "#eeeeee",
    padding: "5px"
  },
  header: {
    borderBottom: "2px solid rgba(0, 0, 0, 0.54)"
  },
  h5: {
    backgroundColor: "#eeeeee",
    padding: "5px",
    marginBottom: "5px",
    width: "fit-content"
  }
});

const options = {
  overrides: {
    h1: {
      component: withStyles(styles)(({ classes, ...props }) => (
        <Typography gutterBottom align="center" variant="h4" {...props} />
      ))
    },
    h2: {
      component: props => <Typography gutterBottom variant="h6" {...props} />
    },
    h3: {
      component: props => (
        <Typography gutterBottom variant="subtitle1" {...props} />
      )
    },
    h4: {
      component: props => (
        <Typography gutterBottom variant="caption" paragraph {...props} />
      )
    },
    h5: {
      component: withStyles(styles)(({ classes, ...props }) => (
        <Typography
          classes={{ root: classes.h5 }}
          variant="subtitle2"
          {...props}
        />
      ))
    },
    p: { component: props => <Typography paragraph {...props} /> },
    a: { component: Link },
    li: {
      component: withStyles(styles)(({ classes, ...props }) => (
        <li className={classes.listItem}>
          <Typography component="span" {...props} />
        </li>
      ))
    },
    ol: {
      component: withStyles(styles)(({ classes, ...props }) => (
        <ol className={classes.listItem}>
          <Typography component="span" {...props} />
        </ol>
      ))
    },
    pre: {
      component: props => <Typography variant="body2" {...props} />
    },
    blockquote: {
      component: withStyles(styles)(({ classes, ...props }) => (
        <blockquote className={classes.blockquote}>
          <Typography component="span" gutterBottom={false} {...props} />
        </blockquote>
      ))
    }
  }
};

export default function Markdown(props) {
  return <ReactMarkdown options={options} {...props} />;
}
