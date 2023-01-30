import { combineReducers } from "redux";
import authReducer from "./authReducer";
import sidebarReducer from "./sidebarReduicer";
export default combineReducers({
    sidebar: sidebarReducer,
    auth: authReducer
})