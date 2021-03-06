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
import InitialBalance from "./modules/InitialBalance/InitialBalance";
import Operations from "./modules/Operations";
import Analytics from "./modules/Analytics/Analytics";

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

                <Route path="/initialize">
                    <InitialBalance />
                </Route>

                <Route path="/operations">
                    <Operations />
                </Route>
                <Route path="/analytics">
                    <Analytics />
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
