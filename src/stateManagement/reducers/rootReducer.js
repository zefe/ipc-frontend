import { combineReducers } from 'redux';
import { ipcListReducer } from './ipcListReducer';
import { authReducer } from './authReducer';




export const rootReducer = combineReducers({
    IpcList: ipcListReducer,
    auth: authReducer,
})