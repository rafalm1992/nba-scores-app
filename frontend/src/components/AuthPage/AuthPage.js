import React, {useState, useEffect} from 'react'
// import {Router, Route, Switch, Link} from 'react-router-dom'

import InputElement from '../Inputs/InputElement'
import ButtonElement from '../Buttons/ButtonElement'
import axios from 'axios'
import './authPage.scss'

const AuthPage = (props) => {
    const [username, setUsername] = useState("rdddm@ggmail.com");
    const [password, setPassword] = useState("hell5445oooo");
    const [email, setEmail] = useState("");

    const [i, setI] = useState(0)
    const [usernameError, setUsernameError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)   
    const [emailError, setEmailError] = useState(false)   

    const [repeatedPassword, setRepeatedPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("");   

    const handleSubmit = (e) => {
        e.preventDefault()
        if (username === "" || password === "") {
            setErrorMessage("Please fill in empty fields");
            return null;
          }
          axios({
            method: "post",
            url: "/api/user/login",
            data: {
              email: username,
              password: password
            },
            headers: {
              "Content-Type": "application/json"
            }
          })
            .then(res => {
                console.log(res)
                localStorage.setItem("b", res.data);
            })
            .then(() => {
              setUsername("");
              setPassword("");
              props.history.push("/app");
            })
            .catch(err => {
              err.response.status === 401 && setErrorMessage("Username or password is incorrect");
              [500, 501, 502, 503, 504, 505].includes(err.response.status) && setErrorMessage("Server error, try later...");
            });
    }

    const pushToRegister = (e) => {
        setI(1)
    }

    const pushToForgottenAccount = () => {
        setI(2)
    }
    const pushToLogin = () => {
        setI(0)
    }

    const LoginForm = (
    <div className="loginForm">
        <form id="login" onSubmit={handleSubmit}>
            <InputElement  required pattern=".{5,}" type="text" icon={'username'} placeholder="Username" value={username} onChange={(e)=>{setUsername(e.target.value)}}/>
            <InputElement required pattern=".{5,}"  type="password" icon={'password'} placeholder="Password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
            <ButtonElement value={'Log In'}/>
        </form>
        <p className="loginForm__BottomText"><span onClick={pushToRegister}>Register</span><span onClick={pushToForgottenAccount}>Forgotten account</span></p>
    </div>
)

const RegistrationForm = (
    <div className="registrationForm">
        <form id="register" onSubmit={handleSubmit}>
            <InputElement type="text" error={usernameError} icon={'username'} placeholder="Username" value={username} onChange={(e)=>{setUsername(e.target.value)}}/>
            <InputElement type="email" required error={usernameError} icon={'email'} placeholder="Email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
            <InputElement type="password" error={passwordError} icon={'password'} placeholder="Password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
            <ButtonElement value={'Sign up'}/>
        </form>
        <p className="registrationForm_BottomText"><span onClick={pushToLogin}>Back to Login</span></p>
    </div>
)

const ForgottenAccount = (
    <div className="forgottenAccountForm">
        <form id="forgottenAccount" onSubmit={handleSubmit}>
            <InputElement type="email" required error={false} icon={'email'} placeholder="Email" value={username} onChange={(e)=>{setUsername(e.target.value)}}/>
            <ButtonElement value={'Search my account'}/>
        </form>
        <p className="forgottenAccountForm_BottomText"><span onClick={pushToLogin}>Back to Login</span></p>
    </div>
)

    return (
        <div className="authPage">
            <div className="authPage__Container">
                <div className="authPage__AppLogo">
                    <h1>NBA</h1>
                    <h3>scores / standings / top10 plays</h3>
                </div>
                {[LoginForm, RegistrationForm, ForgottenAccount][i]}
            </div>
        </div>
    )
}

export default AuthPage