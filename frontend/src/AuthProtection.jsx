import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Navigate, Outlet} from "react-router-dom";
import fetcher from "./fetcher";
import setAuthToken from "./action/setAuthToken";
import Loading from "./UtilsComponent/Loading";

function AuthProtection() {
    const hasAuthToken = useSelector((state)=>state.auth.token != null);
    const dispatch = useDispatch();
    const [verifying, setVerifying] = useState(true);
    const [valid, setValid] = useState(false);

    useEffect(() => {
        if (!hasAuthToken) {
            setVerifying(false);
            return;
        }
        fetcher.getUser()
            .then(() => { setValid(true); setVerifying(false); })
            .catch(() => {
                dispatch(setAuthToken(null));
                localStorage.removeItem("token");
                sessionStorage.removeItem("token");
                setValid(false);
                setVerifying(false);
            });
    }, [hasAuthToken, dispatch]);

    if (verifying) return <div className="flex justify-center py-20"><Loading className="text-indigo-500" /></div>;
    if (!hasAuthToken || !valid) return <Navigate to="/login" replace state={"First you have to Login."}/>;
    return <Outlet/>;
}

export default AuthProtection;
