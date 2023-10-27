import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import {createStore} from "redux";

import rootReducer from './reduicer/rootReducer';
import {TOGGLE_SIDEBAR} from "./action/types";


if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  document.documentElement.classList.add('dark')
} else {
  document.documentElement.classList.remove('dark')
} 



const store = createStore(rootReducer);
const root = ReactDOM.createRoot(document.getElementById('root'));

document.body.addEventListener("resize", (ev)=>{
    if(document.body.offsetWidth < 768)
        store.dispatch({type:TOGGLE_SIDEBAR, payload:false})
    else
        store.dispatch({type: TOGGLE_SIDEBAR, payload: true})
});
root.render(
  <React.StrictMode>
      <Provider store={store}>
            <App />
      </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
