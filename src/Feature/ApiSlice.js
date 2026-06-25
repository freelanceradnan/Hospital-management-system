import { fakeBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";
import { collection, doc, getDocs } from "firebase/firestore";
import { db } from "../Firebase/Firebase";




export const ApiSlice=createApi({
    reducerPath:'api',
    baseQuery:fakeBaseQuery(),
    endpoints:(builder)=>({
    getAllDoctors:builder.query({
        async queryFn(){
            try {
                const docRef=collection(db,'doctors')
               
                const docSnap=await getDocs(docRef)
                return {
                    data: docSnap.docs.map((doc) => ({
              id: doc.id,
              ...doc.data()
            }))
                }
            } catch (error) {
                return {error:{message:'failed to get all doctors'}}
            }
        }
    })
    })
})
export const {useGetAllDoctorsQuery}=ApiSlice