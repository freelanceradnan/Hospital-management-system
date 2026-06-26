import React from 'react';
import { BriefcaseMedical, ClipboardClock, HandCoins, TrendingUp, Upload } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { PieChart, Pie, Cell } from "recharts";
import { RechartsDevtools } from '@recharts/devtools';

const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#14b8a6'];

const DashboardOverview = () => {
  const data = [
    { name: 'Total Users', value: 2500 },
    { name: 'Total Doctors', value: 125 },
    { name: 'Total Revenue', value: 8900 },
    { name: 'Total Appointments', value: 1400 },
  ];

  return (
    <div className=" bg-slate-50 min-h-screen flex flex-col gap-1 font-sans">
      
      {/* 1. Header Part */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Welcome back, Admin!</h2>
          <p className="text-sm text-slate-500 mt-0.5">Here is the latest update, check it now!</p>
        </div>

        <div className="flex items-center gap-3">
          <select 
            name="timeframe" 
            id="timeframe" 
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500 cursor-pointer"
          >
            <option value="7days">Week</option>
            <option value="30days">Month</option>
            <option value="1year">Year</option>
          </select>

          <button className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 active:scale-95">
            <Upload size={16} />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* 2. Top Grid Cards */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full'>
        
        {/* CARD 1: Total Users */}
        <div className='p-5 rounded-2xl bg-white shadow-sm border border-slate-100 flex flex-col justify-between gap-4'>
          <div>
            <div className='flex items-center gap-2 text-sm font-semibold text-slate-500'>
              <div className='flex items-center justify-center rounded-xl bg-blue-50 p-2 text-blue-600'>
                <TrendingUp size={18}/>
              </div>
              <span>Total Users</span>
            </div>
            <p className='text-3xl font-bold text-slate-800 mt-3 flex items-baseline gap-2'>
              2,500
              <span className='px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-blue-600'>+10%</span>
            </p>
          </div>
          <div>
            <p className='text-xs text-slate-400 mb-2'>Data obtainer total accounts in last 7 days</p>
            <div className='flex justify-between items-center gap-3'>
              <div className='flex-1 h-2 bg-slate-100 rounded-full overflow-hidden'>
                <div className='w-[50%] h-full bg-blue-500 rounded-full'></div>
              </div>
              <span className='font-bold text-xs text-slate-600 whitespace-nowrap'>1,300 Today</span>
            </div>
          </div>
        </div>

        {/* CARD 2: Total Appointments */}
        <div className='p-5 rounded-2xl bg-white shadow-sm border border-slate-100 flex flex-col justify-between gap-4'>
          <div>
            <div className='flex items-center gap-2 text-sm font-semibold text-slate-500'>
              <div className='flex items-center justify-center rounded-xl bg-purple-50 p-2 text-purple-600'>
                <ClipboardClock size={18}/>
              </div>
              <span>Total Appointments</span>
            </div>
            <p className='text-3xl font-bold text-slate-800 mt-3 flex items-baseline gap-2'>
              1,400
              <span className='px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-50 text-purple-600'>+10%</span>
            </p>
          </div>
          <div className='flex justify-between items-end gap-3'>
            <div className='flex items-end gap-1 flex-shrink-0 h-10'>
              <div className='h-6 bg-purple-200 w-2 rounded-t-sm'></div>
              <div className='h-2 bg-purple-300 w-2 rounded-t-sm'></div>
              <div className='h-4 bg-purple-400 w-2 rounded-t-sm'></div>
              <div className='h-8 bg-purple-500 w-2 rounded-t-sm'></div>
              <div className='h-5 bg-purple-200 w-2 rounded-t-sm'></div>
              <div className='h-10 bg-purple-600 w-2 rounded-t-sm'></div>
            </div>
            <p className='text-xs text-slate-400 leading-tight text-right'>
              Increase data by 500 inpatients in last 7 days
            </p>
          </div>
        </div>

        {/* CARD 3: Total Doctors */}
        <div className='p-5 rounded-2xl bg-white shadow-sm border border-slate-100 flex flex-col justify-between gap-4'>
          <div>
            <div className='flex items-center gap-2 text-sm font-semibold text-slate-500'>
              <div className='flex items-center justify-center rounded-xl bg-teal-50 p-2 text-teal-600'>
                <BriefcaseMedical size={18}/>
              </div>
              <span>Total Doctors</span>
            </div>
            <p className='text-3xl font-bold text-slate-800 mt-3 flex items-baseline gap-2'>
              125
              <span className='px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-50 text-teal-600'>+10%</span>
            </p>
          </div>
          <div>
            <p className='text-xs text-slate-400 mb-2'>Data obtainer total accounts in last 7 days</p>
            <div className='flex justify-between items-center gap-3'>
              <div className='flex-1 h-2 bg-slate-100 rounded-full overflow-hidden'>
                <div className='w-[75%] h-full bg-teal-500 rounded-full'></div>
              </div>
              <span className='font-bold text-xs text-slate-600 whitespace-nowrap'>5 New Today</span>
            </div>
          </div>
        </div>

        {/* CARD 4: Total Revenue */}
        <div className='p-5 rounded-2xl bg-white shadow-sm border border-slate-100 flex flex-col justify-between gap-4'>
          <div>
            <div className='flex items-center gap-2 text-sm font-semibold text-slate-500'>
              <div className='flex items-center justify-center rounded-xl bg-emerald-50 p-2 text-emerald-600'>
                <HandCoins size={18}/>
              </div>
              <span>Total Revenue</span>
            </div>
            <p className='text-3xl font-bold text-slate-800 mt-3 flex items-baseline gap-2'>
              $8,900
              <span className='px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-600'>+10%</span>
            </p>
          </div>
          <div className='flex flex-col gap-1.5 border-t border-slate-100 pt-2 text-xs'>
            <div className='flex justify-between w-full text-slate-500'>
              <span>Appointment Rev.</span>
              <span className="font-semibold text-slate-700">$4,500</span>
            </div>
            <div className='flex justify-between w-full text-slate-500'>
              <span>Services Rev.</span>
              <span className="font-semibold text-slate-700">$4,400</span>
            </div>
          </div>
        </div>

      </div>

      {/* 3. Lower Visualization Section */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch w-full'>
        
        {/* Analytics Charts Panel */}
        <div className='lg:col-span-2 bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row items-center gap-6'>
          
          {/* Bar Chart */}
          <div className='w-full md:w-[65%] h-[300px]'>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 12 }} />
                <YAxis tick={{ fill: '#64748b', fontSize: 12 }} />
                <Tooltip cursor={{ fill: '#f8fafc' }} />
                <Bar dataKey="value" fill="#3b82f6" radius={[6, 6, 0, 0]} activeBar={{ fill: '#2563eb' }} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Donut Pie Chart */}
          <div className='w-full md:w-[35%] flex flex-col items-center justify-center h-[300px] relative'>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  innerRadius="70%"
                  outerRadius="95%"
                  cornerRadius={6}
                  paddingAngle={5}
                  dataKey="value"
                  isAnimationActive={true}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            {/* Center Text for Donut Chart */}
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">Overview</span>
              <span className="text-xl font-bold text-slate-700">Metrics</span>
            </div>
          </div>

        </div>

        {/* 4. Live Activity Details Panel */}
        <div className='bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col gap-4'>
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <h3 className="font-bold text-slate-800 text-base">Live Activity Details</h3>
          </div>
          
          <div className="flex flex-col gap-3.5 overflow-y-auto max-h-[240px] pr-1">
            <div className="flex items-start gap-3 text-sm">
              <span className="mt-1 text-emerald-500 flex-shrink-0">🟢</span>
              <div>
                <p className="font-semibold text-slate-700">Adnan created Account</p>
                <span className="text-xs text-slate-400">Just now</span>
              </div>
            </div>
            
            <div className="flex items-start gap-3 text-sm">
              <span className="mt-1 text-emerald-500 flex-shrink-0">🟢</span>
              <div>
                <p className="font-semibold text-slate-700">Ridoy booking Appointment</p>
                <span className="text-xs text-slate-400">5 mins ago</span>
              </div>
            </div>
            
            <div className="flex items-start gap-3 text-sm">
              <span className="mt-1 text-emerald-500 flex-shrink-0">🟢</span>
              <div>
                <p className="font-semibold text-slate-700">Masud booking Sugar Test</p>
                <span className="text-xs text-slate-400">12 mins ago</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      <RechartsDevtools />
    </div>
  );
};

export default DashboardOverview;