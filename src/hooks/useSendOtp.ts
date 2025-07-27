import { useState } from "react";
import { signInWithPhoneNumber } from "firebase/auth";
import { auth, RecaptchaVerifier } from "../firebase";
import authApi from "../api/auth";

declare global {
  interface Window {
    recaptchaVerifier: RecaptchaVerifier;
  }
}

export const useSendOtp = () => {
  const [confirmationResult, setConfirmationResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const setUpRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: () => {},
        }
      );
    }
  };

  const sendOtp = async (phoneNumber: string) => {
    setLoading(true);
    setError(null);
    try {
      setUpRecaptcha();
      const result = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        window.recaptchaVerifier
      );
      setConfirmationResult(result);
    } catch (err: any) {
      setError(err.message || "Failed to send OTP");
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async (otp: string, phoneNumber: string) => {
    setLoading(true);
    setError(null);
    try {
      if (!confirmationResult) throw new Error("No OTP confirmation available");
      const result = await confirmationResult.confirm(otp);
      const idToken = await result.user.getIdToken();
      // Call backend to verify OTP
      await authApi.verifyOtp(phoneNumber, idToken);
      setSuccess(true);
      return idToken;
    } catch (err: any) {
      setError(err.message || "Failed to verify OTP");
      setSuccess(false);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { sendOtp, verifyOtp, loading, error, success };
};
