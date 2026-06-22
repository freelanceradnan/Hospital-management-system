import React, { useContext, useState } from 'react';
import { assets } from './../../assets/assets';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { MainContext } from '../../Contexts/MainContext';
import { signOut } from 'firebase/auth';
import { auth } from '../../Firebase/Firebase';

const Navbar = () => {
    const navigate=useNavigate();
    
    const {islogin,role,currentUser,loading}=useContext(MainContext)

  if (loading) {
  return (
    <div className="w-full flex items-center justify-between py-4 mb-5 border-b border-b-gray-200 animate-pulse">
     
      <div className="h-8 w-40 bg-zinc-200 rounded-md"></div>

  
      <ul className="hidden lg:flex items-center gap-6">
        <li className="h-4 w-14 bg-zinc-200 rounded"></li>
        <li className="h-4 w-24 bg-zinc-200 rounded"></li>
        <li className="h-4 w-16 bg-zinc-200 rounded"></li>
        <li className="h-4 w-16 bg-zinc-200 rounded"></li>
      </ul>
  
      <div className="flex items-center gap-4">
     
        <div className="h-10 w-32 bg-zinc-200 rounded-full hidden md:block"></div>
        
       
        <div className="h-8 w-8 bg-zinc-200 rounded-full lg:hidden"></div>
      </div>
    </div>
  );
}

    return (
        <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400'>
         <Link to="/"><img src={assets.logo} alt="" className='w-44 cursor-pointer'/></Link>


         <ul className='hidden lg:flex items-start gap-5 font-medium uppercase hidden'>
            <NavLink to="/">
                <li className='py-1'>HOME</li>
                <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
            </NavLink>
            <NavLink to="/doctors">
                <li className='py-1'>All Doctors</li>
                 <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
            </NavLink>
            <NavLink to="/about">
                <li className='py-1'>ABOUT</li>
                 <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
            </NavLink>
            <NavLink to="/contact">
                <li className='py-1'>Contact</li>
                 <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
            </NavLink>
            
         </ul>
         <div className='flex items-center gap-5'>
            {islogin && currentUser?
        <div>
        <div className='flex items-center gap-2 cursor-pointer group relative'>
        <img src={assets.profile_pic} alt="" className='w-8 rounded-full'/>
        <img src={assets.dropdown_icon} alt="" className='w-2.5'/>
        <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block '>
            <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
            <p className='hover:text-black cursor-pointer' onClick={()=>navigate('my-profile')}>My Profile</p>
            <p className='hover:text-black cursor-pointer' onClick={()=>navigate('my-appointment')}>My Appointments</p>
            <p className='hover:text-black cursor-pointer' onClick={()=>signOut(auth)}>Logout</p>
        </div>
        </div>
        </div>
        </div>:
        <div>
            <button className='bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block' onClick={()=>navigate('/login')}>Create Account</button>
        </div>
        }
         </div>
        </div>
    );
};

export default Navbar;