import './App.css';
import TopNavigation from './topNavigation';
import React, { useEffect } from 'react';
import Sidebar from './sideNavigation';
import Dashboard from './Pages/Dashboard';

import { CategoryScale, Chart, LinearScale, LineElement, PointElement, Title, Tooltip } from 'chart.js';
import {useDispatch, useSelector} from "react-redux";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./Layout.jsx";
import LandingPage from "./Pages/LandingPage.jsx";
import Login from "./Pages/Auth/Login.jsx";
import Register from "./Pages/Auth/Register.jsx";
import AuthLayout from "./Pages/Auth/authLayout.jsx";
import AuthResetPassword from "./Pages/Auth/authResetPassword.jsx";
import AuthProtection from "./AuthProtection.jsx";
import setTheme from "./action/setTheme.jsx";

Chart.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip
);



function App() {

    useEffect(
        ()=>{
            if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                document.documentElement.classList.add('dark')
            } else {
                document.documentElement.classList.remove('dark')
            }
        }
    );
    const {isVisible} = useSelector((state)=>state.sidebar);
    const dispatchTheme = useDispatch()
    const {theme} = useSelector(state => state.theme);
    if (window.localStorage && window.matchMedia) {
        const currentTheme = localStorage.theme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        if (currentTheme !== theme) {
            dispatchTheme(setTheme(currentTheme))
        }
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route element={<AuthProtection />}>
                    <Route element={<Layout />}>
                        <Route path="/dashboard" element={<Dashboard />}/>
                    </Route>

                </Route>
                <Route element={<AuthLayout />}>
                    <Route path="/login" element={<Login />}/>
                    <Route path="/register" element={<Register />}/>
                    <Route path="/resetpassword" element={<AuthResetPassword />}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
