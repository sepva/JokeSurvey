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

      <h3>How the Survey Works</h3>
      <p>This survey consists of two phases, <strong>separated in time</strong>:</p>
      <ul>
        <li><strong>Phase 1: Understanding Your Humor</strong> - First, we will ask you about your humor preferences and gather data on what jokes you find funny.</li>
        <li><strong>Phase 2: Evaluating Humor</strong> <em>(at a later date)</em> - Once this phase is ready, you will receive an email with a personal survey link where you'll be asked to rank different jokes based on how funny you find them.</li>
      </ul>
      <p>In both phases you will be ranking jokes based on your preference. The ranking is done by <strong>drag-and-drop</strong>.</p>
      <p>It is possible to do this by phone, but it is easier on PC.
        If there are any problems with the website, please contact me at <strong>sepvanswe@gmail.com!</strong></p>

      <h3>Privacy & Data Security</h3>
      <p>Your e-mail address will only be used to contact you for the second phase. All public data will be anonymised!</p>

      <p><strong>Thank you for your time and hope to make you giggle!</strong></p>
      <button className="btn btn-primary" onClick={change_page}> Start survey</button>
    </div>
  );
}
