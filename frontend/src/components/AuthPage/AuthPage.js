import React, { useState } from 'react'

import './authPage.scss'
import LoginForm from './Forms/LoginForm'
import RegisterForm from './Forms/RegisterForm'
import ForgottenPasswordForm from './Forms/ForgottenPasswordForm'



const AuthPage = (props) => {
    const [activeComponent, setActiveComponent] = useState('login')

    const changeComponent = (component) => {
        setActiveComponent(component)
    }
    const routeToApp = () => {
        props.history.push('/app')
    }

    return (
        <div className="authPage">
            <div className="authPage__Container">
                <div className="authPage__AppLogo">
                    <h1>NBA</h1>
                    <h3>scores / standings / top10 plays</h3>
                </div>
                {activeComponent === 'login' && <LoginForm changeComponent={changeComponent} pushToApp={routeToApp}/>}
                {activeComponent === 'register' && <RegisterForm changeComponent={changeComponent}/>}
                {activeComponent === 'forgotten' &&  <ForgottenPasswordForm changeComponent={changeComponent}/>}
            </div>
            <div className="authPage__photoCredit">Photo by <a href="https://unsplash.com/@neonbrand?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">NeONBRAND</a> on <a href="https://unsplash.com/s/photos/nba-basketball?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a></div>
        </div>
    )
}





export default AuthPage