import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useFormAnimation } from "@/src/utils/animations";
import { FaUser, FaPhone, FaEnvelope, FaLock, FaIdCard, FaBriefcase, FaFileUpload, FaSpinner } from "react-icons/fa";
import { useRouter } from "next/navigation";

const SupplierForm = ({ onSuccess, setError }) => {
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        companyName: "",
        contactNumber: "",
        email: "",
        password: "",
        confirmPassword: "",
        nidPassport: "",
        tradeLicense: "",
        documents: [],
        documentPreviews: [] // state to store base64 encoded previews
    });
    const formAnimation = useFormAnimation();
    const router = useRouter();

    useEffect(() => {
        // generate previews when documents change
        const generatePreviews = async () => {
            const previews = [];
            for (const file of formData.documents) {
                const preview = await readFileAsBase64(file);
                previews.push(preview);
            }
            setFormData(prevFormData => ({ ...prevFormData, documentPreviews: previews }));
        };

        if (formData.documents.length > 0) {
            generatePreviews();
        }
    }, [formData.documents]);

    // Helper function to read a file as base64
    const readFileAsBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (event) => {
                resolve(event.target.result);
            };
            reader.onerror = (error) => {
                reject(error);
            };
            reader.readAsDataURL(file);
        });
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setFormData({
            ...formData,
            documents: files,
        });
    };

    const handleNextStep = (e) => {
        e.preventDefault();
        
        // Validation for step 1
        if (step === 1) {
            if (formData.password !== formData.confirmPassword) {
                setError("Passwords do not match");
                return;
            }
            setStep(2);
        } 
        // Validation for step 2
        else if (step === 2) {
            if (!formData.nidPassport || !formData.tradeLicense || formData.documents.length === 0) {
                setError("Please complete all required fields");
                return;
            }
            setStep(3);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (step !== 3) {
            handleNextStep(e);
            return;
        }
        
        try {
            setIsSubmitting(true);
            setError('');
            
            // Prepare data for submission
            const submissionData = {
                companyName: formData.companyName,
                contactNumber: formData.contactNumber,
                email: formData.email,
                password: formData.password,
                nidPassport: formData.nidPassport,
                tradeLicense: formData.tradeLicense,
                documentPreviews: formData.documentPreviews,
                role: "supplier",
            };
            
            console.log("Submitting supplier registration data");
            
            // Step 1: Register the user
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(submissionData),
            });
            
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || "Registration failed");
            }
            
            // Step 2: Auto login after successful registration
            const loginResponse = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password
                }),
            });
            
            const loginData = await loginResponse.json();
            
            if (!loginResponse.ok) {
                // Registration succeeded but login failed - still show success and allow manual login
                console.error("Auto-login failed after registration:", loginData.message);
                onSuccess();
                return;
            }
            
            // Store user info in localStorage for the Header component to use
            localStorage.setItem('userInfo', JSON.stringify(loginData.user));
            
            // Show success message
            onSuccess();
            
            // Redirect to supplier dashboard after a brief delay
            setTimeout(() => {
                router.push('/supplier-dashboard');
            }, 1500);
            
        } catch (error) {
            setError(error.message || "Failed to register. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const renderReviewStep = () => (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6 bg-white rounded-lg p-6 shadow-sm"
        >
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Review Business Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <div>
                        <h3 className="text-sm font-medium text-gray-500">Company Name</h3>
                        <p className="mt-1 text-base text-gray-900">{formData.companyName}</p>
                    </div>
                    <div>
                        <h3 className="text-sm font-medium text-gray-500">Contact Number</h3>
                        <p className="mt-1 text-base text-gray-900">{formData.contactNumber}</p>
                    </div>
                    <div>
                        <h3 className="text-sm font-medium text-gray-500">Business Email</h3>
                        <p className="mt-1 text-base text-gray-900">{formData.email}</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <div>
                        <h3 className="text-sm font-medium text-gray-500">NID/Passport Number</h3>
                        <p className="mt-1 text-base text-gray-900">{formData.nidPassport}</p>
                    </div>
                    <div>
                        <h3 className="text-sm font-medium text-gray-500">Trade License Number</h3>
                        <p className="mt-1 text-base text-gray-900">{formData.tradeLicense}</p>
                    </div>
                    <div>
                        <h3 className="text-sm font-medium text-gray-500">Uploaded Documents</h3>
                        <p className="mt-1 text-base text-gray-900">
                            {formData.documents.length} file(s) uploaded
                        </p>
                        <ul className="mt-2 text-sm text-gray-600">
                            {formData.documents.map((file, index) => (
                                <li key={index} className="flex items-center space-x-2">
                                    <FaFileUpload className="text-gray-400" />
                                    <span>{file.name}</span>
                                </li>
                            ))}
                        </ul>
                        <div className="mt-4 grid grid-cols-2 gap-4">
                            {formData.documentPreviews.map((preview, index) => (
                                <div key={index}>
                                    <img src={preview} alt={`Document ${index + 1}`} className="w-full h-32 object-contain border rounded" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );

    const getStepLabel = () => {
        switch (step) {
            case 1:
                return "Next: Business Verification";
            case 2:
                return "Next: Review Information";
            case 3:
                return "Submit Application";
            default:
                return "Next";
        }
    };

    // Function for button click to handle multi-step form
    const handleButtonClick = (e) => {
        e.preventDefault();
        if (step < 3) {
            handleNextStep(e);
        } else {
            handleSubmit(e);
        }
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={formAnimation}
            className="space-y-6"
        >
            <div className="relative">
                <div className="flex justify-center mb-6">
                    <div className="flex items-center">
                        {[1, 2, 3].map((num) => (
                            <React.Fragment key={num}>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= num ? 'bg-indigo-600' : 'bg-gray-200'
                                    } text-white font-semibold`}>{num}</div>
                                {num < 3 && (
                                    <div className={`w-16 h-1 ${step > num ? 'bg-indigo-600' : 'bg-gray-200'
                                        }`}></div>
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>

            <motion.form
                onSubmit={handleButtonClick}
                className="space-y-4"
            >
                {step === 1 && (
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-4"
                    >
                        <div className="relative">
                            <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
                                Company Name
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaUser className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    id="companyName"
                                    name="companyName"
                                    value={formData.companyName}
                                    onChange={handleInputChange}
                                    required
                                    className="pl-10 block w-full rounded-lg border-gray-200 bg-gray-50 focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all duration-200"
                                    placeholder="Your Company Name"
                                />
                            </div>
                        </div>

                        <div className="relative">
                            <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700">
                                Contact Number
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaPhone className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="tel"
                                    id="contactNumber"
                                    name="contactNumber"
                                    value={formData.contactNumber}
                                    onChange={handleInputChange}
                                    required
                                    className="pl-10 block w-full rounded-lg border-gray-200 bg-gray-50 focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all duration-200"
                                    placeholder="+1234567890"
                                />
                            </div>
                        </div>

                        <div className="relative">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Business Email
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaEnvelope className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                    className="pl-10 block w-full rounded-lg border-gray-200 bg-gray-50 focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all duration-200"
                                    placeholder="business@example.com"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="relative">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaLock className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        required
                                        className="pl-10 block w-full rounded-lg border-gray-200 bg-gray-50 focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all duration-200"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>

                            <div className="relative">
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                                    Confirm Password
                                </label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaLock className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="password"
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleInputChange}
                                        required
                                        className="pl-10 block w-full rounded-lg border-gray-200 bg-gray-50 focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all duration-200"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {step === 2 && (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-6"
                    >
                        <div className="bg-indigo-50 rounded-lg p-6 border border-indigo-100">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Business Verification</h2>

                            <div className="space-y-4">
                                <div className="relative">
                                    <label htmlFor="nidPassport" className="block text-sm font-medium text-gray-700">
                                        NID/Passport Number
                                    </label>
                                    <div className="mt-1 relative rounded-md shadow-sm">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <FaIdCard className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            id="nidPassport"
                                            name="nidPassport"
                                            value={formData.nidPassport}
                                            onChange={handleInputChange}
                                            required
                                            className="pl-10 block w-full rounded-lg border-gray-200 bg-gray-50 focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all duration-200"
                                            placeholder="Enter NID/Passport number"
                                        />
                                    </div>
                                </div>

                                <div className="relative">
                                    <label htmlFor="tradeLicense" className="block text-sm font-medium text-gray-700">
                                        Trade License Number
                                    </label>
                                    <div className="mt-1 relative rounded-md shadow-sm">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <FaBriefcase className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            id="tradeLicense"
                                            name="tradeLicense"
                                            value={formData.tradeLicense}
                                            onChange={handleInputChange}
                                            required
                                            className="pl-10 block w-full rounded-lg border-gray-200 bg-gray-50 focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all duration-200"
                                            placeholder="Enter trade license number"
                                        />
                                    </div>
                                </div>

                                <div className="relative">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Upload Documents
                                    </label>
                                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                                        <div className="space-y-1 text-center">
                                            <FaBriefcase className="mx-auto h-12 w-12 text-gray-400" />
                                            <div className="flex text-sm text-gray-600">
                                                <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                                    <span>Upload files</span>
                                                    <input
                                                        id="file-upload"
                                                        name="file-upload"
                                                        type="file"
                                                        className="sr-only"
                                                        multiple
                                                        onChange={handleFileChange}
                                                    />
                                                </label>
                                                <p className="pl-1">or drag and drop</p>
                                            </div>
                                            <p className="text-xs text-gray-500">
                                                PDF, PNG, JPG up to 10MB each
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {step === 3 && renderReviewStep()}

                <motion.div className="flex justify-between mt-8">
                    {step > 1 && (
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="button"
                            onClick={() => setStep(step - 1)}
                            className="py-3 px-6 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-200"
                            disabled={isSubmitting}
                        >
                            Back
                        </motion.button>
                    )}
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={(step === 1 && (!formData.companyName || !formData.contactNumber || !formData.email || !formData.password || !formData.confirmPassword)) ||
                            (step === 2 && (!formData.nidPassport || !formData.tradeLicense || formData.documents.length === 0)) ||
                            isSubmitting}
                        className={`${step > 1 ? 'ml-auto' : 'w-full'
                            } py-3 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center`}
                    >
                        {isSubmitting ? (
                            <>
                                <FaSpinner className="animate-spin mr-2" />
                                {step === 3 ? "Processing..." : "Loading..."}
                            </>
                        ) : (
                            getStepLabel()
                        )}
                    </motion.button>
                </motion.div>
            </motion.form>
        </motion.div>
    );
};

export default SupplierForm;