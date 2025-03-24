import { useState, useEffect } from "react";
import { Prompt, isPrompt } from "react-router-dom";
import { Model, StylesManager } from "survey-core";
import { Survey } from "survey-react-ui";
import "survey-core/defaultV2.css";
import axios from 'axios';

StylesManager.applyTheme("defaultV2");

const server_url = "http://localhost:8080"
// const server_url = ""

function alertUser(e) {
  e.preventDefault()
  e.returnValue = ''
}

export function SurveyPage() {
  const [serverUrl, setServerUrl] = useState(server_url);
  const [surveyJson, setSurveyJson] = useState();
  let finished = false;

  function onComplete(survey) {
    finished = true;
    window.removeEventListener('beforeunload', alertUser)
    axios.post(`${server_url}/survey`, { result: survey.data });
  }

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

  if (!surveyJson) return <div>Loading...</div>;

  const model = new Model(surveyJson);

  return (
    <div className="container">
      <Survey
        model={model}
        onComplete={onComplete}
      />
      <Prompt
        when={!finished}
        message={() => 'Are you sure you want to leave this beautiful survey? Your progress will be lost...'}
      />
    </div>
  );
}
