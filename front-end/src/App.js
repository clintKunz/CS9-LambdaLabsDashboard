import React, { Component } from "react";
import "./App.css";
import { Route } from "react-router-dom";
import Classes from "./Components/Classes/classes.js";
import LandingPage from "./Components/LandingPage/LandingPage.js";
import Projects from "./Components/Projects/projects.js";
import Billing from "./Components/Billing/billing.js";
import CreateProject from "./Components/CreateProject/createProject.js";
import EditProject from "./Components/EditProject/editProject.js";
import Settings from "./Components/Settings/settings.js";

class App extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={LandingPage} />
        <Route path="/classes" component={Classes} />
        <Route path="/projects" component={Projects} />
        <Route path="/billing" component={Billing} />
        <Route path="/settings" component={Settings} />
        <Route
          exact
          path="/createProject"
          CreateProject
          component={CreateProject}
        />
        <Route
          exact
          path="/projects/:id"
          CreateProject
          component={EditProject}
        />
      </div>
    );
  }
}

export default App;
