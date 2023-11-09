import React from 'react';
import AuthNavigation from "./authNavigation.jsx";
import AuthFooter from "./authFooter.jsx";
import {Navigate, Outlet, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

function AuthLayout(props) {
    const auth = useSelector(state => state.auth.token != null);
    return auth ? <Navigate to="/dashboard" replace /> : (
        <div>
            <AuthNavigation />
                <Outlet />
            <AuthFooter />
        </div>
    );
}

export default AuthLayout;