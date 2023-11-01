import React from 'react';

const LandingPage = () => {
    return (
        <div className="flex flex-col items-center">
            {/* Banner */}
            <div className="bg-indigo-500 p-10 text-center text-white">
                <h1 className="text-3xl font-bold">Programming Project Management System</h1>
                <p className="text-lg">Efficiently manage your programming projects with ease</p>
            </div>

            {/* Features */}
            <div className="mt-10 px-10">
                <h2 className="text-2xl font-bold mb-5">Features</h2>
                <ul className="list-disc">
                    <li className="mb-2">Project management</li>
                    <li className="mb-2">Version control</li>
                    <li className="mb-2">Task management</li>
                    <li className="mb-2">Issue tracking</li>
                    <li className="mb-2">Communication</li>
                    <li className="mb-2">Reporting</li>
                    <li className="mb-2">Code review</li>
                    <li className="mb-2">Continuous integration and deployment</li>
                </ul>
            </div>

            {/* About */}
            <div className="mt-10 px-10">
                <h2 className="text-2xl font-bold mb-5">About</h2>
                <p className="text-lg mb-5">
                    The Programming Project Management System is a web-based application that helps developers and project managers to plan, execute, and track software development projects.
                </p>
            </div>

            {/* Reviews */}
            <div className="mt-10 px-10">
                <h2 className="text-2xl font-bold mb-5">Reviews</h2>
                <p className="text-lg mb-5">
                    "The Programming Project Management System has been a game-changer for our team. It has improved our workflow and made it easier for us to track the progress of our projects." - John Doe
                </p>
            </div>

            {/* Pricing */}
            <div className="mt-10 px-10">
                <h2 className="text-2xl font-bold mb-5">Pricing</h2>
                <p className="text-lg mb-5">Starting at $10/month</p>
            </div>
        </div>
    );
};

export default LandingPage;
