import React, {useCallback, useState, useEffect} from 'react';
import {FaCloudUploadAlt} from "react-icons/all.js";
import {useDropzone} from "react-dropzone";
import { useNavigate } from 'react-router-dom';
import fetcher from '../../fetcher';
import coverImage from "../../assets/cover_image.jpg"
import avatarImage from "../../assets/avatarImage.jpg"

function ProfileUpdateForm() {
    const navigate = useNavigate();
    const [fields, setField] = useState({
        mobileNumber:"",
        email: "",
        profession:"",
        location:"",
        details:"",
        description:""
    });
    const [profileId, setProfileId] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        fetcher.getProfile().then(res => {
            const p = res.data;
            setProfileId(p.id);
            setField({
                mobileNumber: p.mobileNumber || "",
                email: p.email || "",
                profession: p.profession || "",
                location: p.location || "",
                details: p.details || "",
                description: p.description || ""
            });
        }).catch(() => {});
    }, []);

    const dropAvatar = useCallback(acceptedFiles => {
        if (acceptedFiles.length > 0 && profileId) {
            fetcher.uploadProfileImage(profileId, acceptedFiles[0]).catch(() => {});
        }
    }, [profileId]);

    const avatarDropZone = useDropzone({onDrop:dropAvatar, accept: {'image/*': ['.png', '.jpg', '.jpeg']}});

    const submitHandle = (event) => {
        event.preventDefault();
        if (!profileId) return;
        setSubmitting(true);
        fetcher.updateProfile(profileId, fields)
            .then(() => navigate("/dashboard"))
            .catch(err => {
                setError(err.response?.data?.error || "Failed to update profile");
                setSubmitting(false);
            });
    };

    function changeHandle(event) {
        setField({...fields, [event.target.name]:event.target.value})
    }

    return (
        <div className="valid-form bg-white dark:bg-gray-800 rounded-lg shadow-lg border dark:border-gray-800 flex flex-col overflow-hidden" >
            <h1 className="text-2xl leading-normal mb-6 font-bold text-gray-800 dark:text-gray-300 text-center">Profile Setup</h1>
            <hr className="block w-12 h-0.5 mx-auto my-5 bg-gray-700 border-gray-700" />
            <div className="p-6 flex-grow">
                <div className="flex flex-wrap flex-row -mx-4">
                    <div className="flex-shrink max-w-full px-4 w-full">
                        <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden pb-8">
                            <div className="h-40 overflow-hidden relative">
                                <img className="w-full" src={coverImage} alt="cover" />
                            </div>
                            <div className="flex justify-center -mt-10 relative">
                                <img src={avatarImage} className="rounded-full w-24 h-24 bg-gray-200 border-solid border-white border-2 -mt-3" alt="avatar" />
                            </div>
                        </div>
                    </div>
                    <div className="form-group flex-shrink max-w-full px-4 w-full md:w-1/2 mb-6">
                        <div className="inline-block mb-2">Avatar (80x80)</div>
                        <div id="avatar-upload" className="mb-6 h-64 flex flex-col text-center border-2 border-gray-300 justify-center align-middle" {...avatarDropZone.getRootProps()}>
                            <input type="file" id="avatar-file-input" className="sr-only" {...avatarDropZone.getInputProps()}/>
                                <div className="pre-upload flex flex-col justify-center">
                                    <FaCloudUploadAlt className="mx-auto text-gray-500 inline-block w-10 h-10 bi bi-cloud-arrow-up" />
                                    <div className="py-3 text-center"><span>Drag & drop images here</span></div>
                                </div>
                                <div>
                                    <label className="py-1.5 px-3 inline-block text-center rounded leading-normal text-gray-800 bg-gray-100 border border-gray-100 hover:text-gray-900 hover:bg-gray-200 hover:ring-0 hover:border-gray-200 focus:bg-gray-200 focus:border-gray-200 focus:outline-none focus:ring-0 ltr:mr-2 rtl:ml-2 dark:bg-gray-300">Browse file</label>
                                </div>
                        </div>
                    </div>
                    <div className="form-group flex-shrink max-w-full px-4 w-full md:w-1/2 mb-6">
                        <div className="inline-block mb-2">Cover (1287x160)</div>
                        <div id="cover-upload" className="mb-6 h-64 flex flex-col text-center border-2 border-gray-300 justify-center align-middle">
                            <div className="pre-upload flex flex-col justify-center">
                                <FaCloudUploadAlt className="mx-auto text-gray-500 inline-block w-10 h-10 bi bi-cloud-arrow-up" />
                                <div className="py-3 text-center"><span>Drag & drop images here</span></div>
                            </div>
                            <div>
                                <button className="py-1.5 px-3 inline-block text-center rounded leading-normal text-gray-800 bg-gray-100 border border-gray-100 hover:text-gray-900 hover:bg-gray-200 hover:ring-0 hover:border-gray-200 focus:bg-gray-200 focus:border-gray-200 focus:outline-none focus:ring-0 ltr:mr-2 rtl:ml-2 dark:bg-gray-300">Browse file</button>
                            </div>
                        </div>
                    </div>
                    <form onSubmit={submitHandle} className="flex flex-wrap flex-row">
                        <div className="form-group flex-shrink max-w-full px-4 w-full md:w-1/2 mb-6">
                            <label htmlFor="inputEmail4" className="inline-block mb-2">Email</label>
                            <input type="email" name="email" onChange={changeHandle} value={fields.email} className="w-full leading-5 relative py-2 px-4 rounded text-gray-800 bg-white border border-gray-300 overflow-x-auto focus:outline-none focus:border-gray-400 focus:ring-0 dark:text-gray-300 dark:bg-gray-700 dark:border-gray-700 dark:focus:border-gray-600" id="inputEmail4" />
                        </div>
                        <div className="form-group flex-shrink max-w-full px-4 w-full md:w-1/2 mb-6">
                            <label htmlFor="inputnumber" className="inline-block mb-2">Phone number</label>
                            <input type="text" name="mobileNumber" onChange={changeHandle} value={fields.mobileNumber} className="w-full leading-5 relative py-2 px-4 rounded text-gray-800 bg-white border border-gray-300 overflow-x-auto focus:outline-none focus:border-gray-400 focus:ring-0 dark:text-gray-300 dark:bg-gray-700 dark:border-gray-700 dark:focus:border-gray-600" id="inputnumber" />
                        </div>
                        <div className="form-group flex-shrink max-w-full px-4 w-full md:w-1/2 mb-6">
                            <label htmlFor="profession" className="inline-block mb-2">Profession</label>
                            <input type="text" name="profession" onChange={changeHandle} value={fields.profession} className="w-full leading-5 relative py-2 px-4 rounded text-gray-800 bg-white border border-gray-300 overflow-x-auto focus:outline-none focus:border-gray-400 focus:ring-0 dark:text-gray-300 dark:bg-gray-700 dark:border-gray-700 dark:focus:border-gray-600" id="profession" />
                        </div>
                        <div className="form-group flex-shrink max-w-full px-4 w-full md:w-1/2 mb-6">
                            <label htmlFor="inputlocation" className="inline-block mb-2">Location</label>
                            <input type="text" name="location" onChange={changeHandle} value={fields.location} className="w-full leading-5 relative py-2 px-4 rounded text-gray-800 bg-white border border-gray-300 overflow-x-auto focus:outline-none focus:border-gray-400 focus:ring-0 dark:text-gray-300 dark:bg-gray-700 dark:border-gray-700 dark:focus:border-gray-600" id="inputlocation" />
                        </div>
                        <div className="form-group flex-shrink max-w-full px-4 w-full mb-6">
                            <label htmlFor="inputshort" className="inline-block mb-2">Short description</label>
                            <input type="text" name="details" onChange={changeHandle} value={fields.details} className="w-full leading-5 relative py-2 px-4 rounded text-gray-800 bg-white border border-gray-300 overflow-x-auto focus:outline-none focus:border-gray-400 focus:ring-0 dark:text-gray-300 dark:bg-gray-700 dark:border-gray-700 dark:focus:border-gray-600" id="inputshort" />
                        </div>
                        <div className="form-group flex-shrink max-w-full px-4 w-full mb-6">
                            <label htmlFor="inputlong" className="inline-block mb-2">About description</label>
                            <textarea name="description" onChange={changeHandle} value={fields.description} className="w-full leading-5 relative py-2 px-4 rounded text-gray-800 bg-white border border-gray-300 overflow-x-auto focus:outline-none focus:border-gray-400 focus:ring-0 dark:text-gray-300 dark:bg-gray-700 dark:border-gray-700 dark:focus:border-gray-600" id="inputlong"></textarea>
                        </div>

                        {error && <div className="flex-shrink max-w-full px-4 w-full mb-4 text-red-500 text-sm">{error}</div>}

                        <div className="px-6 py-3 border-t dark:border-gray-800 flex justify-end w-full">
                            <button type="button" onClick={() => navigate("/dashboard")} className="py-2 px-4 inline-block text-center rounded leading-5 text-gray-800 bg-gray-100 border border-gray-100 hover:text-gray-900 hover:bg-gray-200 hover:ring-0 hover:border-gray-200 focus:bg-gray-200 focus:border-gray-200 focus:outline-none focus:ring-0 ltr:mr-2 rtl:ml-2">Close</button>
                            <button type="submit" disabled={submitting} className="py-2 px-4 inline-block text-center rounded leading-5 text-gray-100 bg-indigo-500 border border-indigo-500 hover:text-white hover:bg-indigo-600 hover:ring-0 hover:border-indigo-600 focus:bg-indigo-600 focus:border-indigo-600 focus:outline-none focus:ring-0">{submitting ? "Saving..." : "Save"}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ProfileUpdateForm;