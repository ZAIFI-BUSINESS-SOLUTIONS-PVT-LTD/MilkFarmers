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

const { summary, monthly } = collectionsData;

const MONTHS = ["June", "May"];

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
    <div className="space-y-5">
      <PageHeader
        title="Collections"
        subtitle="Financial summary"
        action={
          <Button onClick={handleExport} variant="outline" className="gap-1.5 h-9 text-xs rounded-xl">
            <Download className="size-3.5" />
            Export
          </Button>
        }
      />

      {/* Summary KPIs */}
      <div className="grid grid-cols-3 gap-2">
        <DashboardCard
          title="Collected"
          value={`₹${(summary.totalCollected / 1000).toFixed(1)}k`}
          icon={Banknote}
          trend={12}
        />
        <DashboardCard
          title="Pending"
          value={`₹${(summary.pending / 1000).toFixed(1)}k`}
          icon={Clock}
        />
        <DashboardCard
          title="Overdue"
          value={`₹${(summary.overdue / 1000).toFixed(1)}k`}
          icon={AlertCircle}
          trend={-3}
        />
      </div>

      {/* Month filter */}
      <Tabs value={month} onValueChange={setMonth}>
        <TabsList className="grid grid-cols-2 h-9 rounded-xl w-40">
          {MONTHS.map((m) => (
            <TabsTrigger key={m} value={m} className="text-xs rounded-lg">{m}</TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Bar chart */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-4">
          <p className="text-sm font-semibold text-foreground mb-4">{month} — Weekly Collections</p>
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
        </CardContent>
      </Card>

      {/* Collections table */}
      <div>
        <p className="text-sm font-semibold text-foreground mb-2">Weekly Breakdown</p>
        <div className="space-y-2">
          {chartData.map((row) => (
            <Card key={row.week} className="border-0 shadow-sm">
              <CardContent className="p-3 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">{row.week} · {row.month} {row.year}</p>
                </div>
                <p className="text-sm font-bold text-primary">₹{row.amount.toLocaleString("en-IN")}</p>
              </CardContent>
            </Card>
          ))}
          <Card className="border-0 shadow-sm bg-accent">
            <CardContent className="p-3 flex items-center justify-between">
              <p className="text-sm font-bold text-foreground">Total</p>
              <p className="text-sm font-bold text-primary">
                ₹{chartData.reduce((s, r) => s + r.amount, 0).toLocaleString("en-IN")}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
