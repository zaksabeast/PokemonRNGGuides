import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import GithubCircleIcon from 'mdi-material-ui/GithubCircle';
import DiscordIcon from 'mdi-material-ui/Discord';
import { DISCORD_URL, GITHUB_URL } from '../constants';

const useStyles = makeStyles(theme => ({
  copyrightText: {
    height: '3rem',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navigation: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.contrastText,
  },
  iconButton: {
    backgroundColor: theme.palette.primary.main,
  },
  navLinkList: {
    display: 'flex',
    justifyContent: 'center',
  },
  navLinkItem: {
    width: 'initial',
  },
}));

export const Footer = () => {
  const classes = useStyles();
  return (
    <footer>
      <nav className={classes.navigation}>
        <List className={classes.navLinkList}>
          <ListItem className={classes.navLinkItem}>
            <IconButton
              color="inherit"
              aria-label="Contribute to GitHub"
              className={classes.iconButton}
              component="a"
              href={GITHUB_URL}
            >
              <GithubCircleIcon fontSize="small" />
            </IconButton>
          </ListItem>
          <ListItem className={classes.navLinkItem}>
            <IconButton
              color="inherit"
              aria-label="Join the Discord"
              className={classes.iconButton}
              component="a"
              href={DISCORD_URL}
            >
              <DiscordIcon fontSize="small" />
            </IconButton>
          </ListItem>
        </List>
      </nav>
      <div className={classes.copyrightText}>
        <Typography align="center" variant="body2">
          © 2020 PokemonRNG.com
        </Typography>
      </div>
    </footer>
  );
};
