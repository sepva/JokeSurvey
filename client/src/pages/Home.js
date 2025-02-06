import { useRef } from "react";
import "bootstrap/dist/css/bootstrap.css";
import validator from "validator"

export function HomePage() {
  const email = useRef();

  const save_email = () => {
    localStorage.removeItem("email")

    const current_email = email.current.value
    if (validator.isEmail(current_email)) {
      localStorage.setItem("email", current_email);
    }
    else {
      const para = document.createElement("p");
      const node = document.createTextNode("*This is not a valid email address");
      para.appendChild(node);

      const element = document.getElementById("email_div");
      element.appendChild(para);
      return false
    }
  }

  return (
    <div className="container">
      <h1>JokeTailor survey</h1>
      <p>
        blabla uitleg over de survey
      </p>
      <div className="form-group" id="email_div">
        <label>Email:</label>
        <input
          type="text"
          id="usr"
          style={{ width: "50%" }}
          ref={email} />
      </div>
      <a href="/survey" className="btn btn-primary" onClick={save_email}>Start survey</a>
    </div>
  );
}
