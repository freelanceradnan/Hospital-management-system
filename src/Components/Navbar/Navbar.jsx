import React, { useState } from 'react';
import { assets } from './../../assets/assets';
import { Link, NavLink, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate=useNavigate();
    const [token,setToken]=useState(true)
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
            {token?
        <div>
        <div className='flex items-center gap-2 cursor-pointer group relative'>
        <img src={assets.profile_pic} alt="" className='w-8 rounded-full'/>
        <img src={assets.dropdown_icon} alt="" className='w-2.5'/>
        <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block '>
            <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
            <p className='hover:text-black cursor-pointer'>My Profile</p>
            <p className='hover:text-black cursor-pointer'>My Appointments</p>
            <p className='hover:text-black cursor-pointer' onClick={()=>setToken(false)}>Logout</p>
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