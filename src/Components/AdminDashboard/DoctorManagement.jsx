import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetAllDoctorsQuery } from '../../Feature/ApiSlice';

const DoctorManagement = () => {
    const navigate=useNavigate()
    const {data:AllDoctors}=useGetAllDoctorsQuery()
 
    const tempDoctor=[
        {name:"adnan dev",status:"active"},
        {name:"Ridoy dev",status:"active"},
        {name:"masud dev",status:"active"},
        {name:"shakib dev",status:"active"},
        {name:"shuvo dev",status:"active"},
    ]
    const activeDoctor = useMemo(() => {
  return AllDoctors?.filter(doc => doc.isActive === true);
}, [AllDoctors]);
    return (
        <div className='flex flex-col gap-4'>
            {/* header-page */}
            <div>
                <h2 className='text-2xl'>All Doctors</h2>
            <p>All Available Doctors</p>
            </div>
           <div className='flex justify-between'>
            <button className='bg-blue-500 text-white py-1 px-2' onClick={()=>navigate('/admin-dashboard/addDoctor')}>Add Doctor</button>
            <button className='bg-blue-500 text-white py-1 px-2'>Export</button>
           </div>
           {/* counter-div */}
           <div className='flex items-center justify-between gap-2'>
            <div className='border w-full min-h-[100px] rounded-sm'>
               <p>All Doctors</p>
               <h2>{AllDoctors?.length}</h2>
            </div>
            <div className='border w-full min-h-[100px] rounded-sm'>
                <p>Available Doctors</p>
                <h2>{activeDoctor?.length}</h2>
            </div>
            <div className='border w-full min-h-[100px] rounded-sm'>
                <p>UnAvailable Doctors</p>
                {AllDoctors?.length-activeDoctor?.length}
            </div>
            <div className='border w-full min-h-[100px] rounded-sm'>Total Catagory</div>
           </div>
           <div className='flex justify-between'>
                <h2>Total Available doctors 10</h2>
                <input type="search" name="" id="" className='border' placeholder='Search By Name...'/>
            </div>
           {/* doctors-list */}
           <div >
            
            {tempDoctor.map((doc,index)=>(
                <div key={index} className='flex justify-between flex-row'>
                   <h2> {doc.name}</h2>
                   <p>{doc.status}</p>
                   <p>Edit</p>
                   <p>Delete</p>
                    
                    </div>
            ))}
           </div>
        </div>
    );
};

export default DoctorManagement;