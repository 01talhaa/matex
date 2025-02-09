import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useFormAnimation } from "@/src/utils/animations";
import { FaCamera, FaUser, FaEnvelope, FaLock, FaIdCard } from "react-icons/fa";
import { useRouter } from "next/navigation";

const BuyerForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    nidPassport: "",
  });
  const [capturedImage, setCapturedImage] = useState(null);
  const [cameraStarted, setCameraStarted] = useState(false); // Added state
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const formAnimation = useFormAnimation();
  const router = useRouter();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraStarted(true); // Set cameraStarted to true when the camera is successfully started
      }
    } catch (err) {
      console.error("Error accessing the camera:", err);
    }
  };

  // Stop camera stream function
  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
      setCameraStarted(false); // Set cameraStarted to false when the camera is stopped
    }
  };


  const captureImage = () => {
    if (canvasRef.current && videoRef.current) {
      const context = canvasRef.current.getContext("2d");
      canvasRef.current.width = videoRef.current.videoWidth; // Set canvas width
      canvasRef.current.height = videoRef.current.videoHeight; // Set canvas height
      context.drawImage(videoRef.current, 0, 0, videoRef.current.videoWidth, videoRef.current.videoHeight);
      const imageDataUrl = canvasRef.current.toDataURL("image/jpeg");
      setCapturedImage(imageDataUrl);
      stopCamera();  //stop camera after capturing image
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Handle final form submission
      console.log("Form submitted", { ...formData, kycImage: capturedImage });
      router.push('/');
    }
  };

  const renderReviewStep = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6 bg-white rounded-lg p-6 shadow-sm"
    >
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Review Your Information</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Full Name</h3>
            <p className="mt-1 text-base text-gray-900">{formData.name}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Email Address</h3>
            <p className="mt-1 text-base text-gray-900">{formData.email}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">NID/Passport Number</h3>
            <p className="mt-1 text-base text-gray-900">{formData.nidPassport}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500">KYC Image</h3>
            {capturedImage && (
              <div className="mt-1 relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={capturedImage}
                  alt="KYC Verification"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );

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
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= num ? 'bg-indigo-600' : 'bg-gray-200'
                } text-white font-semibold`}>{num}</div>
                {num < 3 && (
                  <div className={`w-16 h-1 ${
                    step > num ? 'bg-indigo-600' : 'bg-gray-200'
                  }`}></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      <motion.form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <div className="relative">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="pl-10 block w-full rounded-lg border-gray-200 bg-gray-50 focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all duration-200"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div className="relative">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
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
                  placeholder="john@example.com"
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
                  placeholder="Enter your ID number"
                />
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
              <h2 className="text-xl font-semibold text-gray-800 mb-2">KYC Verification</h2>
              <p className="text-sm text-gray-600 mb-4">Please take a clear photo of yourself holding your ID document</p>

              {!capturedImage ? (
                <div className="space-y-4">
                  <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden shadow-inner">
                    <video
                      ref={videoRef}
                      autoPlay
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      {!cameraStarted ? (
                        <div className="text-center text-gray-400">
                          <FaCamera className="w-12 h-12 mx-auto mb-2" />
                          <p>Camera preview will appear here</p>
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div className="flex justify-center space-x-4">
                    {!cameraStarted ? (
                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={startCamera}
                        className="py-2 px-6 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200"
                      >
                        Start Camera
                      </motion.button>
                    ) : (
                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={captureImage}
                        className="py-2 px-6 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200"
                      >
                        Take Photo
                      </motion.button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden shadow-inner">
                    <img
                      src={capturedImage}
                      alt="Captured"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setCapturedImage(null);
                      startCamera();
                    }}
                    className="w-full py-2 px-4 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 transition-all duration-200"
                  >
                    Retake Photo
                  </motion.button>
                </div>
              )}
            </div>
            <canvas ref={canvasRef} style={{ display: "none" }} />
          </motion.div>
        )}

        {step === 3 && renderReviewStep()}

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={(step === 2 && !capturedImage) || (step === 1 && (!formData.name || !formData.email || !formData.password || !formData.confirmPassword || !formData.nidPassport))}
          className="w-full py-3 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {step === 1 ? "Next: KYC Verification" : step === 2 ? "Review Information" : "Complete Registration"}
        </motion.button>
      </motion.form>
    </motion.div>
  );
};

export default BuyerForm;