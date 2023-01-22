

// sidebarReducer.js
const initialState = {
    isVisible: false
  };
  
  const sidebarReducer = (state = initialState, action) => {
    switch (action.type) {
      case "TOGGLE_SIDEBAR":
        return {
          ...state,
          isVisible: !state.isVisible
        };
      default:
        return state;
    }
  };
  
  export default sidebarReducer;
  