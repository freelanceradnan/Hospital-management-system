import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetAllCategoriesQuery, useGetAllDoctorsQuery } from '../../Feature/ApiSlice';

const DoctorManagement = () => {
    const navigate = useNavigate();
    const { data: AllDoctors } = useGetAllDoctorsQuery();
    const { data: AllCategories } = useGetAllCategoriesQuery();
    const [searchData, setSearchData] = useState("");

    
    const activeDoctor = useMemo(() => {
        return AllDoctors?.filter(doc => doc.isActive === true);
    }, [AllDoctors]);

    const filteredData = () => {
        if (!AllDoctors) return [];
        if (searchData.trim() === "") { 
            return AllDoctors;
        } else {
            return AllDoctors.filter(c => c.name.toLowerCase().includes(searchData.toLowerCase()));
        }
    };

    return (
        <div className=' bg-gray-50 min-h-screen flex flex-col gap-2 text-gray-800 font-sans'>
            
            {/* Header section */}
            <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-2 rounded-xl shadow-sm border border-gray-100'>
                <div>
                    <h2 className='text-2xl font-bold text-slate-800'>Doctor Management</h2>
                    <p className='text-sm text-slate-500 mt-0.5'>Manage, search, and monitor all registered doctors.</p>
                </div>
                <div className='flex items-center gap-3'>
                    <button 
                        className='bg-blue-600 hover:bg-blue-700 transition text-white py-2 px-4 rounded-lg font-medium shadow-sm flex items-center gap-2' 
                        onClick={() => navigate('/admin-dashboard/addDoctor')}
                    >
                        <span>＋</span> Add New Doctor
                    </button>
                    <button className='bg-white hover:bg-gray-50 text-gray-700 transition py-2 px-4 rounded-lg font-medium border border-gray-300 shadow-sm'>
                        Export Data
                    </button>
                </div>
            </div>

            {/* Counter Cards */}
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
                <div className='bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between min-h-[110px]'>
                    <p className='text-gray-500 font-medium text-sm uppercase tracking-wider'>Total Doctors</p>
                    <h2 className='text-3xl font-bold text-gray-900 mt-2'>{AllDoctors?.length || 0}</h2>
                </div>
                <div className='bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between min-h-[110px]'>
                    <p className='text-emerald-600 font-medium text-sm uppercase tracking-wider'>Available Doctors</p>
                    <h2 className='text-3xl font-bold text-emerald-700 mt-2'>{activeDoctor?.length || 0}</h2>
                </div>
                <div className='bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between min-h-[110px]'>
                    <p className='text-rose-600 font-medium text-sm uppercase tracking-wider'>Unavailable Doctors</p>
                    <h2 className='text-3xl font-bold text-rose-700 mt-2'>{(AllDoctors?.length - activeDoctor?.length) || 0}</h2>
                </div>
                <div className='bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between min-h-[110px]'>
                    <p className='text-amber-600 font-medium text-sm uppercase tracking-wider'>Total Categories</p>
                    <h2 className='text-3xl font-bold text-amber-700 mt-2'>{AllCategories?.length || 0}</h2>
                </div>
            </div>

            {/* Sub-header & Search bar */}
            <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white p-4 rounded-xl border border-gray-200 shadow-sm'>
                <h3 className='text-gray-700 font-semibold text-lg'>
                    Showing {filteredData()?.length} Result{filteredData()?.length !== 1 ? 's' : ''}
                </h3>
                <div className='relative w-full md:w-80'>
                    <input 
                        type="search" 
                        className='w-full border border-gray-300 rounded-lg pl-4 pr-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition shadow-sm' 
                        placeholder='Search doctor by name...' 
                        value={searchData}
                        onChange={(e) => setSearchData(e.target.value)}
                    />
                </div>
            </div>

            {/* Doctors List / Table Layout */}
            <div className='bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden'>
                {filteredData()?.length > 0 ? (
                    <div className='flex flex-col divide-y divide-gray-100'>
                        {/* Table Header Row */}
                        <div className='flex justify-between items-center bg-gray-50 px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider'>
                            <div className='w-2/5'>Doctor Name</div>
                            <div className='w-2/5'>Category</div>
                            <div className='w-1/5 text-right'>Actions</div>
                        </div>

                        {/* List Items */}
                        {filteredData().map((doc) => {
                            const activeCategory = AllCategories?.find(c => c.id == doc.categoryId);

                            return (
                                <div key={doc.id || doc._id} className='flex justify-between items-center px-6 py-4 hover:bg-gray-50 transition group'>
                                    {/* Name */}
                                    <div className='w-2/5 font-medium text-gray-900 group-hover:text-blue-600 transition'>
                                        {doc.name}
                                    </div>
                                    
                                    {/* Category Status */}
                                    <div className='w-2/5'>
                                        <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${activeCategory ? 'bg-blue-50 text-blue-700' : 'bg-gray-100 text-gray-600'}`}>
                                            {activeCategory?.name || "No Category"}
                                        </span>
                                    </div>
                                    
                                    {/* Action Buttons */}
                                    <div className='w-1/5 flex items-center justify-end gap-4 text-sm font-medium'>
                                        <button className="text-blue-600 hover:text-blue-800 transition">
                                            Edit
                                        </button>
                                        <button className="text-red-500 hover:text-red-700 transition">
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    /* Empty State UI */
                    <div className='flex flex-col items-center justify-center p-12 text-center'>
                        <div className='text-4xl text-gray-300 mb-2'>🔍</div>
                        <h3 className='text-gray-700 font-semibold text-lg'>No Doctors Found</h3>
                        <p className='text-gray-500 text-sm max-w-sm mt-1'>We couldn't find any search result matching "{searchData}". Try checking your spelling.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DoctorManagement;