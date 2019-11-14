import React, { useState, useEffect } from 'react'
import { BrowserRouter, Link, Route, Switch, Redirect } from 'react-router-dom'
import AuthPage from './AuthPage/AuthPage'
import AppPage from './AppPage/AppPage'



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