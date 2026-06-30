"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Milk, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion, AnimatePresence } from "framer-motion";

const MOCK_ID = "EMP001";
const MOCK_PIN = "1234";

export default function AdminLoginPage() {
  const router = useRouter();
  const [empId, setEmpId] = useState("");
  const [pin, setPin] = useState("");
  const [showPin, setShowPin] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (empId.toUpperCase() === MOCK_ID && pin === MOCK_PIN) {
      sessionStorage.setItem("admin_auth", "1");
      router.replace("/admin/dashboard");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <motion.div
      className="flex flex-col min-h-screen bg-background"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {/* Header */}
      <motion.div
        className="bg-primary px-6 pt-12 pb-10"
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="flex items-center justify-center size-10 rounded-xl bg-white/20">
            <Milk className="size-5 text-white" />
          </div>
          <div>
            <p className="text-white font-bold text-base">Milk Farmers</p>
            <p className="text-white/60 text-xs">Milk Farmers Management</p>
          </div>
        </div>
        <h1 className="text-2xl font-bold text-white mt-4">Admin Login</h1>
        <p className="text-white/70 text-sm mt-1">Sign in to manage operations</p>
      </motion.div>

      <div className="flex-1 px-6 pt-8 space-y-4">
        <motion.div
          className="space-y-1.5"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15, ease: "easeOut" }}
        >
          <Label htmlFor="empId">Employee ID</Label>
          <Input
            id="empId"
            placeholder="e.g. EMP001"
            value={empId}
            onChange={(e) => {
              setEmpId(e.target.value.toUpperCase());
              setError("");
            }}
            className="h-12 text-base rounded-xl uppercase"
          />
        </motion.div>

        <motion.div
          className="space-y-1.5"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25, ease: "easeOut" }}
        >
          <Label htmlFor="pin">PIN</Label>
          <div className="relative">
            <Input
              id="pin"
              type={showPin ? "text" : "password"}
              inputMode="numeric"
              placeholder="4-digit PIN"
              value={pin}
              onChange={(e) => {
                setPin(e.target.value.replace(/\D/g, "").slice(0, 4));
                setError("");
              }}
              className="h-12 text-base rounded-xl pr-11"
              maxLength={4}
            />
            <button
              type="button"
              onClick={() => setShowPin(!showPin)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            >
              {showPin ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
        </motion.div>

        <AnimatePresence>
          {error && (
            <motion.p
              className="text-sm text-destructive"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.96 }}>
          <Button
            onClick={handleLogin}
            disabled={!empId || pin.length < 4}
            className="w-full h-12 text-base font-semibold rounded-xl"
          >
            Login
          </Button>
        </motion.div>
      </div>

      <p className="text-center text-xs text-muted-foreground pb-8 px-6">
        Demo: <span className="font-bold text-primary">EMP001</span> /{" "}
        <span className="font-bold text-primary">1234</span>
      </p>
    </motion.div>
  );
}
