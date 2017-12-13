import {combineReducers} from 'redux';

import order from './order';
import builder from './reducer';

const rootReducer = combineReducers({
    burgerBuilder: builder,
    order: order
});

export default rootReducer;