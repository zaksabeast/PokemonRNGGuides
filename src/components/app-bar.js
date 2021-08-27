import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import MUIAppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Badge from '@material-ui/core/Badge';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

const useStyles = makeStyles(theme => ({
  appBar: {
    zIndex: theme.zIndex.modal + 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
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
        <Toolbar>
          <IconButton
            className={classes.menuButton}
            color="inherit"
            aria-label="Open drawer"
            onClick={toggleDrawer}
            edge="start"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Pokemon RNG
          </Typography>
          <IconButton color="inherit"><Badge badgeContent={1} color="secondary"><NotificationsIcon /></Badge></IconButton>
        </Toolbar>
      </MUIAppBar>
    </ElevationScroll>
  );
};
