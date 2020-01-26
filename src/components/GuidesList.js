import React from "react";
import map from "lodash/map";

// MUI
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import makeStyles from "@material-ui/styles/makeStyles";
import ExpandMore from "@material-ui/icons/ExpandMore";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";

// React-router
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  summary: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText
  },
  details: {
    display: "block",
    padding: "8px 24px 12px"
  },
  root: {
    "&:before": {
      backgroundColor: "#fff"
    }
  }
}));

export default function Guides(props) {
  const classes = useStyles();

  return map(props.guides, (game, index) => (
    <ExpansionPanel classes={{ root: classes.root }} key={index}>
      <ExpansionPanelSummary
        className={classes.summary}
        expandIcon={<ExpandMore color="secondary" />}
        id={game.game}
      >
        <ListItemText primary={game.game} />
      </ExpansionPanelSummary>
      <ExpansionPanelDetails classes={{ root: classes.details }}>
        {map(game.guides, (guide, index) => (
          <ListItem
            key={index}
            disableGutters
            component={Link}
            to={`/guides/${guide.link}`}
            divider={index !== game.guides.length - 1}
          >
            <ListItemText
              key={index}
              primaryTypographyProps={{ color: "textPrimary" }}
              primary={guide.name}
              secondary={guide.text}
            />
          </ListItem>
        ))}
      </ExpansionPanelDetails>
    </ExpansionPanel>
  ));
}
