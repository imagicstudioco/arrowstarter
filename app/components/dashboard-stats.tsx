"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, FileClock, CheckCircle2 } from "lucide-react";

const stats = [
  {
    label: "Total Projects",
    value: 12,
    icon: Briefcase,
    color: "text-blue-600 bg-blue-100",
  },
  {
    label: "Drafts",
    value: 4,
    icon: FileClock,
    color: "text-yellow-600 bg-yellow-100",
  },
  {
    label: "Completed",
    value: 5,
    icon: CheckCircle2,
    color: "text-green-600 bg-green-100",
  },
];

export function DashboardStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {stats.map((stat) => (
        <Card key={stat.label} className="p-5">
          <CardContent className="flex items-center gap-4 p-0">
            <div className={`p-3 rounded-full ${stat.color}`}>
              <stat.icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className="text-xl font-semibold">{stat.value}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
