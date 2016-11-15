import React from 'react';
import {Route, IndexRoute} from 'react-router';
import {routerActions} from 'react-router-redux';
import {UserAuthWrapper} from 'redux-auth-wrapper';

import App from '../components/App';

import SecondaryHomePage from '../components/SecondaryHomePage';
import HairPage from '../components/pages/HairPage';
import ForeheadPage from '../components/pages/ForeheadPage';
import NosePage from '../components/pages/NosePage';
import NoseReconPage from '../components/pages/NoseReconPage';
import EyelidsPage from '../components/pages/EyelidsPage';
import AroundEyesPage from '../components/pages/AroundEyesPage';
import EyebrowPage from '../components/pages/EyebrowPage';
import LipsPage from '../components/pages/LipsPage';
import BreastPage from '../components/pages/BreastPage';
import ChinPage from '../components/pages/ChinPage';
import CheekBulgePage from '../components/pages/CheekBulgePage';
import LiposuctionPage from '../components/pages/LiposuctionPage';
import ImplantsPage from '../components/pages/ImplantsPage';
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
    <Route path="/" component={App}>
        <IndexRoute component={semiThemeSettings.hasAuthentication ? UserIsAuthenticated(SecondaryHomePage) : SecondaryHomePage}/>
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
        <Route path="*" component={NotFoundPage}/>
    </Route>
);
