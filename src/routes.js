import React from 'react';
import {Route, IndexRoute} from 'react-router';
import {routerActions} from 'react-router-redux';
import {UserAuthWrapper} from 'redux-auth-wrapper';

import App from './components/App';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import NotFoundPage from './components/NotFoundPage';
import DataTableDemo from './components/examples/DataTableDemo';
import SemiFormDemo from './components/examples/SemiFormDemo';
import SemiGridDemo from './components/examples/SemiGridDemo';
import semiThemeSettings from './settings/semiThemeSettings';

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
    <Route path="/" component={App}>
        <IndexRoute
            component={semiThemeSettings.hasAuthentication ? UserIsAuthenticated(HomePage) : HomePage}/>

        <Route path="examples/grid" component={SemiGridDemo}/>
        <Route path="examples/form" component={SemiFormDemo}/>
        <Route path="examples/datatable" component={DataTableDemo}/>

        <Route path="login" component={LoginPage}/>
        <Route path="*" component={NotFoundPage}/>
    </Route>
);
