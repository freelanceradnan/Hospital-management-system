import { Route, Routes, useLocation } from "react-router-dom"
import Home from "./Pages/Home/Home"
import Doctors from './Pages/Doctors/Doctors';
import About from "./Pages/About/About";
import Contact from './Pages/Contact/Contact';
import Login from "./Pages/Login/Login";
import MyProfile from "./Pages/MyProfile/MyProfile";
import MyAppointment from "./Pages/MyAppointment/MyAppointment";
import Navbar from "./Components/Navbar/Navbar";
import Footer from './Components/Footer/Footer'
import LoginPrivate from "./Components/LoginPrivate/LoginPrivate";
import Notfound from "./Pages/NotFound/Notfound";

function App() {
const location=useLocation()
const allroutes = ["/", "/doctors", "/login",'/about','/contact'];
const isKnownPath = allroutes.some((path) => location.pathname === path)||
location.pathname.startsWith('/doctors')||
location.pathname.startsWith('/appointment')
const isAdminPath = location.pathname.startsWith('/admin-dashboard');
const showFooter = isKnownPath && !isAdminPath;

  return (
  <>
 <div className="mx-4 sm:mx-[10%]">
  {/* navbar */}
 {showFooter &&  <Navbar/>}
  {/* routes */}
  <Routes>
  <Route path="/" element={<Home/>}/>
  <Route path="/doctors" element={<Doctors/>}/>
  <Route path="/doctors/:spaciality" element={<Doctors/>}/>
  <Route path="/login" element={
    <LoginPrivate>
      <Login/>
    </LoginPrivate>
  }/>
  <Route path="/about" element={<About/>}/>
  <Route path="/contact" element={<Contact/>}/>
  <Route path="/my-profile" element={<MyProfile/>}/>
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
