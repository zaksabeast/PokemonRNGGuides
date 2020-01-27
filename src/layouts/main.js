import React, { useState } from "react"
import Grid from "@material-ui/core/Grid"
import makeStyles from "@material-ui/core/styles/makeStyles"
import { NavDrawer } from "../components/nav-drawer"
import { AppBar } from "../components/app-bar"
import { Footer } from "../components/footer"
import { Header } from "../components/header"
import "../styles/global.css"

const useStyles = makeStyles({
  grid: {
    overflowX: "hidden",
    minHeight: "100vh",
  },
  content: {
    flexGrow: 1,
    width: "100%",
  },
})

export const MainLayout = ({ children, title }) => {
  const [isNavDrawerOpen, setIsNavDrawerOpen] = useState(false)
  const classes = useStyles()

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      justify="center"
      alignItems="stretch"
      className={classes.grid}
    >
      <AppBar toggleDrawer={() => setIsNavDrawerOpen(!isNavDrawerOpen)} />
      <Header title={title} button={false} />
      <NavDrawer
        isOpen={isNavDrawerOpen}
        onClose={() => setIsNavDrawerOpen(false)}
      />
      <div className={classes.content}>{children}</div>
      <Footer />
    </Grid>
  )
}
