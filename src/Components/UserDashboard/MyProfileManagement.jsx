import React, { useEffect, useState } from "react";
import { auth, db } from "../../Firebase/Firebase";
import { doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { onAuthStateChanged } from "firebase/auth";

const MyProfileManagement = () => {
  const currentuser = auth?.currentUser;
  const [editPersonal, setEditPersonal] = useState(false);
  const [loading,setLoading]=useState(false)
  const [personalData, setPersonalData] = useState({
    FirstName: "",
    MobileNumber: "",
    Gender: "", 
    DateOfBirth: "",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setPersonalData((prev) => ({
      ...prev,
      [name]: name === 'MobileNumber' ? Number(value) : value
    }));
  };
  //get current data
useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (user) => {
    
    try {
      setLoading(true)
      if (user) {
       
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        
      
        if (docSnap.exists()) {
          const data = docSnap.data();
          setPersonalData(data);
        } else {
          toast.error("User profile data not found in database!");
          setPersonalData(null);
        }
      } else {
       
        setPersonalData(null); 
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error("Failed to load user data.");
    }
    finally{
      setLoading(false)
    }
  });

  return () => unsubscribe();
}, []);

  const updateInfo = async (e) => {
    e.preventDefault();
    
    if (!currentuser?.uid) {
      toast.error("User not authenticated!");
      return;
    }

    try {
      const docRef = doc(db, 'users', currentuser.uid);
      await updateDoc(docRef, { ...personalData });
      
      toast.success('Update success!');
      setEditPersonal(false); 
    } catch (error) {
      toast.error('Failed to update');
     
    }
  };
if(loading){
  return <div className="p-4 max-w-xl mx-auto animate-pulse">
      
      <div className="flex justify-between items-center mb-6">
        <div>
      
          <div className="h-6 w-48 bg-gray-200 rounded mb-2"></div>
        
          <div className="h-4 w-64 bg-gray-100 rounded"></div>
        </div>
        
        <div className="h-8 w-16 bg-gray-200 rounded"></div>
      </div>

      
       
        <div>
          <div className="h-4 w-24 bg-gray-200 rounded mb-2"></div>
          <div className="h-10 w-full bg-gray-100 rounded"></div>
        </div>

        
        <div>
          <div className="h-4 w-28 bg-gray-200 rounded mb-2"></div>
          <div className="h-10 w-full bg-gray-100 rounded"></div>
        </div>

        
        <div>
          <div className="h-4 w-28 bg-gray-200 rounded mb-2"></div>
          <div className="h-10 w-full bg-gray-100 rounded"></div>
        </div>

        
        <div>
          <div className="h-4 w-16 bg-gray-200 rounded mb-2"></div>
          <div className="h-10 w-full bg-gray-100 rounded"></div>
        </div>

        
        <div>
          <div className="h-4 w-28 bg-gray-200 rounded mb-2"></div>
          <div className="h-10 w-full bg-gray-100 rounded"></div>
        </div>
      </div>

}
  return (
    <div className="p-4 max-w-xl mx-auto">
      <div>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl uppercase font-semibold">Basic information</h2>
            <p className="text-sm text-gray-500">
              Ensure this matches your official documents.
            </p>
          </div>
          <div>
            <button 
              onClick={() => setEditPersonal(!editPersonal)}
              className="px-4 py-1 border rounded hover:bg-gray-50 transition-colors"
            >
              {editPersonal ? "Cancel" : "Edit"}
            </button>
          </div>
        </div>

        <div>
          <form onSubmit={updateInfo} className="space-y-4">
            {/* Full Name Field */}
            <div>
              <div><label className="block font-medium text-gray-700">Full Name</label></div>
              {editPersonal ? (
                <input 
                  type="text" 
                  name="FirstName" 
                  className="border p-2 rounded w-full mt-1" 
                  value={personalData.FirstName} 
                  onChange={changeHandler}
                />
              ) : (
                <div className="py-2 text-gray-900 border-b border-transparent">{personalData.FirstName || "—"}</div>
              )}
            </div>

            {/* Email Address Field */}
            <div>
              <div><label className="block font-medium text-gray-700">Email Address</label></div>
              <div className="py-2 text-gray-600 flex gap-2">{currentuser?.email || "—"} </div>
              
            </div>

            {/* Mobile Number Field */}
            <div>
              <div><label className="block font-medium text-gray-700">Mobile Number</label></div>
              {editPersonal ? (
                <input 
                  type="number" 
                  name="MobileNumber" 
                  className="border p-2 rounded w-full mt-1" 
                  value={personalData.MobileNumber} 
                  onChange={changeHandler}
                />
              ) : (
                <div className="py-2 text-gray-900">{personalData.MobileNumber || "—"}</div>
              )}
            </div>

            {/* Gender Field */}
            <div>
              <div><label className="block font-medium text-gray-700">Gender</label></div>
              {editPersonal ? (
                <select 
                  name="Gender" 
                  className="border p-2 rounded w-full mt-1" 
                  value={personalData.Gender} 
                  onChange={changeHandler}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              ) : (
                <div className="py-2 text-gray-900 capitalize">{personalData.Gender || "—"}</div>
              )}
            </div>

            {/* Date of Birth Field */}
            <div>
              <div><label className="block font-medium text-gray-700">Date Of Birth</label></div>
              {editPersonal ? (
                <input 
                  type="date" 
                  name="DateOfBirth" 
                  className="border p-2 rounded w-full mt-1" 
                  value={personalData.DateOfBirth} 
                  onChange={changeHandler}
                />
              ) : (
                <div className="py-2 text-gray-900">{personalData.DateOfBirth || "—"}</div>
              )}
            </div>

            <div className="pt-2">
              {editPersonal && (
                <button type="submit" className="px-6 py-2 bg-blue-500 hover:bg-blue-600 rounded text-white font-medium transition-colors">
                  Save
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MyProfileManagement;