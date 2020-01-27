import React from "react"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import makeStyles from "@material-ui/core/styles/makeStyles"
import ExpandMore from "@material-ui/icons/ExpandMore"
import ExpansionPanel from "@material-ui/core/ExpansionPanel"
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary"
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails"
import { Link } from "gatsby"
import { sortAlphabetically } from "../utils/sort-alphabetically"

const useStyles = makeStyles(theme => ({
  summary: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
  details: {
    display: "block",
    padding: "8px 24px 12px",
  },
  root: {
    "&:before": {
      backgroundColor: "#fff",
    },
  },
}))

export const GuideList = ({ guides = {} }) => {
  const classes = useStyles()
  const subCategories = Object.keys(guides)

  return subCategories.map(subCategory => {
    const subCategoryGuides = guides[subCategory]
    const sortedGuides = subCategoryGuides.sort((guide1, guide2) =>
      sortAlphabetically(guide1.title, guide2.title)
    )
    const guideListItems = sortedGuides.map(
      ({ title, description, slug }, index) => (
        <ListItem
          key={title}
          disableGutters
          component={Link}
          to={slug}
          divider={index !== subCategoryGuides.length - 1}
        >
          <ListItemText
            primaryTypographyProps={{ color: "textPrimary" }}
            primary={title}
            secondary={description}
          />
        </ListItem>
      )
    )

    return (
      <ExpansionPanel classes={{ root: classes.root }} key={subCategory}>
        <ExpansionPanelSummary
          className={classes.summary}
          expandIcon={<ExpandMore color="secondary" />}
          id={subCategory}
        >
          <ListItemText primary={subCategory} />
        </ExpansionPanelSummary>
        <ExpansionPanelDetails classes={{ root: classes.details }}>
          {guideListItems}
        </ExpansionPanelDetails>
      </ExpansionPanel>
    )
  })
}
