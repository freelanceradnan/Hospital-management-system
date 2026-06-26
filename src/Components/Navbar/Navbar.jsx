import React, { useContext, useEffect, useState } from "react";
import { assets } from "./../../assets/assets";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { MainContext } from "../../Contexts/MainContext";
import { signOut } from "firebase/auth";
import { auth } from "../../Firebase/Firebase";
import { Hamburger, Menu } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { islogin, role, currentUser, loading } = useContext(MainContext);
  //redirect to admin dashboard
useEffect(() => {
    if (!loading && islogin && role === 'admin') {
      navigate('/admin-dashboard');
    }
  }, [role, islogin, loading, navigate]);
  useEffect(() => {});
  if (loading) {
    return (
      <div className="w-full flex items-center justify-between py-4 mb-5 border-b border-b-gray-200 animate-pulse">
        <div className="h-8 w-40 bg-zinc-200 rounded-md"></div>

        <ul className="hidden lg:flex items-center gap-6">
          <li className="h-4 w-14 bg-zinc-200 rounded"></li>
          <li className="h-4 w-24 bg-zinc-200 rounded"></li>
          <li className="h-4 w-16 bg-zinc-200 rounded"></li>
          <li className="h-4 w-16 bg-zinc-200 rounded"></li>
        </ul>

        <div className="flex items-center gap-4">
          <div className="h-10 w-32 bg-zinc-200 rounded-full hidden md:block"></div>

          <div className="h-8 w-8 bg-zinc-200 rounded-full lg:hidden"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="text-sm py-3 mb-5 border-b border-b-gray-400 sticky top-0 bg-white z-99">
      <div className="flex items-center justify-between">
        <Link to="/">
          <img src={assets.logo} alt="" className="w-44 cursor-pointer" />
        </Link>

        <ul className="md:flex items-start gap-5 font-medium uppercase hidden justify-center mt-3 md:mt-0 ">
          <NavLink to="/">
            <li className="py-1">HOME</li>
            <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
          </NavLink>
          <NavLink to="/doctors">
            <li className="py-1">All Doctors</li>
            <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
          </NavLink>
          <NavLink to="/about">
            <li className="py-1">ABOUT</li>
            <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
          </NavLink>
          <NavLink to="/contact">
            <li className="py-1">Contact</li>
            <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
          </NavLink>
        </ul>
        <div className="flex items-center gap-5 justify-center">
          {islogin && currentUser ? (
            <div>
              <div className="flex items-center gap-2 cursor-pointer group relative">
                <img
                  src={assets.userpng}
                  alt=""
                  className="w-8 rounded-full"
                />
                
                <img src={assets.dropdown_icon} alt="" className="w-2.5" />
                
                <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block ">
                  <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">
                    <p
                      className="hover:text-black cursor-pointer"
                      onClick={() => navigate("my-dashboard/myAccount")}
                    >
                      My Dashboard
                    </p>
                    <p
                      className="hover:text-black cursor-pointer"
                      onClick={() => navigate("my-appointment")}
                    >
                      My Appointments
                    </p>
                    <p
                      className="hover:text-black cursor-pointer"
                      onClick={() => signOut(auth)}
                    >
                      Logout
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <button
                className="bg-primary text-white px-8 py-2 rounded-full font-light"
                onClick={() => navigate("/login",scrollTo(0,0))}
              >
                Login
              </button>
            </div>
          )}
          {/* mobile-menu */}
          <div>
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(true)}>
                <img src={assets.menuIcon} alt="" className="h-6 w-6" />
              </button>
            </div>
            <div
              className={`fixed top-0 left-0 w-full h-screen bg-white text-base flex flex-col md:hidden items-center justify-center gap-6 font-medium text-gray-800 transition-all duration-500 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
            >
              <button
                className="absolute top-4 right-4"
                onClick={() => setIsMenuOpen(false)}
              >
                <img src={assets.closeicon} alt="" />
              </button>
              {/* 
        {navLinks.map((link, i) => (
          <Link key={i} to={link.path} onClick={() => setIsMenuOpen(false)}>
            {link.name}
          </Link>
        ))} */}
              {/* {isListing ? (
          <Link
            to="/userDashboard"
            className={`text-white bg-blue-500 rounded-sm p-1`}
            onClick={() => setIsMenuOpen(false)}
          >
            Dashboard
          </Link>
        ) : (
          <>
            {isLogin && role == "user" && (
              <Link
                to="/listing"
                className="text-white bg-blue-500 rounded-sm p-1"
                onClick={() => setIsMenuOpen(false)}
                state={{ owner: currentUser?.email }}
              >
                Listing
              </Link>
            )}
          </>
        )} */}
              {/* <button className="border px-4 py-1 text-sm font-light rounded-full cursor-pointer transition-all">
                        Dashboard
                    </button> */}

              <ul className="flex flex-col items-center justify-center gap-5 font-medium uppercase text-center mt-3 md:mt-0 w-full">
                <NavLink to="/" onClick={() => setIsMenuOpen(false)}>
                  <li className="py-1">HOME</li>
                  <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
                </NavLink>
                <NavLink to="/doctors" onClick={() => setIsMenuOpen(false)}>
                  <li className="py-1">All Doctors</li>
                  <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
                </NavLink>
                <NavLink to="/about" onClick={() => setIsMenuOpen(false)}>
                  <li className="py-1">ABOUT</li>
                  <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
                </NavLink>
                <NavLink to="/contact" onClick={() => setIsMenuOpen(false)}>
                  <li className="py-1">Contact</li>
                  <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
                </NavLink>
              </ul>

              {!currentUser && !islogin ? (
                <button
                  className="bg-black text-white px-8 py-2 rounded-full transition-all duration-500"
                  onClick={() => {
                    setIsMenuOpen(false);
                    navigate("/login");
                    scrollTo(0,0)
                  }}
                >
                  Login
                </button>
              ) : (
                <button
                  className="bg-black text-white px-8 py-2 rounded-full transition-all duration-500"
                  onClick={() => {
                    setIsMenuOpen(false);
                    navigate("/my-dashboard/myAccount");
                  }}
                >
                  Dashboard
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
