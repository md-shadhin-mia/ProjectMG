import {SET_THEME} from "../action/types";

const initialState = {
    theme: localStorage.theme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
};

const themeReducer = (state = initialState, action)=>{
    switch (action.type) {
        case SET_THEME:
            return {
                theme: action.payload
            };
        default:
            return state;
    }
}

export default themeReducer;