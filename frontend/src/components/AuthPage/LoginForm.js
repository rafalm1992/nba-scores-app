import React from 'react'
import InputElement from '../Inputs/InputElement'
import ButtonElement from '../Buttons/ButtonElement'

const LoginForm = (props) => {
    return (
        <div className="loginForm">
            <form id="login" onSubmit={props.onSubmit}>
                <InputElement required pattern=".{5,}" type="text" icon={'username'} placeholder="Username" value={props.value} onChange={props.onChange}/>
                <InputElement required pattern=".{5,}"  type="password" icon={'password'} placeholder="Password" value={props.value} onChange={props.onChange}/>
                <ButtonElement value={'Log In'}/>
            </form>
            <p className="loginForm__BottomText"><span onClick={props.onClick}>Register</span><span onClick={props.onClick}>Forgotten account</span></p>
        </div>
    )
}

export default LoginForm