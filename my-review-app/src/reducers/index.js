import {combineReducers} from 'redux';

import movie from './movie';
import actor from './actor';
import authReducer from './auth';
import user from './user';


export default combineReducers({movie,actor,authReducer,user});
