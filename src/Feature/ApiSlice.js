import { fakeBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";
import { addDoc, collection, doc, getDocs } from "firebase/firestore";
import { db } from "../Firebase/Firebase";




export const ApiSlice=createApi({
    reducerPath:'api',
    baseQuery:fakeBaseQuery(),
    tagTypes:['doctors'],
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
        },
        providesTags:['doctors']
    }),
    addDoctor:builder.mutation({
        async queryFn(data){
            try {
            const docRef=collection(db,'doctors')
            await addDoc(docRef,data)
            return {success:true}
            } catch (error) {
              return {error:{message:"failed to add doctors"}}  
            }
        }
    }),
    getAllCategories: builder.query({
  async queryFn() {
    try {
      const docRef = collection(db, 'Categories');
      const docSnap = await getDocs(docRef);
     
      return {
        data: docSnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })),
      };
    } catch (error) {
      return {
        error: {
          message: error.message || 'Failed to fetch categories',
          originalError: error,
        },
      };
    }
  },
}),
    })
})
export const {useGetAllDoctorsQuery,useAddDoctorMutation,useGetAllCategoriesQuery}=ApiSlice