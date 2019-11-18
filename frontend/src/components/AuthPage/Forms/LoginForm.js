import React, { useState, useEffect } from "react";
import axios from "axios";
import InputElement from "../../Inputs/InputElement";
import ButtonElement from "../../Buttons/ButtonElement";

const LoginForm = props => {
  const [email, setEmail] = useState("rafalek@rafalek.com");
  const [password, setPassword] = useState("qazwsx777");
  const [errorMessage, setErrorMessage] = useState({
    email: false,
    password: false,
    all: false
  });
  const [isSubmiting, setIsSubmiting] = useState(false);

  const validateEmail = email => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };
  const handleSubmit = e => {
    e.preventDefault();
    setIsSubmiting(true);
    if (email === "" || password === "" || !validateEmail(email)) {
      setErrorMessage({
        email: !e.target.elements[0].value
          ? "Email can't be empty"
          : !validateEmail(email)
          ? "Email is not valid"
          : null,
        password: !e.target.elements[1].value && "Password can't be empty"
      });
      setIsSubmiting(false);
      return;
    }

    setErrorMessage({ all: null });

    axios({
      method: "post",
      url: "/api/user/login",
      data: {
        email: email,
        password: password
      },
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        localStorage.setItem("b", res.data);
      })
      .then(data => {
        setEmail("");
        setPassword("");
        setIsSubmiting(false);
        props.pushToApp();
      })
      .catch(err => {
        [500, 501, 502, 503, 504, 505].includes(err.response.status) &&
          setErrorMessage({ all: "Server error, try later..." });
        setIsSubmiting(false);
        setErrorMessage({ all: "Email or password is incorrect" });
      });
  };

  return (
    <div className="loginForm">
      <form id="login" onSubmit={handleSubmit}>
        <InputElement
          errorMessage={errorMessage.email}
          type="text"
          icon={"email"}
          placeholder="Email"
          value={email}
          onChange={e => {
            setEmail(e.target.value);
            setErrorMessage(Object.assign({}, errorMessage, { email: null }));
          }}
        />
        <InputElement
          errorMessage={errorMessage.password}
          type="password"
          icon={"password"}
          placeholder="Password"
          value={password}
          onChange={e => {
            setPassword(e.target.value);
            setErrorMessage(
              Object.assign({}, errorMessage, { password: null })
            );
          }}
        />
        {errorMessage.all && (
          <div className="loginFormError">
            <span>{errorMessage.all}</span>
          </div>
        )}
        <ButtonElement disabled={isSubmiting} value={"Log In"} />
      </form>
      <p className="loginForm__BottomText">
        <span
          onClick={() => {
            props.changeComponent("register");
          }}
        >
          Register
        </span>
        <span
          onClick={() => {
            props.changeComponent("forgotten");
          }}
        >
          Forgotten password
        </span>
      </p>
    </div>
  );
};
export default LoginForm;
