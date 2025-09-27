import {create} from 'zustand'
import { axInstance } from '../lib/axios'
import  toast from 'react-hot-toast'

export const useAlumniStore =create((set)=>({

    alumni:[],
    isFetchingAlumni:false,

    fetchAlumni: async ()=>{
        set({isFetchingAlumni:true});
        try {
            const res = await axInstance.get('/alumni/get-alumni');
            if(res.data.success){
                set({alumni:res.data.alumni});
                toast.success(res.data.message,{position:"bottom-right"});
            }
        } catch (error) {
            console.log('error in alumni store',error);
            toast.error('error in fetching alumni network')
        }finally{
            set({isFetchingAlumni:false});
        }
    }



}))