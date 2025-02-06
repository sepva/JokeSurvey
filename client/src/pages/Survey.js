import { useState, useEffect } from "react";
import { Model, StylesManager } from "survey-core";
import { Survey } from "survey-react-ui";
import "survey-core/defaultV2.css";
import axios from 'axios';

StylesManager.applyTheme("defaultV2");

function onValueChanged(_, options) {
  console.log("New value: " + options.value);
}

function onComplete(survey) {
  console.log("Survey complete! Results: " + JSON.stringify(survey.data));
}

export function SurveyPage() {
  const [serverUrl, setServerUrl] = useState("http://localhost:8080");
  const [surveyJson, setSurveyJson] = useState();

  useEffect(() => {
    axios.get(`${serverUrl}/survey`).then((response) => {
      setSurveyJson(response.data);
    });
  }, [serverUrl]);

  if (!surveyJson) return <div>Loading...</div>;

  const model = new Model(surveyJson);

  return (
    <div className="container">
      <h1>SurveyJS Library / Runner</h1>
      <Survey
        model={model}
        onComplete={onComplete}
        onValueChanged={onValueChanged}
      />
    </div>
  );
}
