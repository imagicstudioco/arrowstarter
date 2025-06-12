"use client";

import { useEffect } from "react";
import { MyProjects } from "@/components/my-projects";
import { BackedProjects } from "@/components/backed-projects";
import { sdk } from "@farcaster/frame-sdk";

export default function Dashboard() {
  useEffect(() => {
    sdk.actions.ready();
  }, []);

 
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Dashboard Summary */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">My Dashboard</h2>
        
        </div>
        <MyProjects />
      </section>

      {/* My Projects */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Backed Projects</h2>
        </div>
        <BackedProjects />
      </section>
    </div>
  );
}
