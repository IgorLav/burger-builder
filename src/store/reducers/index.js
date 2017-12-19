import {combineReducers} from 'redux';

import order from './order';
import builder from './burgerBuilder';
import auth from './auth';

const rootReducer = combineReducers({
    burgerBuilder: builder,
    order: order,
    auth: auth
});

export default rootReducer;