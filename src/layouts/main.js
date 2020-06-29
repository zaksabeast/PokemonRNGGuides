import React from "react"
import Grid from "@material-ui/core/Grid"
import makeStyles from "@material-ui/core/styles/makeStyles"
import { NavDrawer } from "../components/nav-drawer"
import { AppBar } from "../components/app-bar"
import { Footer } from "../components/footer"
import Typography from "@material-ui/core/Typography"
import { MetaTags } from "../components/meta-tags"
import "../styles/global.css"

const useStyles = makeStyles(theme => ({
  grid: {
    overflowX: "hidden",
    minHeight: "100vh",
  },
  content: {
    flexGrow: 1,
    marginTop: theme.mixins.toolbar.minHeight,
    width: "100%",
    [theme.breakpoints.up("md")]: {
      maxWidth: 800,
      width: "75%",
      marginLeft: "auto",
      marginRight: "auto",
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
          onClose={() => setIsNavDrawerOpen(false)}
        />
        <div className={classes.content}>
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
