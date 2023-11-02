import {SET_THEME} from "./types.jsx";

const setTheme = (theme) => ({
    type: SET_THEME,
    payload: theme,
});

 export default setTheme;