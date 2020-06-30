import React from "react"
import Grid from "@material-ui/core/Grid"
import { makeStyles, useTheme } from "@material-ui/core/styles"
import useMediaQuery from "@material-ui/core/useMediaQuery"
import { NavDrawer } from "../components/nav-drawer"
import { AppBar } from "../components/app-bar"
import { Footer } from "../components/footer"
import Typography from "@material-ui/core/Typography"
import { MetaTags } from "../components/meta-tags"
import "../styles/global.css"

const DRAWER_WIDTH = 240

const useStyles = makeStyles(theme => ({
  grid: {
    overflowX: "hidden",
    minHeight: "100vh",
  },
  content: {
    flexGrow: 1,
    marginTop: theme.mixins.toolbar.minHeight,
    [theme.breakpoints.up("md")]: {
      maxWidth: 800,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  contentNavDrawerUnshift: {
    [theme.breakpoints.up("md")]: {
      width: "75%",
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
  },
  contentNavDrawerShift: {
    [theme.breakpoints.up("md")]: {
      marginLeft: "auto",
      width: `calc(75% - ${DRAWER_WIDTH}px)`,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
  },
  title: {
    padding: "4rem 2.5rem 0.5rem 2.5rem",
  },
}))

export const MainLayout = ({ children, title, description }) => {
  const theme = useTheme()
  const isLargerScreen = useMediaQuery(theme.breakpoints.up("md"))
  const [isNavDrawerOpen, setIsNavDrawerOpen] = React.useState(false)
  const classes = useStyles()
  const contentClassNames = isNavDrawerOpen
    ? `${classes.content} ${classes.contentNavDrawerShift}`
    : `${classes.content} ${classes.contentNavDrawerUnshift}`

  return (
    <React.Fragment>
      <MetaTags title={title} description={description} />
      <Grid
        container
        spacing={0}
        direction="column"
        justify="center"
        alignItems="stretch"
        className={classes.grid}
      >
        <AppBar toggleDrawer={() => setIsNavDrawerOpen(!isNavDrawerOpen)} />
        <NavDrawer
          isOpen={isNavDrawerOpen}
          isLargerScreen={isLargerScreen}
          onClose={() => setIsNavDrawerOpen(false)}
        />
        <div className={contentClassNames}>
          <div className={classes.title}>
            <Typography variant="h3" component="h1">
              {title}
            </Typography>
            <Typography variant="subtitle1">{description}</Typography>
          </div>
          {children}
        </div>
        <Footer />
      </Grid>
    </React.Fragment>
  )
}
