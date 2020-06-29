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
import { GITHUB_URL, DISCORD_URL } from "../constants"

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
}))

export const NavDrawer = ({ isOpen, onClose }) => {
  const classes = useStyles()

  return (
    <Drawer
      className={classes.root}
      variant="temporary"
      anchor="left"
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
      <List>
        <ListItem component="a" href={GITHUB_URL} button>
          <ListItemText>Contribute</ListItemText>
        </ListItem>
        <ListItem component="a" href={DISCORD_URL} button>
          <ListItemText>Discord</ListItemText>
        </ListItem>
        <ListItem component={Link} to="guides" button>
          <ListItemText>Guides</ListItemText>
        </ListItem>
        <ListItem component={Link} to="/" button>
          <ListItemText>Home</ListItemText>
        </ListItem>
      </List>
    </Drawer>
  )
}
