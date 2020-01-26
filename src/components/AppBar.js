import React from "react";

// MUI
import makeStyles from "@material-ui/core/styles/makeStyles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";

// Components
import Drawer from "./Drawer";
import Menu from "./Menu";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  appBar: {
    zIndex: theme.zIndex.modal + 1
  },
  menuButton: {
    display: "none",
    marginLeft: "auto",
    [theme.breakpoints.down("sm")]: {
      display: "block"
    }
  }
}));

function ElevationScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0
  });
}

export default function SimpleAppBar(props) {
  const classes = useStyles();
  const [isOpen, setOpen] = React.useState(false);

  function toggleDrawer() {
    setOpen(!isOpen);
  }
  return (
    <div className={classes.root}>
      <ElevationScroll {...props}>
        <AppBar color="primary" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" color="inherit">
              PokemonRNG
            </Typography>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Open drawer"
              onClick={toggleDrawer}
            >
              <MenuIcon />
            </IconButton>
            <Menu />
            <Drawer open={isOpen} toggleDrawer={toggleDrawer} />
          </Toolbar>
        </AppBar>
      </ElevationScroll>
    </div>
  );
}
