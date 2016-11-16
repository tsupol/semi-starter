import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import userReducer from './userReducer';
import appReducer from './appReducer';
import scheduleReducer from './scheduleReducer';
import notificationReducer from './notificationReducer';
import { IntlReducer as Intl } from 'react-redux-multilingual';

const rootReducer = combineReducers({
    app: appReducer,
    user: userReducer,
    schedule: scheduleReducer,
    notification: notificationReducer,
    routing: routerReducer,
    Intl
});

export default rootReducer;
