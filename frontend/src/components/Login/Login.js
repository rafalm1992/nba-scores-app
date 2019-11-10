import React, { useState, useEffect } from "react";
import axios from "axios";
import "./login.scss";
import Logo from "../Logo";
import InputElement from "../Inputs/InputElement";

const Login = props => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (username === "" || password === "") {
      setErrorMessage("Please fill in empty fields");
      return null;
    }
    axios({
      method: "post",
      url: "http://playground.tesonet.lt/v1/tokens",
      data: {
        username: username,
        password: password
      },
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        console.log(res)
        localStorage.setItem("b", res.data.token);
      })
      .then(() => {
        setUsername("");
        setPassword("");
        props.history.push("/dashboard");
      })
      .catch(err => {
        err.response.status === 401 && setErrorMessage("Username or password is incorrect");
        [500, 501, 502, 503, 504, 505].includes(err.response.status) && setErrorMessage("Server error, try later...");
      });
  };

  useEffect(() => {
    if (localStorage.getItem("b") && localStorage.getItem("b").length === 32) {
      props.history.push("/dashboard");
    }
  }, []);

  const handleUsername = e => {
    setUsername(e.target.value);
    setErrorMessage("");
  };
  const handlePassword = e => {
    setPassword(e.target.value);
    setErrorMessage("");
  };

  return (
    <div className="App">
      <div className="loginPage">
        <div className="loginPage__logo">
          <Logo logoType={"login"} />
        </div>
        <form onSubmit={handleSubmit}>
          <InputElement
            error={false}
            type={"text"}
            placeholder={"Username"}
            value={username}
            onChange={handleUsername}
            icon={"username"}
          />
          <InputElement
            error={false}
            type={"password"}
            placeholder={"Password"}
            value={password}
            onChange={handlePassword}
            icon={"password"}
          />
          <button className="button">Log in</button>
        </form>
        {errorMessage ? (
          <div className="loginPage__validationError">{errorMessage}</div>
        ) : (
          <div className="loginPage__validationError hidden">Default</div>
        )}
      </div>
    </div>
  );
};

export default Login;
