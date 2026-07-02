import { fakeBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
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
        },
        invalidatesTags:['doctors']
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
getDoctorsById: builder.query({
  async queryFn(id) {
    try {
      const docRef = doc(db, 'doctors', id);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        return { error: { status: 404, message: 'Doctor not found' } };
      }
      return {
        data: {
          id: docSnap.id,
          ...docSnap.data()
        }
      };
    } catch (error) {
      return { error: { status: 'FETCH_ERROR', error: error.message } };
    }
  },
  providesTags: ['doctors']
}),
updateDoctor: builder.mutation({
  async queryFn({ id, data }) {
   
    try {
      const docRef = doc(db, 'doctors', id);
      await updateDoc(docRef, data);
      return { data: { success: true } };
    } catch (error) {
       console.log(error.message)
      return { error: { message: error.message } };
    }
  },
  invalidatesTags:['doctors']
}),
deleteDoctor: builder.mutation({
      async queryFn(id) {
        try {
          const docRef = doc(db, 'doctors', id);
          await deleteDoc(docRef);
          
          return { data: { success: true } };
        } catch (error) {
          return {
            error: { 
              status: 'CUSTOM_ERROR', 
              data: { message: error.message } 
            } 
          };
        }
      },
      invalidatesTags:['doctors']
    })
    })
})
export const {useGetAllDoctorsQuery,useAddDoctorMutation,useGetAllCategoriesQuery,useGetDoctorsByIdQuery,useUpdateDoctorMutation,useDeleteDoctorMutation}=ApiSlice