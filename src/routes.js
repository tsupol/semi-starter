import React from 'react';
import {Route, IndexRoute} from 'react-router';
import {routerActions} from 'react-router-redux';
import {UserAuthWrapper} from 'redux-auth-wrapper';

import App from './components/App';

import HomePage from './components/HomePage';
import HairPage from './components/pages/HairPage';
import ForeheadPage from './components/pages/ForeheadPage';
import NosePage from './components/pages/NosePage';
import NoseReconPage from './components/pages/NoseReconPage';
import EyelidsPage from './components/pages/EyelidsPage';
import AroundEyesPage from './components/pages/AroundEyesPage';
import EyebrowPage from './components/pages/EyebrowPage';
import LipsPage from './components/pages/LipsPage';
import BreastPage from './components/pages/BreastPage';
import ChinPage from './components/pages/ChinPage';
import CheekBulgePage from './components/pages/CheekBulgePage';
import LiposuctionPage from './components/pages/LiposuctionPage';
import ImplantsPage from './components/pages/ImplantsPage';

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

        <Route path="hair" component={HairPage}/>
        <Route path="forehead" component={ForeheadPage}/>
        <Route path="nose" component={NosePage}/>
        <Route path="nose-recon" component={NoseReconPage}/>
        <Route path="eyelids" component={EyelidsPage}/>
        <Route path="around-eyes" component={AroundEyesPage}/>
        <Route path="eyebrow" component={EyebrowPage}/>
        <Route path="lips" component={LipsPage}/>
        <Route path="breast" component={BreastPage}/>
        <Route path="chin" component={ChinPage}/>
        <Route path="cheek-bulge" component={CheekBulgePage}/>
        <Route path="liposuction" component={LiposuctionPage}/>
        <Route path="implants" component={ImplantsPage}/>

        <Route path="examples/grid" component={SemiGridDemo}/>
        <Route path="examples/form" component={SemiFormDemo}/>
        <Route path="examples/datatable" component={DataTableDemo}/>

        <Route path="login" component={LoginPage}/>
        <Route path="*" component={NotFoundPage}/>
    </Route>
);
