import React from "react"
import makeStyles from "@material-ui/core/styles/makeStyles"
import MUIAppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import MenuIcon from "@material-ui/icons/Menu"
import IconButton from "@material-ui/core/IconButton"
import useScrollTrigger from "@material-ui/core/useScrollTrigger"
import { Menu } from "./menu"

const useStyles = makeStyles(theme => ({
  appBar: {
    zIndex: theme.zIndex.modal + 1,
  },
  menuButton: {
    display: "none",
    marginLeft: "auto",
    [theme.breakpoints.down("sm")]: {
      display: "block",
    },
  },
}))

function ElevationScroll(props) {
  const { children } = props
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  })

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  })
}

export const AppBar = ({ toggleDrawer, ...props }) => {
  const classes = useStyles()
  return (
    <div>
      <ElevationScroll {...props}>
        <MUIAppBar color="primary" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" color="inherit">
              PokemonRNG.com
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
          </Toolbar>
        </MUIAppBar>
      </ElevationScroll>
    </div>
  )
}
