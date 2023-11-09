import { SET_TOKEN } from "../action/types";

const initialState = {
  token: sessionStorage.getItem("token")||localStorage.getItem("token")
};

const authReducer = (state = initialState, action)=>{
    switch (action.type) {
      case SET_TOKEN:
        return {
          ...state,
          token: action.payload
        };
      default:
        return state;
    }
  }

export default authReducer;