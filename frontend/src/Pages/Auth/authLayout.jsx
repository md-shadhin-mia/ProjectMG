import React from 'react';
import AuthNavigation from "./authNavigation.jsx";
import AuthFooter from "./authFooter.jsx";
import {Outlet} from "react-router-dom";

function AuthLayout(props) {
    return (
        <div>
            <AuthNavigation />
                <Outlet />
            <AuthFooter />
        </div>
    );
}

export default AuthLayout;