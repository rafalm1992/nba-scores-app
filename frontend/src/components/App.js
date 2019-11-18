import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AuthPage from "./AuthPage/AuthPage";
import AppPage from "./AppPage/AppPage";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={AuthPage} />
        <Route path="/app" component={AppPage} />
      </Switch>
    </BrowserRouter>
  );
}
export default App;
