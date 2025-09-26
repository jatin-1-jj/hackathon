import {create} from 'zustand'
import { axInstance } from '../lib/axios';



export const useAuthStore = create((set)=>({


    authUser:null,
    isSigningUp:false,
    isSigningIn:false,
    isUpdatingProfile:false,
    isCheckingAuth:true,

    checkAuth:async ()=>{
            try {
                const res = await axInstance.get("/auth/check");
                set({authUser:res.data});
            } catch (error) {
                console.log(`error in checkAuth useAuthStore : `,error);
                set({authUser:null})
                
            }finally{
                set({isCheckingAuth:false});
            }
        },

    register:async (data)=>{
        set({isSigningUp:true});
        try {
            const res = await axInstance.post("/auth/register",data);
            set({authUser:res.data});
            // toast.success("Account created successfully");

        } catch (err) {
            console.log('error in registering',err)
            // toast.error(err.response.data.message);
        }finally{
            set({isSigningUp:false});
        }
    },

    login:async (data)=>{
        set({isSigningIn:true})
        try {
            const res = await axInstance.post("/auth/login",data);
            set({authUser:res.data});
            // toast.success("signed In successfully");
            // get().connectSocket();
            return Response.json({
                    success:true
                })
        } catch (error) {
            console.log('error in login',error)
            // toast.error(error.response.data.message);
        }finally{
            set({isSigningIn:false})
        }
    },


}))