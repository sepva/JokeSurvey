import { useState, useEffect } from "react";
import { Prompt, isPrompt } from "react-router-dom";
import { Model, StylesManager } from "survey-core";
import { Survey } from "survey-react-ui";
import "survey-core/defaultV2.css";
import axios from 'axios';

StylesManager.applyTheme("defaultV2");

function onComplete(survey) {
  const email = localStorage.getItem("email");
  axios.post("http://localhost:8080/survey", { email: email, result: survey.data });
}

export function SurveyPage() {
  const [serverUrl, setServerUrl] = useState("http://localhost:8080");
  const [surveyJson, setSurveyJson] = useState();

  useEffect(() => {
    axios.get(`${serverUrl}/survey`).then((response) => {
      setSurveyJson(response.data);
    });
  }, [serverUrl]);

  useEffect(() => {
    window.addEventListener('beforeunload', alertUser)
    return () => {
      window.removeEventListener('beforeunload', alertUser)
    }
  }, [])
  const alertUser = e => {
    e.preventDefault()
    e.returnValue = ''
  }

  if (!surveyJson) return <div>Loading...</div>;

  const model = new Model(surveyJson);

  return (
    <div className="container">
      <Survey
        model={model}
        onComplete={onComplete}
      />
      <Prompt
        message={() => 'Are you sure you want to leave this beautiful survey? Your progress could be lost...'}
      />
    </div>
  );
}
