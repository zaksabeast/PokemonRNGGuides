import React from "react";

// MUI
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles({
  grid: {
    overflowX: "hidden"
  }
});

export default function GridLayout(props) {
  const classes = useStyles();
  return (
    <Grid
      container
      spacing={0}
      direction="row"
      justify="center"
      alignItems="flex-start"
      className={classes.grid}
    >
      {props.children}
    </Grid>
  );
}
