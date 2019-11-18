import React, { useState, useEffect } from "react";
import InputElement from "../../Inputs/InputElement";
import ButtonElement from "../../Buttons/ButtonElement";
import axios from "axios";

const ForgottenAccount = props => {
  const [email, setEmail] = useState("");
  const [emailWasSent, setEmailWasSent] = useState("");
  const [errorMessage, setErrorMessage] = useState({
    email: false,
    password: false,
    name: false
  });
  const [isSubmiting, setIsSubmiting] = useState(false);

  const validateEmail = email => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log("handle sumbit forgotten");
    setIsSubmiting(true);
    if (email === "" || !validateEmail(email)) {
      setErrorMessage({
        email: !e.target.elements[0].value
          ? "Email can't be empty"
          : !validateEmail(email)
          ? "Email is not valid"
          : null
      });
      setIsSubmiting(false);
      return;
    }

    axios({
      method: "post",
      url: "/api/user/forgottenPassword",
      data: {
        email: email
      },
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(data => {
        console.log(data);
        setEmailWasSent(data.data.status);
        setIsSubmiting(false);
      })
      .catch(err => {
        [500, 501, 502, 503, 504, 505].includes(err.response.status) &&
          setErrorMessage({ all: "Server error, try later..." });
        setIsSubmiting(false);
        setErrorMessage({ all: "Email not found" });
      });
  };

  return (
    <div className="forgottenAccountForm">
      {emailWasSent ? (
        <h3
          style={{ marginTop: 50, width: 360 }}
        >{`Password sent to ${email}`}</h3>
      ) : (
        <form id="forgottenAccount" onSubmit={handleSubmit}>
          <InputElement
            errorMessage={errorMessage.email}
            type="email"
            error={false}
            icon={"email"}
            placeholder="Email"
            value={email}
            value={email}
            onChange={e => {
              setEmail(e.target.value);
              setErrorMessage(Object.assign({}, errorMessage, { email: null }));
            }}
          />
          {errorMessage.all && (
            <div className="loginFormError">
              <span>{errorMessage.all}</span>
            </div>
          )}
          <ButtonElement disabled={isSubmiting} value={"Send password"} />
        </form>
      )}
      <p className="forgottenAccountForm_BottomText">
        <span onClick={() => props.changeComponent("login")}>
          Back to Login
        </span>
      </p>
    </div>
  );
};

export default ForgottenAccount;
