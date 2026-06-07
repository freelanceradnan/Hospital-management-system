import React, { useContext } from "react";

import { useNavigate } from "react-router-dom";
import { MainContext } from "../../Contexts/MainContext";

const TopDoctors = () => {
    const {doctors}=useContext(MainContext)
    const navigate=useNavigate()
  return (
     <div className="flex items-center justify-center flex-col gap-4 my-16 text-gray-900 md:mx-10">
 
      <h1 className="text-3xl font-medium">Top Doctors to Book</h1>
      <p className="sm:w-1/2 text-center text-sm">
       Simply browse through our extensive list of trusted doctors.
      </p>


    <div className="w-full grid grid-cols-auto-cards gap-4 pt-5 gap-y-6 px-3 sm:px-0">
        {doctors.slice(0,10).map((item,index)=>(
         <div key={index} className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500" onClick={()=>navigate(`/appointment/${item._id}`)}>
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
     <p className="bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10">More</p>
     </div>
  );
};

export default TopDoctors;
