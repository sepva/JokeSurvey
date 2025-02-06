import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import "./App.css";
import { HomePage } from "./pages/Home";
import { SurveyPage } from "./pages/Survey";
import validator from "validator"

import "bootstrap/dist/css/bootstrap.css";

//TODO: alert when trying to leave survey page

function email_present() {
  const email = localStorage.getItem("email")
  return email !== null && validator.isEmail(email)
}

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
            <Route path="/survey">
              {email_present() ? <SurveyPage /> : <Redirect to="/" />}
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}
