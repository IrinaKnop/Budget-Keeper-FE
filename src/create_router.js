import React from 'react';
import Login from './modules/Auth/Login';
import Stats from './modules/Stats';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
  } from "react-router-dom";
import Registration from "./modules/Auth/Registration";

// READ https://reactrouter.com/web/guides/quick-start

function createRouter() {
    return (
        <Router>
            <Switch>
                <Route path="/login">
                    <Login />
                </Route>

                <Route path="/stats">
                    <Stats />
                </Route>

                <Route path="/registration">
                    <Registration />
                </Route>

                <Route
                    path="/"
                    render={() => <Redirect to="/login"/>}
                />
            </Switch>
        </Router>
    );
}

export default createRouter;
