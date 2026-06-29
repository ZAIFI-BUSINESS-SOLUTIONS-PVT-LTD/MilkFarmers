"use client";

import { Users, Truck, Banknote, PauseCircle, TrendingUp } from "lucide-react";
import DashboardCard from "@/components/cards/DashboardCard";
import PageHeader from "@/components/shared/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import collectionsData from "@/data/collections.json";

const { kpi, trend } = collectionsData;

const KPI_CARDS = [
  { title: "Active Subscribers", value: kpi.activeSubscribers, icon: Users, trend: 8 },
  { title: "Today's Deliveries", value: kpi.todayDeliveries, icon: Truck, trend: 3 },
  { title: "Monthly Revenue", value: `₹${(kpi.monthlyRevenue / 1000).toFixed(1)}k`, icon: Banknote, trend: 12 },
  { title: "Paused Accounts", value: kpi.pausedAccounts, icon: PauseCircle, trend: -5 },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        subtitle="Overview for June 2026"
        action={
          <div className="flex items-center gap-1.5 text-xs font-medium text-primary bg-accent px-3 py-1.5 rounded-full">
            <TrendingUp className="size-3" />
            <span>Live</span>
          </div>
        }
      />

      {/* KPI Grid */}
      <div className="grid grid-cols-2 gap-3">
        {KPI_CARDS.map((card) => (
          <DashboardCard key={card.title} {...card} />
        ))}
      </div>

      {/* Trend Chart */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-4">
          <p className="text-sm font-semibold text-foreground mb-1">Collection Trend — June 2026</p>
          <p className="text-xs text-muted-foreground mb-4">Daily collections (₹)</p>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={trend} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis
                dataKey="day"
                tick={{ fontSize: 9, fill: "var(--muted-foreground)" }}
                tickLine={false}
                axisLine={false}
                interval={4}
              />
              <YAxis
                tick={{ fontSize: 9, fill: "var(--muted-foreground)" }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v) => `₹${(v / 1000).toFixed(1)}k`}
              />
              <Tooltip
                contentStyle={{
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "0.75rem",
                  fontSize: 12,
                }}
                formatter={(v) => [`₹${Number(v).toLocaleString("en-IN")}`, "Collection"]}
              />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="var(--primary)"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Quick stats */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Top Route</p>
            <p className="text-sm font-bold text-foreground mt-1">{kpi.topRoute}</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">New This Week</p>
            <p className="text-sm font-bold text-foreground mt-1">{kpi.newThisWeek} subscribers</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
