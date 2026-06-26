import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MainContext } from '../../Contexts/MainContext';
import { useGetAllDoctorsQuery } from '../../Feature/ApiSlice';


const Doctors = () => {
    const navigate = useNavigate();
    const { spaciality } = useParams(); 
    const {data:allDoctors,isLoading}=useGetAllDoctorsQuery()
    const [filterDoc, setFilterDoc] = useState([]);
    const [doctors,setDoctors]=useState([])
      useEffect(()=>{
         if(allDoctors){
             setDoctors(allDoctors)
         }
         },[allDoctors])
    const specialityList = [
        'General physician',
        'Gynecologist',
        'Dermatologist',
        'Pediatricians',
        'Neurologist',
        'Gastroenterologist'
    ];

    const applyFilter = () => {
        if (spaciality) {
            setFilterDoc(doctors.filter(doc => doc.speciality === spaciality));
        } else {
            setFilterDoc(doctors);
        }
    };

    useEffect(() => {
        applyFilter();
         
    }, [spaciality, doctors]);

    const handleNavigation = (currentSpeciality) => {
       
        if (spaciality === currentSpeciality) {
            navigate('/doctors'); 
        } else {
            navigate(`/doctors/${currentSpeciality}`);
        }
    };
if(isLoading){
    return <div>
  <p className='text-gray-600 sm:flex-row items-start gap-5 mt-5'>
    Browse Through the Doctor Specialists
  </p>
  
  <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
    
  
    <div className='flex flex-col gap-4 text-sm text-gray-600 animate-pulse'>
      {isLoading ? (
      
        Array.from({ length: 6 }).map((_, index) => (
          <div 
            key={index} 
            className="w-[94vw] sm:w-[180px] h-[38px] bg-gray-200 rounded border border-gray-200"
          ></div>
        ))
      ) : (
       
        specialityList.map((spec) => (
          <p 
            key={spec}
            onClick={() => handleNavigation(spec)} 
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
              spaciality === spec ? "bg-indigo-50 text-black font-medium" : ""
            }`}
          >
            {spec}
          </p>
        ))
      )}
    </div>

    {/* Doctors Grid / Skeleton */}
    <div className='w-full grid grid-cols-auto-cards gap-4 gap-y-6'>
      {isLoading ? (
       
        Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="border border-gray-200 rounded-xl overflow-hidden animate-pulse bg-white">
          
            <div className="w-full h-48 bg-gray-200"></div>
            
            <div className="p-4 flex flex-col gap-3">
             
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                <div className="w-16 h-3 bg-gray-200 rounded"></div>
              </div>
              
              <div className="w-3/4 h-5 bg-gray-300 rounded"></div>
             
              <div className="w-1/2 h-4 bg-gray-200 rounded"></div>
            </div>
          </div>
        ))
      ) : filterDoc.length > 0 ? (
       
        filterDoc.map((item, index) => (
          <div 
            key={item._id || index} 
            className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500" 
            onClick={() => navigate(`/appointment/${item._id}`)}
          >
            <img src={item.image} alt={item.name} className="bg-blue-50 w-full object-cover"/>
            <div className="p-4">
              <div className="flex items-center gap-2 text-sm text-center text-green-500">
                <p className="w-2 h-2 bg-green-500 rounded-full"></p>
                <p>Available</p>
              </div>
              <p className='text-neutral-900 text-lg font-medium'>{item.name}</p>
              <p className='text-gray-600 text-sm'>{item.speciality}</p>
            </div>
          </div>
        ))
      ) : (
       
        <div className='flex justify-center items-center w-full text-center text-gray-500 py-10 col-span-full font-medium'>
          Doctors Not Available At this moment!
        </div>
      )}
    </div>

  </div>
</div>
}
    return (
        <div>
            <p className='text-gray-600 sm:flex-row items-start gap-5 mt-5'>
                Browse Through the Doctor Specialists
            </p>
            
            <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
                {/* Sidebar Filter Buttons */}
                <div className='flex flex-col gap-4 text-sm text-gray-600'>
                    {specialityList.map((spec) => (
                        <p 
                            key={spec}
                            onClick={() => handleNavigation(spec)} 
                            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
                                spaciality === spec ? "bg-indigo-50 text-black font-medium" : ""
                            }`}
                        >
                            {spec}
                        </p>
                    ))}
                </div>

                {/* Doctors Grid */}
                <div className='w-full grid grid-cols-auto-cards gap-4 gap-y-6'>
                   {filterDoc.length>0?<> {filterDoc.map((item, index) => (
                        <div 
                            key={item._id || index} 
                            className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500" 
                            onClick={() => navigate(`/appointment/${item.id}`)}
                        >
                            <img src={item.image} alt={item.name} className="bg-blue-50 w-full object-cover"/>
                            <div className="p-4">
                                <div className="flex items-center gap-2 text-sm text-center text-green-500">
                                    <p className="w-2 h-2 bg-green-500 rounded-full"></p>
                                    <p>Available</p>
                                </div>
                                <p className='text-neutral-900 text-lg font-medium'>{item.name}</p>
                                <p className='text-gray-600 text-sm'>{item.speciality}</p>
                            </div>
                        </div>
                    ))}</>:<>
                    <div className='flex justify-center items-center w-full text-center text-gray-500 py-10 col-span-full font-medium'>
                Doctors Not Available At this moment!
            </div>
                    </>}
                </div>
            </div>
        </div>
    );
};

export default Doctors;