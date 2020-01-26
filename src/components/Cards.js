import React from "react";
import map from "lodash/map";

// MUI
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles(theme => ({
  card: {
    [theme.breakpoints.down("xs")]: {
      width: "90%"
    },
    width: "345px",
    margin: "10px",
    height: "160px"
  },
  title: {
    fontSize: 14
  }
}));

export default function StyledCard(props) {
  const classes = useStyles();
  return map(props.contents, (content, index) => (
    <Card className={classes.card} key={index}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {content.title}
        </Typography>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {content.subtitle}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p" noWrap>
          {content.body}
        </Typography>
      </CardContent>
      <CardActions>
        <Button color="primary">Read More</Button>
      </CardActions>
    </Card>
  ));
}
