import React from "react"
import Button from "@material-ui/core/Button"
import makeStyles from "@material-ui/core/styles/makeStyles"
import { Link } from "gatsby"
import { useMenuLinks } from "../utils/use-menu-links"

const useStyles = makeStyles(theme => ({
  menu: {
    display: "flex",
    marginLeft: "auto",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
}))

export const Menu = () => {
  const classes = useStyles()
  const links = useMenuLinks().map(({ pageName, slug }, index) => (
    <Button color="inherit" component={Link} to={slug} key={index}>
      {pageName}
    </Button>
  ))

  return <div className={classes.menu}>{links}</div>
}
