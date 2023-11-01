import { combineReducers } from "redux";
import authReducer from "./authReducer";
import sidebarReducer from "./sidebarReduicer";
import themeReducer from "./ThemeReducer.jsx";
export default combineReducers({
    sidebar: sidebarReducer,
    auth: authReducer,
    theme: themeReducer
})