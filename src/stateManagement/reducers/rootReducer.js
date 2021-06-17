import { combineReducers } from "redux";
import { ipcListReducer } from "./ipcListReducer";




export const rootReducer = combineReducers({
    IpcList: ipcListReducer
})