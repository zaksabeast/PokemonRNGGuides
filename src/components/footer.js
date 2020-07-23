import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import GithubCircleIcon from 'mdi-material-ui/GithubCircle';
import DiscordIcon from 'mdi-material-ui/Discord';
import { DISCORD_URL, GITHUB_URL } from '../constants';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  bottom: {
    height: '53px',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.contrastText,
    marginTop: '10px',
    padding: '10px',
  },
  iconButton: {
    backgroundColor: theme.palette.primary.main,
    margin: '5px',
  },
  buttons: {
    textAlign: 'center',
  },
}));

export const Footer = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <div className={classes.buttons}>
          <IconButton
            color="inherit"
            aria-label="Contribute to GitHub"
            className={classes.iconButton}
            component="a"
            href={GITHUB_URL}
          >
            <GithubCircleIcon fontSize="small" />
          </IconButton>
          <IconButton
            color="inherit"
            aria-label="Join the Discord"
            className={classes.iconButton}
            component="a"
            href={DISCORD_URL}
          >
            <DiscordIcon fontSize="small" />
          </IconButton>
        </div>
      </div>
      <div className={classes.bottom}>
        <Typography align="center" variant="body2">
          © 2020 PokemonRNG.com
        </Typography>
      </div>
    </div>
  );
};
