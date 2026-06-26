import { createContext, useEffect, useState } from "react";
import { doctors } from "../assets/assets";
export const MainContext = createContext();
import { auth, db } from "../Firebase/Firebase";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
export const MainContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [islogin, setIsLogin] = useState(false);
  const [role, isRole] = useState();
  const [loading, setLoading] = useState(true);

  //user persists
  useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (user) => {
    setLoading(true); 
    
    try {
      if (!user) {
        setCurrentUser(null);
        setIsLogin(false);
        isRole(null);
        setLoading(false); 
        return;
      }

      
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      
      setCurrentUser(user);
      setIsLogin(true);

      if (docSnap.exists()) {
        isRole(docSnap.data().role || "user");
      } else {
        isRole("user");
      }
    } catch (error) {
      console.error("Error details:", error);
      setCurrentUser(null);
      setIsLogin(false);
      isRole(null);
    } finally {
      
      setLoading(false);
    }
  });

  return () => unsubscribe();
}, []);

  const value = {
    doctors,islogin,role,currentUser,loading
  };
  return <MainContext.Provider value={value}>{children}</MainContext.Provider>;
};
