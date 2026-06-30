"use client";

import { useState } from "react";
import { Download } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardCard from "@/components/cards/DashboardCard";
import PageHeader from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { toast } from "sonner";
import collectionsData from "@/data/collections.json";
import { Banknote, Clock, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

const { summary, monthly } = collectionsData;

const MONTHS = ["June", "May"];

const kpiContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const kpiItem = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

const tableContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04 } },
};

const tableRow = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

export default function AdminCollectionsPage() {
  const [month, setMonth] = useState("June");

  const chartData = monthly.filter((d) => d.month === month);

  const handleExport = () => {
    const rows = monthly.filter((d) => d.month === month);
    const header = "Week,Collected (INR),Pending (INR),Overdue (INR)";
    const lines = rows.map((r) => `${r.week},${r.amount},0,0`);
    const csv = [header, ...lines].join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `collections-${month.toLowerCase()}.csv`;
    a.click();
    URL.revokeObjectURL(url);

    toast.success(`collections-${month.toLowerCase()}.csv downloaded`);
  };

  return (
    <motion.div
      className="space-y-5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <PageHeader
        title="Collections"
        subtitle="Financial summary"
        action={
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button onClick={handleExport} variant="outline" className="gap-1.5 h-9 text-xs rounded-xl">
              <Download className="size-3.5" />
              Export
            </Button>
          </motion.div>
        }
      />

      {/* Summary KPIs */}
      <motion.div
        className="grid grid-cols-3 gap-2"
        variants={kpiContainer}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={kpiItem}>
          <DashboardCard
            title="Collected"
            value={`₹${(summary.totalCollected / 1000).toFixed(1)}k`}
            icon={Banknote}
            trend={12}
          />
        </motion.div>
        <motion.div variants={kpiItem}>
          <DashboardCard
            title="Pending"
            value={`₹${(summary.pending / 1000).toFixed(1)}k`}
            icon={Clock}
          />
        </motion.div>
        <motion.div variants={kpiItem}>
          <DashboardCard
            title="Overdue"
            value={`₹${(summary.overdue / 1000).toFixed(1)}k`}
            icon={AlertCircle}
            trend={-3}
          />
        </motion.div>
      </motion.div>

      {/* Month filter */}
      <Tabs value={month} onValueChange={setMonth}>
        <TabsList className="grid grid-cols-2 h-9 rounded-xl w-40">
          {MONTHS.map((m) => (
            <TabsTrigger key={m} value={m} className="text-xs rounded-lg">{m}</TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Bar chart */}
      <motion.div
        initial={{ opacity: 0, scaleY: 0.9, originY: 1 }}
        animate={{ opacity: 1, scaleY: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <p className="text-sm font-semibold text-foreground mb-4">{month} — Weekly Collections</p>
            <div className="w-full overflow-x-auto">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={chartData} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis
                  dataKey="week"
                  tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  tick={{ fontSize: 9, fill: "var(--muted-foreground)" }}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  contentStyle={{
                    background: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "0.75rem",
                    fontSize: 12,
                  }}
                  formatter={(v) => [`₹${Number(v).toLocaleString("en-IN")}`, "Collected"]}
                />
                <Bar dataKey="amount" fill="var(--primary)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Collections table */}
      <div>
        <p className="text-sm font-semibold text-foreground mb-2">Weekly Breakdown</p>
        <motion.div
          className="space-y-2"
          variants={tableContainer}
          initial="hidden"
          animate="show"
        >
          {chartData.map((row) => (
            <motion.div key={row.week} variants={tableRow}>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-3 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">{row.week} · {row.month} {row.year}</p>
                  </div>
                  <p className="text-sm font-bold text-primary">₹{row.amount.toLocaleString("en-IN")}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
          <motion.div variants={tableRow}>
            <Card className="border-0 shadow-sm bg-accent">
              <CardContent className="p-3 flex items-center justify-between">
                <p className="text-sm font-bold text-foreground">Total</p>
                <p className="text-sm font-bold text-primary">
                  ₹{chartData.reduce((s, r) => s + r.amount, 0).toLocaleString("en-IN")}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
