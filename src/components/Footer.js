import React from "react";

// MUI
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";

// Icons
import TwitterIcon from "mdi-material-ui/Twitter";
import GithubCircleIcon from "mdi-material-ui/GithubCircle";
import DiscordIcon from "mdi-material-ui/Discord";

const useStyles = makeStyles(theme => ({
  bottom: {
    height: "53px",
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  content: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.contrastText,
    marginTop: "10px",
    padding: "10px"
  },
  iconButton: {
    backgroundColor: theme.palette.primary.main,
    margin: "5px"
  },
  buttons: {
    textAlign: "center"
  }
}));

export default function Footer() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <div className={classes.content}>
        <div className={classes.buttons}>
          <IconButton color="inherit" className={classes.iconButton}>
            <TwitterIcon fontSize="small" />
          </IconButton>
          <IconButton color="inherit" className={classes.iconButton}>
            <GithubCircleIcon fontSize="small" />
          </IconButton>
          <IconButton color="inherit" className={classes.iconButton}>
            <DiscordIcon fontSize="small" />
          </IconButton>
        </div>
      </div>
      <div className={classes.bottom}>
        <Typography align="center" variant="body2">
          2017 - 2019 @ pokemonrng.com | Privacy Policy | Terms of Use
        </Typography>
      </div>
    </React.Fragment>
  );
}
