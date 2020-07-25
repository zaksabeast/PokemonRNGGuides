import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import MUIAppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

const useStyles = makeStyles(theme => ({
  appBar: {
    zIndex: theme.zIndex.modal + 1,
  },
  toolbar: {
    paddingLeft: '0.75rem',
    paddingRight: '0.5rem',
  },
  menuButton: {
    marginRight: '0.75rem',
  },
}));

function ElevationScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

export const AppBar = ({ toggleDrawer, ...props }) => {
  const classes = useStyles();
  return (
    <ElevationScroll {...props}>
      <MUIAppBar color="primary" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            className={classes.menuButton}
            color="inherit"
            aria-label="Open drawer"
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="h1" color="inherit">
            PokemonRNG.com
          </Typography>
        </Toolbar>
      </MUIAppBar>
    </ElevationScroll>
  );
};
