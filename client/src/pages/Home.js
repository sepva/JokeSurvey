import "bootstrap/dist/css/bootstrap.css";
import { useHistory } from "react-router-dom";

export function HomePage() {
  const history = useHistory()
  const change_page = () => {
    history.push("/jokesurvey")
  }

  return (
    <div className="container">
      <h1>JokeTailor survey</h1>
      <p>We are conducting research on how AI can generate personalized jokes that match individual humor preferences. The goal of this study is to explore whether an AI model can learn what makes you laugh and adapt its jokes accordingly.</p>

      <h2>How the Survey Works</h2>
      <p>This survey consists of two parts:</p>
      <ul>
        <li><strong>Understanding Your Humor</strong> - First, we will ask you about your humor preferences and gather data on what jokes you find funny.</li>
        <li><strong>Evaluating Humor</strong> <em>(at a later date)</em> - Once this phase is ready, you will receive an email with a personal survey link where you'll be asked to rate different jokes based on how funny you find them.</li>
      </ul>

      <h2>Privacy & Data Security</h2>
      <p>We take your privacy seriously. All data will be used solely for research purposes, and no personal information—such as email addresses—will be published or shared. Your responses will remain confidential, and participation is entirely voluntary.</p>

      <p>Your input will help us improve AI-driven humor personalization. Plus, it's a fun opportunity to explore what makes humor work!</p>

      <p><strong>Thank you for your time—let's make AI comedy smarter together!</strong></p>
      <button className="btn btn-primary" onClick={change_page}> Start survey</button>
    </div>
  );
}
