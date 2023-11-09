import './App.css';
import TopNavigation from './topNavigation';
import React, { useEffect } from 'react';
import Sidebar from './sideNavigation';
import Dashboard from './Pages/Dashboard';

import { CategoryScale, Chart, LinearScale, LineElement, PointElement, Title, Tooltip } from 'chart.js';
import {useDispatch, useSelector} from "react-redux";
import {BrowserRouter, Outlet, Route, Routes} from "react-router-dom";
import Layout from "./Layout.jsx";
import LandingPage from "./Pages/LandingPage.jsx";
import Login from "./Pages/Auth/Login.jsx";
import Register from "./Pages/Auth/Register.jsx";
import AuthLayout from "./Pages/Auth/authLayout.jsx";
import AuthResetPassword from "./Pages/Auth/authResetPassword.jsx";
import AuthProtection from "./AuthProtection.jsx";
import setTheme from "./action/setTheme.jsx";
import CreateProject from "./Pages/createProject.jsx";
import AuthProfileSetup from "./Pages/Auth/authProfileSetup.jsx";

Chart.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip
);



function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<LandingPage />} />
                <Route element={<AuthProtection />}>
                    <Route element={<Layout />}>
                        <Route path="dashboard" >
                            <Route index element={<Dashboard />} />
                            <Route path="create" element={<CreateProject />} />
                        </Route>
                    </Route>
                </Route>
                <Route element={<AuthLayout />}>
                    <Route path="login" element={<Login />}/>
                    <Route path="register" element={<Register />}/>
                    <Route path="resetpassword" element={<AuthResetPassword />}/>
                    <Route path="profilesetup" element={<AuthProfileSetup />}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
