import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import "./App.css";
import { HomePage } from "./pages/Home";
import { SurveyPage } from "./pages/Survey";
import { SecondSurveyPage } from "./pages/SecondSurveyPage";

import "bootstrap/dist/css/bootstrap.css";

export default function SurveyJSReactApplication() {
  return (
    <Router>
      <div>
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand">
                JokeTailor Survey
              </a>
            </div>
          </div>
        </nav>

        <div className="app-content">
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route path="/jokesurvey">
              <SurveyPage />
            </Route>
            <Route path="/second_survey/:userId">
              <SecondSurveyPage />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}
