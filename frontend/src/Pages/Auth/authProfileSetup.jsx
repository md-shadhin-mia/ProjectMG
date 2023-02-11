import React from 'react';
import ProfileUpdateForm from "../Componets/ProfileUpdateForm.jsx";

function AuthProfileSetup(props) {
    return (
        <div id="login-area" className="relative py-12 bg-gray-100 dark:bg-gray-900 dark:bg-opacity-40">
            <div className="container xl:max-w-6xl mx-auto px-4">
                <div className="flex flex-wrap flex-row -mx-4 justify-center">
                    {/* login form */}
                    <div className="max-w-full w-full md:w-2/3">
                        <ProfileUpdateForm />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AuthProfileSetup;