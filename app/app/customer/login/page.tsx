"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Milk, Phone, RefreshCw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import OTPInput from "@/components/shared/OTPInput";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

type Step = "phone" | "otp";
const MOCK_OTP = "1234";

export default function LoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  const phoneValid = /^[6-9]\d{9}$/.test(phone);

  const handleSendOtp = () => {
    if (!phoneValid) return;
    setStep("otp");
    setOtp("");
    setOtpError(false);
    startResendTimer();
    toast.success("OTP sent to +91 " + phone);
  };

  const startResendTimer = () => {
    setResendTimer(30);
    const interval = setInterval(() => {
      setResendTimer((t) => {
        if (t <= 1) { clearInterval(interval); return 0; }
        return t - 1;
      });
    }, 1000);
  };

  const handleVerify = () => {
    if (otp === MOCK_OTP) {
      toast.success("Welcome to Milk Farmers!");
      sessionStorage.setItem("customer_auth", "1");
      router.replace("/customer/home");
    } else {
      setOtpError(true);
      toast.error("Incorrect OTP. Try 1234.");
    }
  };

  const handleOtpChange = (val: string) => {
    setOtp(val);
    setOtpError(false);
    if (val.length === 4) {
      setTimeout(() => {
        if (val === MOCK_OTP) {
          toast.success("Welcome to Milk Farmers!");
          sessionStorage.setItem("customer_auth", "1");
          router.replace("/customer/home");
        } else {
          setOtpError(true);
          toast.error("Incorrect OTP. Try 1234.");
        }
      }, 200);
    }
  };

  return (
    <motion.div
      className="flex flex-col min-h-screen bg-background"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Header */}
      <motion.div
        className="bg-primary px-6 pt-12 pb-10"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="flex items-center justify-center size-10 rounded-xl bg-white/20">
            <Milk className="size-5 text-white" />
          </div>
          <span className="text-white font-bold text-lg">Milk Farmers</span>
        </div>
        <h1 className="text-2xl font-bold text-white mt-4">
          {step === "phone" ? "Enter your number" : "Verify OTP"}
        </h1>
        <p className="text-white/70 text-sm mt-1">
          {step === "phone"
            ? "We'll send you a one-time password"
            : `OTP sent to +91 ${phone}`}
        </p>
      </motion.div>

      {/* Form */}
      <div className="flex-1 px-6 pt-8">
        <AnimatePresence mode="wait">
          {step === "phone" ? (
            <motion.div
              key="phone"
              className="space-y-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="space-y-1.5"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Label htmlFor="phone">Mobile Number</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-medium text-muted-foreground">
                    +91
                  </span>
                  <Input
                    id="phone"
                    type="tel"
                    inputMode="numeric"
                    placeholder="98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                    className="pl-12 h-12 text-base rounded-xl"
                    maxLength={10}
                  />
                  <Phone className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                </div>
                {phone.length > 0 && !phoneValid && (
                  <p className="text-xs text-destructive">Enter a valid 10-digit mobile number</p>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <motion.button
                  onClick={handleSendOtp}
                  disabled={!phoneValid}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.96 }}
                  className="w-full h-12 text-base font-semibold rounded-xl bg-primary text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Send OTP
                </motion.button>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="otp"
              className="space-y-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="space-y-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Label>Enter 4-digit OTP</Label>
                <OTPInput value={otp} onChange={handleOtpChange} error={otpError} />
                {otpError && (
                  <p className="text-xs text-destructive">Incorrect OTP. Use 1234 for demo.</p>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <motion.button
                  onClick={handleVerify}
                  disabled={otp.length < 4}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.96 }}
                  className="w-full h-12 text-base font-semibold rounded-xl bg-primary text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Verify & Continue
                </motion.button>
              </motion.div>

              <motion.div
                className="flex items-center justify-center gap-2 text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {resendTimer > 0 ? (
                  <span className="text-muted-foreground">Resend OTP in {resendTimer}s</span>
                ) : (
                  <button
                    onClick={() => { startResendTimer(); setOtp(""); setOtpError(false); toast.info("OTP resent"); }}
                    className="flex items-center gap-1.5 text-primary font-medium"
                  >
                    <RefreshCw className="size-3" /> Resend OTP
                  </button>
                )}
              </motion.div>

              <button
                onClick={() => { setStep("phone"); setOtp(""); setOtpError(false); }}
                className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Change number
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <p className="text-center text-xs text-muted-foreground px-6 pb-8">
        Demo OTP: <span className="font-bold text-primary">1234</span>
      </p>
    </motion.div>
  );
}
