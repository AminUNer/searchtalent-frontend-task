import { combineReducers } from "@reduxjs/toolkit";
import doctorsReducer from './doctorsReducer';

const rootReducer = combineReducers({
    doctorsReducer,
});

export default rootReducer;
