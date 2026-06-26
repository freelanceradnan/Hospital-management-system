import { Route, Routes, useLocation } from "react-router-dom"
import Home from "./Pages/Home/Home"
import Doctors from './Pages/Doctors/Doctors';
import About from "./Pages/About/About";
import Contact from './Pages/Contact/Contact';
import Login from "./Pages/Login/Login";

import Navbar from "./Components/Navbar/Navbar";
import Footer from './Components/Footer/Footer'
import LoginPrivate from "./Components/LoginPrivate/LoginPrivate";
import Notfound from "./Pages/NotFound/Notfound";


import MyProfileManagement from './Components/UserDashboard/MyProfileManagement';
import MyTelehealth from "./Components/UserDashboard/MyTelehealth";
import MyBillings from "./Components/UserDashboard/MyBillings";
import MyRecords from "./Components/UserDashboard/MyRecords";
import MyAppointment from "./Components/UserDashboard/MyAppointments";
import MyDashboard from './Pages/MyDashboard/MyDashboard'
import UserPrivate from "./Components/UserPrivate/UserPrivate";
import DoctorAppointment from "./Pages/DoctorAppointement/DoctorAppointment";
import AdminLogin from "./Pages/AdminLogin/AdminLogin";
import AdminDashboard from "./Pages/AdminDashboard/AdminDashboard";
import DashboardOverview from "./Components/AdminDashboard/DashboardOverview";
import DoctorManagement from "./Components/AdminDashboard/DoctorManagement";
import AppointmentManagment from "./Components/AdminDashboard/AppointmentManagment";
import PatientManagement from "./Components/AdminDashboard/PatientManagement";
import PaymentManagement from "./Components/AdminDashboard/PaymentManagement";
import Settings from "./Components/AdminDashboard/AdminSettings";
import AdminSettings from "./Components/AdminDashboard/AdminSettings";






function App() {
const location=useLocation()
const allroutes = ["/", "/doctors", "/login",'/about','/contact','/my-dashboard','/my-dashboard/myAccount','/my-dashboard/myAppointment','/my-dashboard/telehealth','/my-dashboard/billings','/my-dashboard/myrecords','/my-dashboard/myrecords','/admin-login'];
const isKnownPath = allroutes.some((path) => location.pathname === path)||
location.pathname.startsWith('/doctors')||
location.pathname.startsWith('/appointment')
const isAdminPath = location.pathname.startsWith('/admin-dashboard');
const showFooter = isKnownPath && !isAdminPath;

  return (
    
  <>
<div className={!isAdminPath ? 'mx-4 sm:mx-[10%]' : 'mx-0 sm:mx-0'}>
  {/* navbar */}
 {showFooter &&  <Navbar/>}
  {/* routes */}
  <Routes>
  <Route path="/" element={<Home/>}/>
  <Route path="/doctors" element={<Doctors/>}/>
  <Route path="/doctors/:spaciality" element={<Doctors/>}/>
  <Route path="/appointment/:id" element={<DoctorAppointment/>}/>
  <Route path="/login" element={
    <LoginPrivate>
      <Login/>
    </LoginPrivate>
  }/>
  <Route path="/admin-dashboard" element={<AdminDashboard/>}>
  <Route path="" element={<DashboardOverview/>}/>
  <Route path="DoctorManagement" element={<DoctorManagement/>}/>
  <Route path="AppointmentManagement" element={<AppointmentManagment/>}/>
  <Route path="PatientManagement" element={<PatientManagement/>}/>
  <Route path="PaymentManagement" element={<PaymentManagement/>}/>
  <Route path="AdminSettings" element={<AdminSettings/>}/>

  </Route>
  <Route path="/admin-login" element={<AdminLogin/>}/>
  <Route path="/about" element={<About/>}/>
  <Route path="/contact" element={<Contact/>}/>
  <Route path="/my-dashboard" element={
    <UserPrivate>
      <MyDashboard/>
    </UserPrivate>
    }>
  <Route path="myAccount" element={<MyProfileManagement/>}/>
  <Route path="myAppointment" element={<MyAppointment/>}/>
  <Route path="telehealth" element={<MyTelehealth/>}/>
  <Route path="billings" element={<MyBillings/>}/>
  <Route path="myrecords" element={<MyRecords/>}/>
  </Route>
  <Route path="/my-appointment" element={<MyAppointment/>}/>
  <Route path="/appointment/:id" element={<MyAppointment/>}/>
  
  <Route path="*" element={<Notfound/>}/>
 </Routes>
 {/* footer */}
 {showFooter &&
 <Footer/>
 }
 </div>
  </>
  )
}

export default App
