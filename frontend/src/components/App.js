import React, { useState, useEffect } from 'react'
import { BrowserRouter, Link, Route, Switch, Redirect } from 'react-router-dom'
import Login from './Login'
import Dashboard from './Dashboard/'
import AuthPage from './AuthPage/AuthPage'
import AppPage from './AppPage/AppPage'
import CheckAuth from './CheckAuth/CheckAuth'
import axios from 'axios'


function App(){
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={AuthPage} />
                <Route path='/app' component={AppPage} />
            </Switch>
        </BrowserRouter>
    )
}
export default App