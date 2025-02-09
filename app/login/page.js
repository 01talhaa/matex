'use client'
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaUserTie, FaShoppingCart, FaArrowLeft } from "react-icons/fa";

const LoginPage = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  
  const roles = [
    { 
      name: "Supplier", 
      icon: FaUserTie,
      description: "Access your supplier dashboard"
    },
    { 
      name: "Buyer", 
      icon: FaShoppingCart,
      description: "Sign in to your buyer account"
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 flex items-center justify-center p-6">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-gradient-to-br from-purple-200 to-indigo-200 rounded-full blur-3xl opacity-30 animate-pulse" />
      <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-gradient-to-tr from-indigo-200 to-blue-200 rounded-full blur-3xl opacity-30 animate-pulse" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 w-full max-w-md border border-white/20"
      >
        <div className="absolute -top-14 left-1/2 transform -translate-x-1/2">
          <div className="bg-white w-28 h-28 rounded-2xl shadow-lg flex items-center justify-center p-6 border border-indigo-50">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Hi!
            </h1>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-bold text-center mb-2 text-gray-800">Welcome Back</h2>
          <p className="text-center text-gray-600 mb-8">Sign in to continue</p>

          {!selectedRole ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="grid grid-cols-1 gap-4 mb-6">
                {roles.map((role) => (
                  <motion.button
                    key={role.name}
                    whileHover={{ scale: 1.02, backgroundColor: "#F5F7FF" }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedRole(role.name)}
                    className="group flex items-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-indigo-50"
                  >
                    <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-4 rounded-xl group-hover:scale-110 transition-transform duration-200">
                      <role.icon className="text-2xl text-white" />
                    </div>
                    <div className="ml-4 text-left">
                      <h3 className="text-lg font-semibold text-gray-800">{role.name}</h3>
                      <p className="text-sm text-gray-600">{role.description}</p>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/50 border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/50 border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200"
                  placeholder="Enter your password"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-3 px-6 text-white font-medium rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
              >
                Sign In as {selectedRole}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedRole(null)}
                className="flex items-center justify-center w-full py-2 text-indigo-600 hover:text-indigo-800 transition-colors duration-200"
              >
                <FaArrowLeft className="mr-2" />
                Back to role selection
              </motion.button>
            </motion.form>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;