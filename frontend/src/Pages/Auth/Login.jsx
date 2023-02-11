import {FaFacebook, FaGithub, FaSignInAlt} from "react-icons/all.js";
import {useState} from "react";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import Loading from "../../UtilsComponent/Loading.jsx";
import {useDispatch} from "react-redux";
import setAuthToken from "../../action/setAuthToken.jsx";

function Login() {
    const [fields, setFields] = useState({username:"", password:""});
    const [isLoading, setLoading] = useState(false);
    const [remember, setRemember] = useState(false);
    const location = useLocation();
    const message = location.state;
    const authDispatch = useDispatch();
    const navigate = useNavigate();
    const inputChangeHandling = (ev)=>{
        setFields({...fields, [ev.target.name]:ev.target.value});
    }

    const submitHandle=(ev)=>{
        ev.preventDefault();
        axios.post("/api/auth/login", fields, {
            headers:{"Content-Type":"application/x-www-form-urlencoded"}
        })
        .then((value)=>{
            const token = value.data.token;
            authDispatch(setAuthToken(token));
            if(remember){
                window.localStorage.setItem("token", token);
            }
            else {
                window.sessionStorage.setItem("token", token);
            }
            navigate("/dashboard")
        })
        .catch((reason)=>{
            console.log(reason);
        }).finally(()=>{
            setLoading(false);
        })
        setLoading(true);
    }
    return (
        <div id="login-area" className="relative py-12 bg-gray-100 dark:bg-gray-900 dark:bg-opacity-40">
            <div className="container xl:max-w-6xl mx-auto px-4">
                <div className="flex flex-wrap flex-row -mx-4 justify-center">
                    {/* login form */}
                    <div className="max-w-full w-full md:w-2/3 lg:w-1/2 px-6 sm:px-12">
                        {message?<div className="relative bg-red-100 text-red-900 py-3 px-6 rounded mb-4">
                            {message}
                        </div>:""}
                        <div className="relative">
                            <div className="p-6 sm:py-8 sm:px-12 rounded-lg bg-white dark:bg-gray-800 shadow-xl">
                                <form id="login-form" onSubmit={submitHandle}>
                                    <h1 className="text-2xl leading-normal mb-6 font-bold text-gray-800 dark:text-gray-300 text-center">Login</h1>
                                    <hr className="block w-12 h-0.5 mx-auto my-5 bg-gray-700 border-gray-700" />
                                    <div className="mb-6">
                                        <input name="username" value={fields.username}  onChange={inputChangeHandling} className="w-full leading-5 relative py-2 px-4 rounded text-gray-800 bg-white border border-gray-300 overflow-x-auto focus:outline-none focus:border-gray-400 focus:ring-0 dark:text-gray-300 dark:bg-gray-700 dark:border-gray-700 dark:focus:border-gray-600" placeholder="Email address"  aria-label="email" type="email" required />
                                    </div>
                                    <div className="mb-6">
                                        <input name="password" value={fields.password} onChange={inputChangeHandling} className="w-full leading-5 relative py-2 px-4 rounded text-gray-800 bg-white border border-gray-300 overflow-x-auto focus:outline-none focus:border-gray-400 focus:ring-0 dark:text-gray-300 dark:bg-gray-700 dark:border-gray-700 dark:focus:border-gray-600" placeholder="Password" aria-label="password" type="password" required />
                                    </div>
                                    <div className="mb-6">
                                        <input value={remember} onChange={(event)=>setRemember(event.target.value)} className="form-checkbox h-5 w-5 text-indigo-500 dark:bg-gray-700 border border-gray-300 dark:border-gray-700 rounded focus:outline-none" type="checkbox" id="remember"/>
                                        <label className="ltr:ml-2 rtl:mr-2" htmlFor="remember">
                                            Remember me
                                        </label>
                                    </div>
                                    <div className="grid">
                                        <button type="submit" className="py-2 px-4 inline-block text-center rounded leading-normal text-gray-100 bg-indigo-500 border border-indigo-500 hover:text-white hover:bg-indigo-600 hover:ring-0 hover:border-indigo-600 focus:bg-indigo-600 focus:border-indigo-600 focus:outline-none focus:ring-0" disabled={isLoading}>
                                            {/* <i class="fas fa-sign-in"></i> */}
                                            {isLoading?<><Loading className="inline-block"/> Login...</>:<><FaSignInAlt className="inline-block"/> Login</>}
                                        </button>
                                    </div>
                                </form>
                                <div className="mt-6">
                                    <p className="text-center mb-6"><span>Or</span></p>
                                    <div className="text-center mb-4 sm:space-x-4">
                                        <a className="py-2 px-4 block sm:inline-block rounded leading-5 text-gray-100 bg-indigo-900 border border-indigo-900 hover:text-white hover:opacity-90 hover:ring-0 hover:border-indigo-900 focus:bg-indigo-900 focus:border-indigo-800 focus:outline-none focus:ring-0 mb-3" href="#" disabled={isLoading}>
                                            <FaFacebook className="inline-block m-1"/>
                                            Github Login
                                        </a>
                                        <a className="py-2 px-4 block sm:inline-block rounded leading-5 text-gray-100 bg-indigo-500 border border-indigo-500 hover:text-white hover:bg-indigo-600 hover:ring-0 hover:border-indigo-600 focus:bg-indigo-600 focus:border-indigo-600 focus:outline-none focus:ring-0 mb-3" href="#" disabled={isLoading}>
                                            <FaGithub className="inline-block m-1"/>
                                            Github Login
                                        </a>
                                    </div>
                                    <p className="text-center mb-4">Don't have an account? <NavLink className="hover:text-indigo-500" to="/register">Register</NavLink></p>
                                    <p className="text-center"><NavLink className="hover:text-indigo-500" to="/resetpassword">Lost password?</NavLink></p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Login;