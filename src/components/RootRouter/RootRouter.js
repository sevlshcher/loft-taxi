import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import PrivateRoute from '../PrivateRoute';
import Header from '../Header'
import LoginForm from '../LoginForm';
// import PaymentForm from '../PaymentForm';
import Map from '../Map';

export default () => (
    <BrowserRouter>
        <Header />
        <Switch>
          {/* <PrivateRoute
            path="/profile"
            component={Profile}
          /> */}
          <PrivateRoute
            path="/map"
            component={Map}
          />
          <Route
            path="/login"
            component={LoginForm}
          />
          <Redirect to="/login"/>
        </Switch>
    </BrowserRouter>
)