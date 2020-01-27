import React, { Fragment } from "react"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import makeStyles from "@material-ui/core/styles/makeStyles"
import { GuideList } from "../components/guides-list"
import { useGuideList } from "../utils/use-guide-list"
import { MainLayout } from "../layouts/main"
import { sortAlphabetically } from "../utils/sort-alphabetically"
import { MetaTags } from "../components/meta-tags"

const useStyles = makeStyles(theme => ({
  container: {
    margin: "40px auto",
    width: "90%",
    maxWidth: "700px",
  },
  tabs: {
    margin: "-20px",
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    boxShadow:
      "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px -10px rgba(0,0,0,0.12)",
  },
  tab: {
    maxWidth: "200px",
  },
}))

export default () => {
  const classes = useStyles()
  const [tabIndex, setTabIndex] = React.useState(0)
  const handleChange = (event, newTabIndex) => setTabIndex(newTabIndex)
  const guidesGroupedByCategory = useGuideList().reduce(
    (result, { category, subcategory, ...guide }) => {
      const groupedGuides = result[category] || {}
      const gameGuides = groupedGuides[subcategory] || []

      gameGuides.push(guide)
      groupedGuides[subcategory] = gameGuides
      result[category] = groupedGuides
      return result
    },
    {}
  )
  const categories = Object.keys(
    guidesGroupedByCategory
  ).sort((category1, category2) =>
    sortAlphabetically(category1.subcategory, category2.subcategory)
  )
  const tabs = categories.map((category, index) => (
    <Tab label={category} className={classes.tab} key={index} />
  ))
  const guideList = categories.map((category, index) =>
    tabIndex === index ? (
      <GuideList guides={guidesGroupedByCategory[category]} key={category} />
    ) : null
  )
  const title = "Pokemon RNG Guides"

  return (
    <Fragment>
      <MetaTags title={title} description={title} />
      <MainLayout title={title}>
        <Tabs
          value={tabIndex}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          centered
          className={classes.tabs}
        >
          {tabs}
        </Tabs>
        <div className={classes.container}>{guideList}</div>
      </MainLayout>
    </Fragment>
  )
}
