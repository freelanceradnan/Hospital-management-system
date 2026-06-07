import { createContext } from "react";

import { doctors } from "../assets/assets";
export const MainContext=createContext();

export const MainContextProvider=({children})=>{

    const value={
    doctors
    }
return <MainContext.Provider value={value}>
    {children}
</MainContext.Provider>
}