"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FeaturedProjects } from "@/components/featured-projects";
import Link from "next/link";
import { ArrowRight, Film, Book, Music } from "lucide-react";
import { useEffect } from "react";
import { sdk } from "@farcaster/frame-sdk";

useEffect(() => {
  sdk.actions.ready();
}, []);

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-primary/10 via-primary/5 to-background rounded-3xl mb-16">
        <div className="text-center space-y-6 max-w-3xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
            Support Creative Projects with Crypto
          </h1>
          <p className="text-xl text-muted-foreground">
            Buy project coins to support movies, books, and albums. Get exclusive rewards and be part of the creative journey.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/projects/create">
                Start Your Project <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/projects">Browse Projects</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Projects</h2>
          <Button variant="ghost" asChild>
            <Link href="/projects">View all projects</Link>
          </Button>
        </div>
        <FeaturedProjects />
      </section>

    </div>
  );
}