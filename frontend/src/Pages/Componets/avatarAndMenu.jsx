import React, {useState, useEffect} from 'react';
import IconWithDropdown from "../../UtilsComponent/IconWithDropdown.jsx";
import {FaSignOutAlt, FaUser} from "react-icons/all.js";
import {useDispatch} from "react-redux";
import setAuthToken from "../../action/setAuthToken.jsx";
import {useNavigate, Link} from "react-router-dom";
import DarkModeToggle from "../../UtilsComponent/DarkModeToggle.jsx";
import fetcher from "../../fetcher";

const API_BASE = import.meta.env.VITE_API_URL || "/api";

const AvatarAndMenu = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [imageError, setImageError] = useState(false);

    useEffect(() => {
        fetcher.getProfile()
            .then(res => setProfile(res.data))
            .catch(() => {});
    }, []);

    const logOut = () => {
        localStorage.clear("token");
        sessionStorage.clear("token");
        dispatch(setAuthToken(null));
        navigate("/dashboard", {replace: true, state: "You just Sign out!"});
    }

    const initials = profile
        ? (profile.email || "U").charAt(0).toUpperCase()
        : "U";

    const displayName = profile?.details || profile?.email || "User";
    const displayRole = profile?.profession || "No profession set";

    return (
        <IconWithDropdown icon={
            <button className="flex items-center gap-2 text-sm rounded-full focus:outline-none" id="user-menu-button">
                <div className="relative">
                    {!imageError && profile?.id ? (
                        <img
                            src={`${API_BASE}/profiles/${profile.id}/image`}
                            alt="avatar"
                            className="w-8 h-8 rounded-full object-cover ring-2 ring-gray-50"
                            onError={() => setImageError(true)}
                        />
                    ) : (
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-xs font-semibold text-white shadow-sm ring-2 ring-gray-50">
                            {initials}
                        </div>
                    )}
                    <span className="absolute -bottom-0.5 right-0 w-2.5 h-2.5 bg-green-400 border-2 border-white rounded-full" />
                </div>
            </button>
        }>
            <li>
                <div className="px-4 py-3 border-b border-gray-50">
                    <div className="flex items-center gap-3">
                        {!imageError && profile?.id ? (
                            <img
                                src={`${API_BASE}/profiles/${profile.id}/image`}
                                alt="avatar"
                                className="w-9 h-9 rounded-full object-cover ring-2 ring-gray-50 shrink-0"
                                onError={() => setImageError(true)}
                            />
                        ) : (
                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-xs font-semibold text-white shrink-0">
                                {initials}
                            </div>
                        )}
                        <div className="min-w-0">
                            <div className="text-sm font-medium text-gray-800 truncate">{displayName}</div>
                            <div className="text-xs text-gray-400 truncate">{displayRole}</div>
                        </div>
                    </div>
                </div>
            </li>
            <li>
                <Link to="/dashboard/profile" className="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-500 hover:text-indigo-500 hover:bg-indigo-50 any-transition">
                    <FaUser className="w-4 h-4" />
                    Profile
                </Link>
            </li>
            <li>
                <a className="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-500 hover:text-indigo-500 hover:bg-indigo-50 any-transition" href="#">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-4 h-4" viewBox="0 0 16 16">
                        <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>
                        <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"/>
                    </svg>
                    Settings
                </a>
            </li>
            <li>
                <a className="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-500 hover:text-indigo-500 hover:bg-indigo-50 any-transition" href="#">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-4 h-4" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                        <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"/>
                    </svg>
                    Help
                </a>
            </li>
            <li>
                <a className="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-500 hover:text-indigo-500 hover:bg-indigo-50 any-transition" href="#">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-4 h-4" viewBox="0 0 16 16">
                        <path d="M4.545 6.714 4.11 8H3l1.862-5h1.284L8 8H6.833l-.435-1.286H4.545zm1.634-.736L5.5 3.956h-.049l-.679 2.022H6.18z"/>
                        <path d="M0 2a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v3h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-3H2a2 2 0 0 1-2-2V2zm2-1a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H2zm7.138 9.995c.193.301.402.583.63.846-.748.575-1.673 1.001-2.768 1.292.178.217.451.635.555.867 1.125-.359 2.08-.844 2.886-1.494.777.665 1.739 1.165 2.93 1.472.133-.254.414-.673.629-.89-1.125-.253-2.057-.694-2.82-1.284.681-.747 1.222-1.651 1.621-2.757H14V8h-3v1.047h.765c-.318.844-.74 1.546-1.272 2.13a6.066 6.066 0 0 1-.415-.492 1.988 1.988 0 0 1-.94.31z"/>
                    </svg>
                    Language
                </a>
            </li>
            <li className="border-t border-gray-50">
                <button onClick={logOut} className="flex items-center gap-2.5 w-full px-4 py-2 text-sm text-gray-500 hover:text-red-500 hover:bg-red-50 any-transition">
                    <FaSignOutAlt className="w-4 h-4" />
                    Log Out
                </button>
            </li>
            <li className="flex items-center justify-between px-4 py-2 border-t border-gray-50">
                <span className="text-xs text-gray-400">Dark mode</span>
                <DarkModeToggle />
            </li>
        </IconWithDropdown>
    )
}

export default AvatarAndMenu;
