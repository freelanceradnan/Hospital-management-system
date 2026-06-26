import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const location = useLocation();
  const navigate=useNavigate()

const userRole = location.state?.role||"admin"
const [Role,setRole]=useState('admin')
 useEffect(()=>{
 setRole(userRole)
 },[userRole])
 const submitAdminHandler=()=>{

 }
 const submitDoctorHandler=()=>{}
    return (
       <div className="mx-auto mt-10 max-w-sm rounded-2xl bg-white p-8 shadow-xl border border-slate-100 sm:max-w-md">
      {/* Header Section */}
      <div className="text-center mb-8">
        {Role === 'admin' ? (
          <>
            <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Admin Login</h2>
            <p className="mt-2 text-sm text-slate-500">Please sign in with your admin credentials</p>
          </>
        ) : (
          <>
            <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Doctor Login</h2>
            <p className="mt-2 text-sm text-slate-500">Please sign in with your provider credentials</p>
          </>
        )}
      </div>

      {/* Form Section */}
      <form onSubmit={Role=='admin'?submitAdminHandler:submitDoctorHandler} className="flex flex-col gap-5">
        {/* Email Input */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-sm font-semibold text-slate-700">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            placeholder="name@example.com"
            className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm shadow-sm outline-none transition-all placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
            required
          />
        </div>

        {/* Password Input */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="password" className="text-sm font-semibold text-slate-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="••••••••"
            className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm shadow-sm outline-none transition-all placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-2 w-full rounded-lg bg-blue-600 py-3 text-sm font-semibold text-white shadow-md shadow-blue-500/15 transition-all hover:bg-blue-700 active:scale-[0.99] focus:outline-none focus:ring-4 focus:ring-blue-500/20"
        >
          {Role === 'admin' ? 'Login Admin' : 'Login Doctor'}
        </button>
        
        {Role=="admin"?
    <div className='flex items-center gap-2 mx-auto text-sm font-bold text-blue-500'>
            <button className="text-sm tracking-tight uppercase" onClick={()=>setRole("doctor")}>Doctor Login</button> |
            <button className='text-sm tracking-tight uppercase' onClick={()=>navigate('/login')}>User Login</button>
        </div>   :
        
        <div className='flex items-center gap-2 mx-auto text-blue-500 text-sm font-bold'>
            <button className="text-sm tracking-tight uppercase" onClick={()=>setRole("admin")}>Admin Login</button> |
             <button className='text-sm tracking-tight uppercase' onClick={()=>navigate('/login')}>User Login</button>
        </div>
    }
      </form>
    </div>
    );
};

export default AdminLogin;