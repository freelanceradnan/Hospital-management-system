import { NavLink, Outlet } from 'react-router-dom';
import { User, Calendar, Video, CreditCard, FileText, Activity, LogOut } from 'lucide-react';
import { signOut } from 'firebase/auth';
import { auth } from '../../Firebase/Firebase';

const UserDashboard = () => {
   
    const navItems = [
        { path: "/my-dashboard/myAccount", label: "Profile Management", icon: User },
        { path: "/my-dashboard/myAppointment", label: "Appointments", icon: Calendar },
        { path: "/my-dashboard/telehealth", label: "Telehealth Portal", icon: Video },
        { path: "/my-dashboard/billings", label: "Billing & Insurance", icon: CreditCard },
        { path: "/my-dashboard/myrecords", label: "Medical Records", icon: FileText },
        
    ];

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800 lg:flex">
    {/* Sidebar Container */}
   
        <aside className="lg:flex lg:w-90 bg-white border-r border-slate-200/80 flex-col justify-between py-6 ">
        <div>
           
            {/* Navigation Menu */}
            <nav className="space-y-3 px-4">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) => `
                                flex items-center gap-3.5 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 group
                                ${isActive 
                                    ? 'bg-indigo-50 text-indigo-600 shadow-sm shadow-indigo-100/50' 
                                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                                }
                            `}
                        >
                            {({ isActive }) => (
                                <>
                                    <Icon size={18} className={isActive ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-600 transition-colors'} />
                                    {item.label}
                                </>
                            )}
                       
                        </NavLink>
                    );
                })}
                 <NavLink
                            className={({ isActive }) => `
                                flex items-center gap-3.5 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 group
                            `}
                        >
                           
                            <button onClick={()=>signOut(auth)} className='text-slate-500 hover:bg-slate-50 hover:text-slate-900 flex gap-2 justify-center items-center'>
                                 <LogOut />
                                Logout</button>
                            </NavLink>
            </nav>
        </div>
    </aside>
   

    {/* Main Content Area */}
    {/* Added 'lg:ml-72' to offset the fixed sidebar width */}
    <main className="min-h-screen flex flex-col w-full">
        <div className="flex-1 max-w-7xl w-full mx-auto">
            <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-6 min-h-[calc(100vh-5rem)]">
                <Outlet />
            </div>
        </div>
    </main>
</div>
    );
};

export default UserDashboard;