import {createStore} from "redux";
import ReactDOM from "react-dom/client"
import React from "react";
import {Provider} from "react-redux";
import App from "./App"
import "./index.css"
import rootReducer from './reduicer/rootReducer';
import {TOGGLE_SIDEBAR} from "./action/types";


if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  document.documentElement.classList.add('dark')
} else {
  document.documentElement.classList.remove('dark')
} 

const store = createStore(rootReducer);
const root = ReactDOM.createRoot(document.getElementById('root'));

window.addEventListener("resize", (ev)=>{
    if(window.innerWidth < 768)
        store.dispatch({type:TOGGLE_SIDEBAR, payload:false})
    else
        store.dispatch({type:TOGGLE_SIDEBAR, payload:true})
})
root.render(
  <React.StrictMode>
      <Provider store={store}>
            <App />
      </Provider>
  </React.StrictMode>
);