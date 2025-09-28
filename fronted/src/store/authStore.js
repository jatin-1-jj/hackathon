import { create } from "zustand";
import { axInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isSigningIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  isLoggingOut: false,
  isCheckingUnique: false,
  checkAuth: async () => {
    try {
      const res = await axInstance.get("/auth/check");
      if (res.data.success) {
        set({ authUser: res.data.user });
      }
    } catch (error) {
      console.log(`error in checkAuth useAuthStore : `, error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  register: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axInstance.post("/auth/register", data);
      if (res.data.success) {
        set({ authUser: res.data });
        toast.success("Account created successfully");
      } else {
        toast.error(res.data.message);
      }
      return res;
    } catch (err) {
      console.log("error in registering authstore", err);
      toast.error("error in catch signup");
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isSigningIn: true });
    try {
      const res = await axInstance.post("/auth/login", data);
      set({ authUser: res.data });
      if (res.data.success) {
        toast.success("logged In In successfully");
      } else {
        toast.error(res.data.message);
      }
      // get().connectSocket();
      return res;
    } catch (error) {
      console.log("error in login", error);
      toast.error(error.message);
    } finally {
      set({ isSigningIn: false });
    }
  },

  logout: async () => {
    set({ isLoggingOut: true });
    try {
      const res = await axInstance.get("/auth/log-out");
      if (res.data.success) {
        toast.success(res.data.message);
        set({ authUser: null });
      } else {
        toast.error(res.data.message);
      }
      return res;
    } catch (error) {
      console.log("error in authstore logging", error);
      toast.error("error in catch logging out");
    } finally {
      set({ isLoggingOut: false });
    }
  },

  isValidUsername: (username) => {
    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    return usernameRegex.test(username);
  },

  isValidEmail: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },
  isValidOtp: (otp) => {
    const otpRegex = /^\d{6}$/;
    return otpRegex.test(otp);
  },

  checkOtp: async (data) => {
    try {
      const res = await axInstance.post("/auth/check-otp",data);

      if(res.data.success){
        toast.success('email verified');
      }else{
        toast.error('email not verified')
      }
      return res;
    } catch (error) {
      console.error("Error sending email:", error);
      return { success: false, message: "Error verifing otp" };
    }
  },
  checkUniqueUsername: async (username) => {
    set({ isCheckingUnique: true });
    try {
      const res = await axInstance.post(
        "/auth/check-unique-username",
        username
      );
      if (res.data.success) {
        toast.success(res.data.message, {
          position: "bottom-right",
          duration: 800,
        });
      } else {
        toast.error(res.data.message, {
          position: "bottom-right",
          duration: 800,
        });
      }
      return res;
    } catch (error) {
      console.log("error in checkUniqueUsername authstore", error);
      toast.error("error while checking username");
    } finally {
      set({ isCheckingUnique: false });
    }
  },
}));
