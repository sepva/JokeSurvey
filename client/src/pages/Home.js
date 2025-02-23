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
      <p>
        blabla uitleg over de survey
      </p>
      <button className="btn btn-primary" onClick={change_page}> Start survey</button>
    </div>
  );
}
