import React, {useState} from 'react';
import {FaFacebook, FaSignInAlt, FaTwitter} from "react-icons/all.js";
import {NavLink} from "react-router-dom";

function Register() {
    const [fields, setFields] = useState(
        { name:"",
        username:"",
        password:"",
        rePassword:"" });

    function onChangeHandler(event) {
        setFields({...fields, [event.target.name]:event.target.value});
    }

    function submitHandler(event) {
        event.preventDefault();
        console.log(fields);
    }

    return (
        <div id="register-area" className="relative py-12 bg-gray-100 dark:bg-gray-900 dark:bg-opacity-40">
            <div className="container xl:max-w-6xl mx-auto px-4">
                <div className="flex flex-wrap flex-row -mx-4 justify-center">
                    {/* register form */}
                    <div className="max-w-full w-full md:w-2/3 lg:w-1/2 px-6 sm:px-12">
                        <div className="relative">
                            <div className="p-6 sm:py-8 sm:px-12 rounded-lg bg-white dark:bg-gray-800 shadow-xl">
                                <form id="register-form" onSubmit={submitHandler}>
                                    <h1 className="text-2xl leading-normal mb-6 font-bold text-gray-800  dark:text-gray-300 text-center">Register</h1>
                                    <hr className="block w-12 h-0.5 mx-auto my-5 bg-gray-700 border-gray-700" />
                                    <div className="mb-6">
                                        <input name="name" value={fields.name} onChange={onChangeHandler} className="w-full leading-5 relative py-2 px-4 rounded text-gray-800 bg-white border border-gray-300 overflow-x-auto focus:outline-none focus:border-gray-400 focus:ring-0 dark:text-gray-300 dark:bg-gray-700 dark:border-gray-700 dark:focus:border-gray-600" placeholder="Full Name" aria-label="full name" type="text" required />
                                    </div>
                                    <div className="mb-6">
                                        <input name="username" value={fields.username} onChange={onChangeHandler} className="w-full leading-5 relative py-2 px-4 rounded text-gray-800 bg-white border border-gray-300 overflow-x-auto focus:outline-none focus:border-gray-400 focus:ring-0 dark:text-gray-300 dark:bg-gray-700 dark:border-gray-700 dark:focus:border-gray-600" placeholder="Email address" aria-label="email" type="email" required />
                                    </div>
                                    <div className="mb-6">
                                        <input name="password" value={fields.password} onChange={onChangeHandler} className="w-full leading-5 relative py-2 px-4 rounded text-gray-800 bg-white border border-gray-300 overflow-x-auto focus:outline-none focus:border-gray-400 focus:ring-0 dark:text-gray-300 dark:bg-gray-700 dark:border-gray-700 dark:focus:border-gray-600" placeholder="Password" aria-label="password" type="password" required />
                                    </div>
                                    <div className="mb-6">
                                        <input name="rePassword" value={fields.rePassword} onChange={onChangeHandler} className="w-full leading-5 relative py-2 px-4 rounded text-gray-800 bg-white border border-gray-300 overflow-x-auto focus:outline-none focus:border-gray-400 focus:ring-0 dark:text-gray-300 dark:bg-gray-700 dark:border-gray-700 dark:focus:border-gray-600" placeholder="Repeat Password" aria-label="repeat password" type="password" required />
                                    </div>
                                    <div className="mb-6">
                                        <input className="form-checkbox h-5 w-5 text-indigo-500 dark:bg-gray-700 border border-gray-300 dark:border-gray-700 rounded focus:outline-none" type="checkbox" defaultValue id="terms" required />
                                        <label className="ltr:ml-2 rtl:mr-2" htmlFor="terms">
                                            I agree to the <a href="#">Terms and Conditions</a>
                                        </label>
                                    </div>
                                    <div className="grid">
                                        <button type="submit" className="py-2 px-4 inline-block text-center rounded leading-normal text-gray-100 bg-indigo-500 border border-indigo-500 hover:text-white hover:bg-indigo-600 hover:ring-0 hover:border-indigo-600 focus:bg-indigo-600 focus:border-indigo-600 focus:outline-none focus:ring-0">
                                            <FaSignInAlt className="ltr:mr-2 rtl:ml-2 inline-block"/>
                                            Register
                                        </button>
                                    </div>
                                </form>
                                <div className="mt-3">
                                    <p className="text-center mb-3"><span>Or</span></p>
                                    <div className="text-center mb-4 sm:space-x-4">
                                        <a className="py-2 px-4 block sm:inline-block rounded leading-5 text-gray-100 bg-indigo-900 border border-indigo-900 hover:text-white hover:opacity-90 hover:ring-0 hover:border-indigo-900 focus:bg-indigo-900 focus:border-indigo-800 focus:outline-none focus:ring-0 mb-3" href="#">
                                            <FaFacebook className="ltr:mr-2 rtl:ml-2 inline-block" />
                                            Join with Fb
                                        </a>
                                        <a className="py-2 px-4 block sm:inline-block rounded leading-5 text-gray-100 bg-indigo-500 border border-indigo-500 hover:text-white hover:bg-indigo-600 hover:ring-0 hover:border-indigo-600 focus:bg-indigo-600 focus:border-indigo-600 focus:outline-none focus:ring-0 mb-3" href="#">
                                            <FaTwitter className="ltr:mr-2 rtl:ml-2 inline-block" />
                                            Join with Twitter
                                        </a>
                                    </div>
                                    <p className="text-center mb-4">Already have an account?  <NavLink className="hover:text-indigo-500" to="/login">Login</NavLink></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;