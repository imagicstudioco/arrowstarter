"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DashboardStats } from "@/components/dashboard-stats";
import { MyProjects } from "@/components/my-projects";
import { sdk } from "@farcaster/frame-sdk";

export default function Dashboard() {
  useEffect(() => {
    sdk.actions.ready();
  }, []);

  const handleAddMiniApp = async () => {
    try {
      await sdk.actions.addMiniApp();
      console.log("Mini app added successfully");
    } catch (error) {
      console.error("Failed to add mini app:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Dashboard Summary */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">My Dashboard</h2>
          <Button onClick={handleAddMiniApp}>
            Add Mini App
          </Button>
        </div>
        <DashboardStats />
      </section>

      {/* My Projects */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">My Projects</h2>
          <Button variant="ghost" asChild>
            <Link href="/projects/new">Create New Project</Link>
          </Button>
        </div>
        <MyProjects />
      </section>
    </div>
  );
}
