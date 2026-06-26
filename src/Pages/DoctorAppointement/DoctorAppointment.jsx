import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { doc } from "firebase/firestore";
import { db } from "./../../Firebase/Firebase";
import { MainContext } from "../../Contexts/MainContext";
import { toast } from "react-toastify";
import { useGetAllDoctorsQuery } from "../../Feature/ApiSlice";

const DoctorAppointment = () => {
  const { data: allDoctors, isLoading } = useGetAllDoctorsQuery();
  const [doctors, setDoctors] = useState([]);
  const [appointmentdata, setAppointementData] = useState({});
  const { islogin, role, currentUser, loading } = useContext(MainContext);
  const [selectedDay, setSelectedDay] = useState("Mon");
  const { id } = useParams();
  const [selectedTime, setSelectedTime] = useState("8.00 am");

   useEffect(()=>{
   if(allDoctors){
    const singleDoctor=allDoctors.find(c=>c.id==id)
    setAppointementData(singleDoctor)
   }
   },[allDoctors])
  const days = [
    { day: "Mon", date: "10" },
    { day: "Tue", date: "11" },
    { day: "Wed", date: "12" },
    { day: "Thu", date: "13" },
    { day: "Fri", date: "14" },
    { day: "Sat", date: "15" },
    { day: "Sun", date: "16" },
  ];

  const times = ["8.00 am", "9.00 am", "10.00 am"];
  if(isLoading){
    return <div className="mx-auto mt-10 font-sans animate-pulse">
 
  <div className="flex flex-col md:flex-row gap-6 items-start justify-between w-full items-stretch">
    
   
    <div className="w-full md:w-64 h-64 bg-gray-200 rounded-2xl flex-shrink-0"></div>

    
    <div className="flex-1 border border-gray-200 p-6 rounded-2xl bg-white w-full flex flex-col gap-4">
     
      <div className="w-2/3 h-8 bg-gray-300 rounded-md"></div>

      
      <div className="flex items-center gap-2 mt-1 mb-2">
        <div className="w-16 h-6 bg-gray-200 rounded-full"></div>
        <div className="w-24 h-6 bg-gray-200 rounded-full"></div>
        <div className="w-12 h-6 bg-gray-200 rounded-md"></div>
      </div>

     
      <div className="flex flex-col gap-2 mt-2">
        <div className="w-16 h-4 bg-gray-300 rounded"></div>
        <div className="w-full h-3 bg-gray-200 rounded"></div>
        <div className="w-5/6 h-3 bg-gray-200 rounded"></div>
      </div>

     
      <div className="pt-4 border-t border-gray-100 flex justify-between items-center mt-auto">
        <div className="w-28 h-4 bg-gray-200 rounded"></div>
        <div className="w-16 h-6 bg-gray-300 rounded"></div>
      </div>
    </div>
  </div>

  
  <div className="mt-8 md:pl-70">
   
    <div className="w-32 h-6 bg-gray-300 rounded mb-4"></div>

   
    <div className="flex gap-3 overflow-x-auto pb-2">
      {Array.from({ length: 7 }).map((_, index) => (
        <div
          key={index}
          className="flex flex-col items-center justify-center min-w-[60px] h-[76px] rounded-full border border-gray-200 bg-gray-50 flex-shrink-0 gap-2"
        >
          <div className="w-6 h-3 bg-gray-200 rounded"></div>
          <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
        </div>
      ))}
    </div>

   
    <div className="flex gap-3 mt-6 overflow-x-auto pb-2">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="w-20 h-8 bg-gray-200 rounded-full border border-gray-200 flex-shrink-0"
        ></div>
      ))}
    </div>

   
    <div className="mt-8">
      <div className="w-full md:w-56 h-12 bg-gray-300 rounded-full"></div>
    </div>
  </div>
</div>
  }
  return (
    <div className="mx-auto mt-6 font-sans">
    
      <div className="flex flex-col md:flex-row gap-6 items-start justify-between w-full items-stretch">

        <div className="w-full md:w-64 bg-[#5463ec] rounded-2xl overflow-hidden shadow-sm flex-shrink-0">
          <img
            className="w-full h-64 md:h-full object-cover object-top hover:scale-105 transition-transform duration-300"
            src={appointmentdata.image}
            alt={appointmentdata.name}
          />
        </div>

        {/* Doctor Info Details */}
        <div className="flex-1 border border-gray-200 p-4 rounded-2xl bg-white shadow-sm w-full">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 flex items-center gap-2">
            {appointmentdata.name}
            <span className="inline-block w-5 h-5 text-blue-500">
              <svg fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M6.267 3.455a.75.75 0 00-.708.522L3.547 10.12l1.416.471.492-1.478h4.19l.493 1.478 1.415-.471-2.011-6.035a.75.75 0 00-.708-.522H6.267zm-.11 4.143L7.5 3.753l1.343 4.025H6.156z"
                  clipRule="evenodd"
                />
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </h2>

          <div className="flex items-center gap-2 mt-1 mb-4 text-gray-600">
            <p className="text-sm font-medium bg-blue-50 text-blue-600 px-2.5 py-0.5 rounded-full">
              {appointmentdata.degree}
            </p>
            <p className="text-sm font-medium border border-gray-200 px-2.5 py-0.5 rounded-full">
              {appointmentdata.speciality}
            </p>
            <span className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded border">
              {appointmentdata.experience}
            </span>
          </div>

          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-800 mb-1">About</h4>
            <p className="text-gray-500 text-sm leading-relaxed">
              {appointmentdata.about}
            </p>
          </div>

          <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
            <p className="text-gray-500 font-medium text-sm">
              Appointment fee:
            </p>
            <p className="text-xl font-bold text-gray-900">
              ${appointmentdata.fees}
            </p>
          </div>
        </div>
      </div>

      {/* Booking Layout Wrapper */}
      <div className="mt-6 md:pl-70">
        <h3 className="text-lg font-bold text-gray-700 mb-4">Booking slots</h3>

        {/* Days Carousel/Row */}
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin flex-wrap">
          {days.map((item) => {
            const active = selectedDay === item.day;
            return (
              <button
                key={item.day}
                onClick={() => setSelectedDay(item.day)}
                className={`flex flex-col items-center justify-center min-w-[60px] py-4 rounded-full border transition-all ${
                  active
                    ? "bg-[#5f6fff] border-blue-600 text-white"
                    : "border-gray-200 text-gray-500 hover:bg-gray-50"
                }`}
              >
                <span className="text-xs uppercase font-medium">
                  {item.day}
                </span>
                <span className="text-base font-bold mt-0.5">{item.date}</span>
              </button>
            );
          })}
        </div>

        {/* Hours Selection Row */}
        <div className="flex gap-3 mt-6 overflow-x-auto pb-2">
          {times.map((time) => {
            const active = selectedTime === time;
            return (
              <button
                key={time}
                onClick={() => setSelectedTime(time)}
                className={`py-2 px-5 text-xs font-semibold rounded-full border tracking-wide whitespace-nowrap transition-all ${
                  active
                    ? "bg-[#5f6fff] border-blue-600 text-white"
                    : "border-gray-200 text-gray-500 hover:bg-gray-50"
                }`}
              >
                {time}
              </button>
            );
          })}
        </div>

        {/* Action Call Button */}
        <div className="mt-6">
          <button className="w-full md:w-auto px-12 py-3.5 bg-[#5f6fff] hover:bg-blue-700 text-white text-sm font-semibold rounded-full shadow-md shadow-blue-100 hover:shadow-lg transition-all duration-150">
            Book An Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorAppointment;
