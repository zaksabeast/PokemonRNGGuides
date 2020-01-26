import ReactDOM from "react-dom";
import React from "react";

// MUI
import { MuiThemeProvider } from "@material-ui/core/styles";
import { theme } from "./theme";

// React-router
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Guides from "./pages/Guides";
import Tools from "./pages/Tools";
import SingleGuide from "./pages/SingleGuide";

// Components
import SimpleAppBar from "./components/AppBar";
import Footer from "./components/Footer";
import RNGExplanation from "./RNGExplanation";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <React.Fragment>
        <Router>
          <SimpleAppBar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/guides" component={Guides} />
            <Route exact path="/tools" component={Tools} />
            <Route exact path="/guides/wild" component={SingleGuide} />
            <Route exact path="/rngexplanation" component={RNGExplanation} />
          </Switch>
          <Footer />
        </Router>
      </React.Fragment>
    </MuiThemeProvider>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
