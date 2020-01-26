import React from "react";

// MUI
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import makeStyles from "@material-ui/core/styles/makeStyles";

// Components
import Header from "../components/Header";
import GuidesList from "../components/GuidesList";
import retailGuides from "../retailGuides";
import emulatorGuides from "../emulatorGuides";
import pcalcGuides from "../pcalcGuides";

const useStyles = makeStyles(theme => ({
  container: {
    margin: "20px auto",
    width: "90%",
    maxWidth: "700px"
  },
  tabs: {
    marginTop: "-20px",
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    boxShadow:
      "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px -10px rgba(0,0,0,0.12)"
  },
  tab: {
    maxWidth: "200px"
  }
}));

export default function Guides() {
  const classes = useStyles();

  const [tabIndex, setTabIndex] = React.useState(0);

  function handleChange(event, newTabIndex) {
    setTabIndex(newTabIndex);
  }

  return (
    <div>
      <Header title="Pokemon RNG Guides" button={false} />
      <Tabs
        value={tabIndex}
        onChange={handleChange}
        indicatorColor="secondary"
        textColor="inherit"
        variant="fullWidth"
        centered
        className={classes.tabs}
      >
        <Tab label="Retail" className={classes.tab} />
        <Tab label="Emulator" className={classes.tab} />
        <Tab label="PCalc" className={classes.tab} />
      </Tabs>
      <div className={classes.container}>
        {tabIndex === 0 && <GuidesList guides={retailGuides} />}
        {tabIndex === 1 && <GuidesList guides={emulatorGuides} />}
        {tabIndex === 2 && <GuidesList guides={pcalcGuides} />}
      </div>
    </div>
  );
}
