"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Milk, User, Truck, LayoutDashboard, ChevronRight, Sparkles } from "lucide-react";

const roles = [
  {
    href: "/customer/splash",
    icon: User,
    label: "Customer",
    desc: "View subscriptions, orders & payments",
    gradient: "from-emerald-500 to-teal-600",
    bg: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
  {
    href: "/delivery/login",
    icon: Truck,
    label: "Delivery Executive",
    desc: "Access your route & delivery updates",
    gradient: "from-blue-500 to-indigo-600",
    bg: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    href: "/admin/login",
    icon: LayoutDashboard,
    label: "Admin",
    desc: "Manage customers, routes & collections",
    gradient: "from-violet-500 to-purple-600",
    bg: "bg-violet-50",
    iconColor: "text-violet-600",
  },
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };
const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 260, damping: 22 } },
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 flex flex-col">
      {/* Hero */}
      <motion.div
        className="flex flex-col items-center justify-center pt-20 pb-10 px-6 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Glow orb */}
        <div className="relative mb-6">
          <div className="absolute inset-0 rounded-full bg-emerald-400/30 blur-2xl scale-150" />
          <div className="relative flex items-center justify-center size-20 rounded-3xl bg-gradient-to-br from-emerald-400 to-teal-500 shadow-2xl shadow-emerald-500/40">
            <Milk className="size-10 text-white" />
          </div>
        </div>
        <motion.h1
          className="text-4xl font-black text-white tracking-tight"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15, duration: 0.5 }}
        >
          Milk Farmers
        </motion.h1>
        <motion.p
          className="text-emerald-300/80 text-sm mt-2 font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Premium milk subscription platform
        </motion.p>
        <motion.div
          className="flex items-center gap-1.5 mt-3 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Sparkles className="size-3 text-emerald-400" />
          <span className="text-emerald-300 text-xs font-medium">Choose your role to continue</span>
        </motion.div>
      </motion.div>

      {/* Role cards */}
      <motion.div
        className="flex-1 px-5 pb-10 space-y-3 max-w-md mx-auto w-full"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {roles.map((role) => (
          <motion.div key={role.href} variants={item} whileHover={{ scale: 1.02, y: -3 }} whileTap={{ scale: 0.97 }}>
            <Link
              href={role.href}
              className="flex items-center gap-4 p-5 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 hover:bg-white/15 transition-colors group"
            >
              <div className={`flex items-center justify-center size-12 rounded-2xl bg-gradient-to-br ${role.gradient} shadow-lg shrink-0`}>
                <role.icon className="size-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-bold text-base">{role.label}</p>
                <p className="text-white/50 text-xs mt-0.5 leading-snug">{role.desc}</p>
              </div>
              <ChevronRight className="size-4 text-white/30 group-hover:text-white/70 group-hover:translate-x-0.5 transition-all shrink-0" />
            </Link>
          </motion.div>
        ))}
      </motion.div>

      <motion.p
        className="text-center text-white/25 text-xs pb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        Milk Farmers © 2024
      </motion.p>
    </div>
  );
}
