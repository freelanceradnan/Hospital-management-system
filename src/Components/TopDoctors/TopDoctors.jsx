import React, { useContext, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { MainContext } from "../../Contexts/MainContext";
import { useGetAllDoctorsQuery } from "../../Feature/ApiSlice";

const TopDoctors = () => {
    const {data:allDoctors,isLoading}=useGetAllDoctorsQuery()
    const [doctors,setDoctors]=useState([])
    // const {doctors}=useContext(MainContext)
    const navigate=useNavigate()
    useEffect(()=>{
    if(allDoctors){
        setDoctors(allDoctors)
    }
    },[allDoctors])
   if (isLoading) {
    return (
       <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 p-5">
    {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
      <div key={num} className=" p-4 rounded-xl animate-pulse bg-gray-100">
        <div className="w-full h-40 bg-gray-300 rounded-md"></div>
        <div className="w-20 h-4 bg-gray-300 mt-3 rounded"></div>
        <div className="w-full h-6 bg-gray-300 mt-2 rounded"></div>
      </div>
    ))}
  </div>
    );
  }
  return (
     <div className="flex items-center justify-center flex-col gap-4 my-10 text-gray-900 md:mx-10">
 
      <h1 className="text-3xl font-medium">Top Doctors to Book</h1>
      <p className="sm:w-1/2 text-center text-sm">
       Simply browse through our extensive list of trusted doctors.
      </p>


    <div className="w-full grid grid-cols-auto-cards gap-4 pt-5 gap-y-6 px-3 sm:px-0">
        {doctors.slice(0,10).map((item,index)=>(
         
         <div key={index} className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500" onClick={()=>navigate(`/appointment/${item.id}`,scrollTo(0,0))}>
        <img src={item.image} alt="" className="bg-blue-50"/>
       
        <div className="p-4">
            <div className="flex items-center gap-2 text-sm text-center text-green-500">
                <p className="w-2 h-2 bg-green-500 rounded-full"></p><p>Available</p>
            </div>
            <p>{item.name}</p>
            <p>{item.speciality}</p>
        </div>
         </div>
        ))}
       
    </div>
     <p className="bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10"
     onClick={()=>{navigate('/doctors');scrollTo(0,0)}}>More</p>
     </div>
  );
};

export default TopDoctors;
