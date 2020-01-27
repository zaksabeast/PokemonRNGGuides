import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Drawer from "@material-ui/core/Drawer"
import Divider from "@material-ui/core/Divider"
import IconButton from "@material-ui/core/IconButton"
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import List from "@material-ui/core/List"
import { Link } from "gatsby"
import { useMenuLinks } from "../utils/use-menu-links"

const useStyles = makeStyles(theme => ({
  root: {
    width: 250,
  },
  header: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  link: {
    textDecoration: "none",
    color: "inherit",
  },
}))

const DrawerItem = ({ to, children }) => {
  const classes = useStyles()
  return (
    <Link to={to} className={classes.link}>
      <ListItem button>
        <ListItemText>{children}</ListItemText>
      </ListItem>
    </Link>
  )
}

export const NavDrawer = ({ isOpen, onClose }) => {
  const classes = useStyles()
  const navigationItems = useMenuLinks().map(({ pageName, slug }) => (
    <DrawerItem to={slug} key={pageName}>
      {pageName}
    </DrawerItem>
  ))

  return (
    <Drawer
      className={classes.root}
      variant="temporary"
      anchor="right"
      open={isOpen}
      onClose={onClose}
      classes={{ paper: classes.root }}
    >
      <div className={classes.header}>
        <IconButton onClick={onClose}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <List>{navigationItems}</List>
    </Drawer>
  )
}
