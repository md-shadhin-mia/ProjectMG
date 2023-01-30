import './App.css';
import TopNavigation from './topNavigation';
import { useEffect } from 'react';
import Sidebar from './sideNavigation';
import Dashboard from './Pages/Dashboard';

import { CategoryScale, Chart, LinearScale, LineElement, PointElement, Title, Tooltip } from 'chart.js';
import {useSelector} from "react-redux";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./Layout.jsx";
import LandingPage from "./Pages/LandingPage.jsx";
import Login from "./Pages/Auth/Login.jsx";
import Register from "./Pages/Auth/Register.jsx";
import AuthLayout from "./Pages/Auth/authLayout.jsx";
import AuthResetPassword from "./Pages/Auth/authResetPassword.jsx";

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
    const {isVisible} = useSelector((state)=>state.sidebar)
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />} />
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
