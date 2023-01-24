

// sidebarReducer.js
import {TOGGLE_SIDEBAR} from "../action/types";

const initialState = {
    isVisible: document.body.offsetWidth >= 768
  };
  
  const sidebarReducer = (state = initialState, action) => {
    switch (action.type) {
      case TOGGLE_SIDEBAR:
        return {
          ...state,
          isVisible: action.payload
        };
      default:
        return state;
    }
  };
  
  export default sidebarReducer;
  