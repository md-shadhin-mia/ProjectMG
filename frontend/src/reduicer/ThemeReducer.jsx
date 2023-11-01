import { SET_TOKEN } from "../action/types";

const initialState = {
    theme: "dark"
};

const themeReducer = (state = initialState, action)=>{
    switch (action.type) {
        case SET_TOKEN:
            return {
                theme: action.payload
            };
        default:
            return state;
    }
}

export default themeReducer;