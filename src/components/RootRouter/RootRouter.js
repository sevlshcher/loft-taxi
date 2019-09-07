import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import PrivateRoute from '../PrivateRoute';
import Header from '../Header'
import LoginForm from '../LoginForm';
import Profile from '../Profile';
import Map from '../Map';

export default () => {
    const map = props => <Map {...props} />
    return(
        <BrowserRouter>
            <Header />
            <Switch>
                <PrivateRoute
                  path="/profile"
                  component={Profile}
                />
                <PrivateRoute
                  path="/map"
                  component={map}
                />
                <Route
                  path="/login"
                  component={LoginForm}
                />
                <Redirect to="/login"/>
            </Switch>
        </BrowserRouter>
    )
}