import { Route, Routes } from "react-router-dom"
import Home from "./Pages/Home/Home"
import Doctors from './Pages/Doctors/Doctors';
import About from "./Pages/About/About";
import Contact from './Pages/Contact/Contact';
import Login from "./Pages/Login/Login";
import MyProfile from "./Pages/MyProfile/MyProfile";
import MyAppointment from "./Pages/MyAppointment/MyAppointment";
import Navbar from "./Components/Navbar/Navbar";


function App() {


  return (
  <>
 <div className="mx-4 sm:mx-[10%]">
  {/* navbar */}
  <Navbar/>
  {/* routes */}
  <Routes>
  <Route path="/" element={<Home/>}/>
  <Route path="/doctors" element={<Doctors/>}/>
  <Route path="/doctors/:spaciality" element={<Doctors/>}/>
  <Route path="/login" element={<Login/>}/>
  <Route path="/about" element={<About/>}/>
  <Route path="/contact" element={<Contact/>}/>
  <Route path="/my-profile" element={<MyProfile/>}/>
  <Route path="/my-appointment" element={<MyAppointment/>}/>
  <Route path="/appointment/:id" element={<MyAppointment/>}/>
  
  <Route path="*" element={<h2>This is an error page</h2>}/>
 </Routes>
 </div>
  </>
  )
}

export default App
