import React, { useState } from 'react';

const AuthForm = () => {
//change from with states
  const [state, setState] = useState('signup');
  
  // Form input states
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
   
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4">
      <form 
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 items-start p-8 w-full max-w-md border border-gray-300 rounded-xl text-zinc-600 text-sm shadow-lg bg-white"
      >
        {/* Header Section */}
        <div>
          <h2 className="text-2xl font-semibold text-zinc-800">
            {state === "signup" ? "Create Account" : "Login"}
          </h2>
          <p className="text-zinc-500 mt-1">
            {state === "signup"
              ? "Please sign up to book appointment"
              : "Please login to book appointment"}
          </p>
        </div>

        {/* Full Name Field (Hidden on Login) */}
        {state === "signup" && (
          <div className="w-full">
            <label htmlFor="fullName" className="text-sm font-medium text-zinc-700">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              id="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="John Doe"
              className="border border-zinc-300 rounded w-full p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
        )}

        {/* Email Field */}
        <div className="w-full">
          <label htmlFor="email" className="text-sm font-medium text-zinc-700">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className="border border-zinc-300 rounded w-full p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        {/* Password Field */}
        <div className="w-full">
          <label htmlFor="password" className="text-sm font-medium text-zinc-700">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            className="border border-zinc-300 rounded w-full p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded mt-2 transition duration-200"
        >
          {state === "signup" ? "Create Account" : "Login"}
        </button>

        {/* State Toggle Link */}
        <p className="text-zinc-500 mt-2 text-center w-full">
          {state === "signup" ? "Already have an account? " : "Don't have an account? "}
          <span 
            onClick={() => setState(state === 'signup' ? 'login' : 'signup')}
            className="text-blue-600 font-medium cursor-pointer hover:underline ml-1"
          >
            {state === "signup" ? "Login here" : "Sign up here"}
          </span>
        </p>
        {state!=="signup"&&(
          <>
          <p>Doctors Login</p>
        <p>Admin Login</p>
          </>
        )}
      </form>
    </div>
  );
};

export default AuthForm;