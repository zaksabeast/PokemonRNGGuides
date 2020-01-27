import React from "react"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import makeStyles from "@material-ui/core/styles/makeStyles"
import { Link } from "gatsby"

const useStyles = makeStyles(theme => ({
  button: {
    margin: "20px auto",
  },
  container: {
    [`${theme.breakpoints.up("xs")} and (orientation: landscape)`]: {
      marginTop: 48,
    },
    [theme.breakpoints.up("sm")]: {
      marginTop: 64,
    },
    textAlign: "center",
    marginTop: 56,
    padding: 20,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    marginBottom: 10,
  },
}))

export const Header = props => {
  const classes = useStyles()
  return (
    <div className={classes.container}>
      <Typography variant="h4" align="center">
        {props.title}
      </Typography>
      {props.button && (
        <Button
          variant="outlined"
          color="inherit"
          className={classes.button}
          component={Link}
          to="/rngexplanation"
        >
          What is Pokemon RNG?
        </Button>
      )}
    </div>
  )
}
