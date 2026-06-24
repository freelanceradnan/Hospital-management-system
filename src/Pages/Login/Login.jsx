import React, { useState } from "react";
import { auth, db } from "../../Firebase/Firebase";
import { createUserWithEmailAndPassword, signInWithPopup, signInWithRedirect } from "firebase/auth";
import { toast } from "react-toastify";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { signInWithEmailAndPassword } from "firebase/auth/cordova";
import { Eye, EyeClosed, EyeOff } from "lucide-react";
import { assets } from "../../assets/assets";
import { GoogleAuthProvider } from "firebase/auth";
const AuthForm = () => {
  //change from with states
  const [state, setState] = useState("login");
  const [loading, setLoading] = useState(false);
  // Form input states
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [loginLoading,setLoginLoading]=useState(false)
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
//show password 
const [showPassword, setShowPassword] = useState(false);
//login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password,
      );
      if (auth.currentUser) {
        await setDoc(doc(db, "users", auth.currentUser.uid), {
          email: formData.email,
          role: "user",
          isActive: true,
          createdAt: new Date().toISOString()
        });
      }
      toast.success("Account create success!");
      setLoading(false);
    } catch (error) {
      let errorCode = error.code;
      let message;
      switch (errorCode) {
        case "auth/email-already-in-use":
          message = "Email Already Exists!";
          break;
        case "auth/invalid-email":
          message = "Invalid email Address";
          break;
        case "auth/weak-password":
          message = "Password should be strong!";
          break;
        case "auth/operation-not-allowed":
          message = "Signup is not available!Please contact Coustomer Service";
          break;
        case "auth/network-request-failed":
          message = "Network Error!Please checkout your internet connection";
          break;
        default:
          message = "signup not available in this moments!";
      }
      toast.error(message);
      setLoading(false);
    } finally {
      setFormData({
        fullName: "",
        email: "",
        password: "",
      });
    }
  };

//login section added
const loginHandler=async(e)=>{
  e.preventDefault();
  setLoginLoading(true)
  try {
    await signInWithEmailAndPassword(auth,formData.email,formData.password)
    toast.success('account login success!')
  } catch (error) {
    toast.error('login failure')
  }
  finally{
    setLoginLoading(false)
    setFormData({
      email:"",
      password:""
    })
  }
}
//google signup
const provider=new GoogleAuthProvider()
const signWithGoogle=async()=>{
try {
  const result=await signInWithPopup(auth,provider)
  const user=result.user
  if(user){
    const userRef = doc(db, 'users', user.uid);
     const userSnap = await getDoc(userRef);
     if(!userSnap.exists()){
       await setDoc(userRef, {
            email: user.email,
            role: "user",
            isActive: true,
            createdAt: new Date().toISOString()
          });
     }
     toast.success(state=='login'?`login success!`:`signup success!`)
  }
  
} catch (error) {
  toast.error(error.message)
}
}
  return (
    <div className="lg:grid lg:grid-cols-2 rounded-xl shadow-xl mt-10 lg:max-w-4xl mx-auto max-w-sm">
     <div className=" rounded-sm max-h-5xl hidden lg:block bg-blue-50">
    <div className="w-full flex justify-center items-center h-full">
      <img src={state=='login'?assets.doc9:assets.loginpng} alt="" className="w-[300px]"/>
    </div>
     </div>
     <div className="mx-auto flex justify-center w-full">
 <form
        onSubmit={state==='login'?loginHandler:handleSubmit}
        className="flex flex-col gap-4 items-start p-8 w-full text-zinc-600 text-sm shadow-lg bg-[#FFFFFF]"
      >
        {/* Header Section */}
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900">
            {state === "signup" ? "Create Account" : "Login"}
          </h2>
          <p className="text-zinc-500 mt-2">
            {state === "signup"
              ? "Please sign up to book appointment"
              : "Please login to book appointment"}
          </p>
        </div>

        {/* Full Name Field (Hidden on Login) */}
        {state === "signup" && (
          <div className="w-full">
            <label
              htmlFor="fullName"
              className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider"
            >
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              id="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="John Doe"
              className="border border-zinc-300 rounded w-full p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
        )}

        {/* Email Field */}
        <div className="w-full">
          <label htmlFor="email" className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className="border border-zinc-300 rounded w-full p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        {/* Password Field */}
        <div className="w-full">
          <label
            htmlFor="password"
            className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider"
          >
            Password
          </label>
        <div className="relative w-full">
  <input
    type={showPassword ? "text" : "password"}
    name="password"
    id="password"
    value={formData.password}
    onChange={handleChange}
    placeholder="••••••••"
    className="border border-zinc-300 rounded w-full p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
    required
  />
  <button
  type="button"
  onClick={() => setShowPassword(!showPassword)}
  
  className="absolute right-3 top-0 h-full flex items-center text-zinc-400 hover:text-zinc-600"
>
  {showPassword ? (
    <EyeOff className="h-5 w-5" />
  ) : (
    <Eye className="h-5 w-5" />
  )}
</button>
</div>
          
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-lg shadow-sm hover:shadow transition duration-200 disabled:opacity-70"
          >
        
          {loading ||loginLoading
            ? "loading...."
            : state === "signup"
              ? "Create Account"
              : "Login"}
        </button>
        <div className="flex items-center w-full">
  <div className="flex-1 border-t border-zinc-200"></div>
  <span className="mx-4 text-zinc-400 text-xs uppercase tracking-wider select-none">Or</span>
  <div className="flex-1 border-t border-zinc-200"></div>
</div>
         <div className="flex justify-center w-full">
 <button 
 onClick={signWithGoogle}
            type="button" 
            className="flex justify-center items-center gap-2 border border-zinc-300 hover:bg-zinc-50 text-zinc-700 font-medium py-2.5 px-4 rounded-lg shadow-sm transition duration-200 w-full"
          >
            <img src={assets.google} className="w-5 h-5" alt="Google logo"/>
            Continue with Google
          </button>
        
</div>

        {/* State Toggle Link */}
        <p className="text-zinc-500 mt-2 text-center w-full">
          {state === "signup"
            ? "Already have an account? "
            : "Don't have an account? "}
          <span
            onClick={() => setState(state === "signup" ? "login" : "signup")}
            className="text-blue-600 font-medium cursor-pointer hover:underline ml-1"
          >
            {state === "signup" ? "Login here" : "Sign up here"}
          </span>
        </p>
     
        {state !== "signup" && (
          <>
           <div className="border-t border-zinc-100 h-1 w-full"></div>
           <div className="flex items-center justify-center w-full gap-2">
             <p>Doctors Login</p> |
            <p>Admin Login</p>
           </div>
          </>
        )}
      </form>
     </div>
    </div>
  );
};

export default AuthForm;
