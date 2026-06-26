import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../Firebase/Firebase';
import { 
  BanknoteArrowDown, 
  ChartNoAxesGantt, 
  ClipboardClock, 
  LogOut, 
  Settings, 
  SquareKanban, 
  UsersRound,
  ShieldCheck,
  Menu,
  X,
  Bell,
  Search
} from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activePath, setActivePath] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Sync active state with URL path
  useEffect(() => {
    setActivePath(location.pathname);
    setIsMobileMenuOpen(false); // Close mobile sidebar on navigation
  }, [location.pathname]);

  const handleSignout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  const dashboardItems = [
    { name: "Overview", path: "/admin-dashboard", exact: true, icon: <SquareKanban className="w-5 h-5" /> },
    { name: "Doctors", path: "/admin-dashboard/DoctorManagement", icon: <ChartNoAxesGantt className="w-5 h-5" /> },
    { name: "Appointments", path: "/admin-dashboard/AppointmentManagement", icon: <ClipboardClock className="w-5 h-5" /> },
    { name: "Patients", path: "/admin-dashboard/PatientManagement", icon: <UsersRound className="w-5 h-5" /> },
    { name: "Payments", path: "/admin-dashboard/PaymentManagement", icon: <BanknoteArrowDown className="w-5 h-5" /> },
    { name: "Settings", path: "/admin-dashboard/AdminSettings", icon: <Settings className="w-5 h-5" /> }
  ];

  // Extracted Sidebar Content to avoid duplication between Mobile and Desktop versions
  const SidebarContent = () => (
    <div className="h-full flex flex-col justify-between bg-[#ffffff]">
      <div>
        {/* Brand Logo Header */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg text-white">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-bold text-slate-900 tracking-tight leading-tight text-xl">Pes<span>Cripto</span></h1>
              <span className="text-xs text-slate-500 font-medium">Admin Management Suite</span>
            </div>
          </div>
          {/* Mobile Close Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(false)} 
            className="md:hidden p-1 rounded-lg hover:bg-slate-100 text-slate-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="p-4">
          <ul className="space-y-1.5">
            {dashboardItems.map((item, index) => {
              const isActive = item.exact 
                ? activePath === item.path || activePath === "/admin-dashboard/"
                : activePath.startsWith(item.path);

              return (
                <li key={index}>
                  <Link 
                    to={item.path === "/admin-dashboard" ? "" : item.path} 
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium text-sm border
                      ${isActive 
                        ? 'bg-blue-50 text-blue-600 border-blue-100 shadow-sm' 
                        : 'text-slate-500 border-transparent hover:bg-slate-50 hover:text-slate-800'
                      }`}
                  >
                    <span className={isActive ? 'text-blue-600' : 'text-slate-400'}>
                      {item.icon}
                    </span>
                    <span>{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* Sidebar Footer / Logout */}
      <div className="p-4 border-t border-slate-100">
        <button 
          onClick={handleSignout}
          className="w-full flex items-center justify-between gap-2 px-4 py-3 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 transition-colors duration-200 rounded-xl"
        >
          <div className="flex items-center gap-3">
            <LogOut className="w-5 h-5" />
            <span>Log out</span>
          </div>
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-slate-50 text-slate-800 font-sans overflow-hidden relative">
      
      {/* 1. DESKTOP SIDEBAR (Hidden on mobile, visible on md and up) */}
      <aside className="hidden md:block w-60 bg-white border-r border-slate-200 shrink-0 shadow-sm">
        <SidebarContent />
      </aside>

      {/* 2. MOBILE SIDEBAR DRAWER (Slide out overlay) */}
      <div className={`md:hidden fixed inset-0 z-50 transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        {/* Backdrop overlay */}
        <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
        
        {/* Drawer container */}
        <aside className={`absolute top-0 left-0 bottom-0 w-72 bg-white flex flex-col shadow-xl transition-transform duration-300 transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <SidebarContent />
        </aside>
      </div>

      {/* 3. MAIN CONTENT CANVAS */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto w-full">
        {/* Responsive Top Bar */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center px-4 sm:px-8 shrink-0 sticky top-0 z-30 w-full md:block">
          <div className="flex items-center gap-3">
            {/* Mobile Menu Trigger Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 -ml-2 rounded-lg text-slate-600 hover:bg-slate-100 focus:outline-none"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
          
     <div className="flex items-center justify-between gap-14 p-4 w-full">
  
  <div className='relative mx-2'>
    <Search className='absolute top-2 left-2 text-gray-400'/>
    <input 
      type="text" 
      name="search" 
      id="search" 
      placeholder="Search anything here...." 
      className="rounded border border-gray-100 px-3 py-1.5 focus:outline-none focus:border-blue-500 md:min-w-[350px] pl-10"
    />
  </div>


  <div className="flex items-center gap-4">
    <div className="cursor-pointer hover:opacity-80">
      <Bell />
    </div>
    <div className="rounded bg-gray-100 px-3 py-1 text-sm font-medium">
      Admin
    </div>
  </div>
</div>
        </header>

        {/* Dynamic Outlet View Frame */}
        <div className="sm:p-3 max-w-7xl w-full mx-auto p-6">
          <Outlet />
        </div>
      </main>

    </div>
  );
};

export default AdminDashboard;