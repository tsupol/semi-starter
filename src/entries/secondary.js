/* eslint-disable import/default */

import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {Router, browserHistory, useRouterHistory} from 'react-router';
import {createHashHistory} from 'history';
import routes from '../routes/secondary';
import configureStore from '../store/configureStore';
require('../favicon.ico'); // Tell webpack to load favicon.ico
import '../styles/styles.scss'; // Yep, that's right. You can import SASS/CSS files too! Webpack will run the associated loader and plug this into the page.
import {syncHistoryWithStore} from 'react-router-redux';
import { login } from '../actions/userActions';

import { IntlProvider } from 'react-redux-multilingual';
import helper from 'react-semi-theme/libs/helper';
import translations from '../translations';

let currentLocale = helper.location.hash.get('locale', 'th');

const store = configureStore({ Intl: { locale: currentLocale } });

// semi: auto login
let username = sessionStorage.getItem('username');
let password = sessionStorage.getItem('password');
if(username && password) {
    store.dispatch(login(username, password));
}

// Create an enhanced history that syncs navigation events with the store
// const history = syncHistoryWithStore(browserHistory, store);
const appHashHistory = useRouterHistory(createHashHistory)({ queryKey: false });
const history = syncHistoryWithStore(appHashHistory, store); // Hash History, fix

render(
    <Provider store={store}>
        <IntlProvider translations={translations}>
            <Router history={history} routes={routes}/>
        </IntlProvider>
    </Provider>, document.getElementById('app')
);
