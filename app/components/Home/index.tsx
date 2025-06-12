"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Projects } from "@/components/projects";
import { HeroFeatured } from "@/components/hero-featured";
import { sdk } from "@farcaster/frame-sdk";

export default function Home() {
  useEffect(() => {
    sdk.actions.ready();
  }, []);


  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <HeroFeatured />

      {/* Featured Projects */}
      <section className="mb-16 mt-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Projects</h2>
          <Button variant="ghost" asChild>
            <Link href="/projects">View all projects</Link>
          </Button>
        </div>
        <Projects />
      </section>
    </div>
  );
}
