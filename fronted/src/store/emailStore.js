import { create } from "zustand";
import emailjs from "emailjs-com";
import { axInstance } from "../lib/axios";

export const useEmailStore = create(() => ({
  exTime: () => {
    const now = new Date();
    now.setHours(now.getHours() + 1);
    return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  },

  otpGenerator: (length = 6) => {
    const digits = "0123456789";
    let otp = "";
    const randomValues = new Uint32Array(length);
    window.crypto.getRandomValues(randomValues);

    for (let i = 0; i < length; i++) {
      otp += digits[randomValues[i] % digits.length];
    }
    return otp;
  },

  sendOTP: async (email, username, verifyCode, time) => {
    try {
      const resEmail = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          to_email: email,
          username: username,
          otp: verifyCode,
          time,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      console.log("Email sent:", resEmail.status);

      if (resEmail.status === 200) {
        const data = { verifyCode, email };
        const resBack = await axInstance.post("/auth/otp", data);
        if (resBack.data.success) {
          return { success: true, message: "OTP sent successfully" };
        } else {
          return { success: true, message: "OTP sent only to email" };
        }
      } else {
        return { success: false, message: "Unexpected resEmail from EmailJS" };
      }
    } catch (err) {
      console.error("Error sending email:", err);
      return { success: false, message: "Error sending verification email" };
    }
  },


}));
