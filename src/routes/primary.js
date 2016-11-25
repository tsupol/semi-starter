import React from 'react';
import {Route, IndexRoute} from 'react-router';
import {routerActions} from 'react-router-redux';
import {UserAuthWrapper} from 'redux-auth-wrapper';

import PrimaryApp from '../components/PrimaryApp';

import HomePage from '../components/HomePage';
import SubmittedPage from '../components/SubmittedPage';
import NotFoundPage from '../components/NotFoundPage';
import semiThemeSettings from '../settings/semiThemeSettings';

let UserIsAuthenticated = null;
// semi: authentication
if (semiThemeSettings.hasAuthentication) {
    UserIsAuthenticated = UserAuthWrapper({
        authSelector: state => state.user, // how to get the user state
        authenticatingSelector: state => state.user.authenticating, // for async session loading.
        LoadingComponent: LoginPage, // how to get the user state
        failureRedirectPath: '/#/login',
        predicate: auth => auth.authenticating !== true && !auth.error,
        redirectAction: routerActions.replace, // the redux action to dispatch for redirect
        wrapperDisplayName: 'UserIsAuthenticated' // a nice name for this auth check
    });
}

export default (
    <Route path="/" component={PrimaryApp}>
        <IndexRoute component={semiThemeSettings.hasAuthentication ? UserIsAuthenticated(HomePage) : HomePage}/>
        <Route path="/submitted" component={SubmittedPage}/>
        <Route path="*" component={NotFoundPage}/>
    </Route>
);
