"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FeaturedProjects } from "@/components/featured-projects";
import { Categories } from "@/components/categories";
import { HowItWorks } from "@/components/how-it-works";
import Link from "next/link";
import { ArrowRight, Film, Book, Music } from "lucide-react";

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
          <h2 className="text-3xl font-bold">Featured Projects</h2>
          <Button variant="ghost" asChild>
            <Link href="/projects">View all projects</Link>
          </Button>
        </div>
        <FeaturedProjects />
      </section>

      {/* Categories */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8">Browse by Category</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center space-x-4 mb-4">
              <Film className="h-8 w-8 text-primary" />
              <h3 className="text-xl font-semibold">Movies</h3>
            </div>
            <p className="text-muted-foreground">
              Support independent filmmakers and get exclusive behind-the-scenes access.
            </p>
          </Card>
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center space-x-4 mb-4">
              <Book className="h-8 w-8 text-primary" />
              <h3 className="text-xl font-semibold">Books</h3>
            </div>
            <p className="text-muted-foreground">
              Help authors publish their work and receive signed copies and early access.
            </p>
          </Card>
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center space-x-4 mb-4">
              <Music className="h-8 w-8 text-primary" />
              <h3 className="text-xl font-semibold">Albums</h3>
            </div>
            <p className="text-muted-foreground">
              Support musicians and get VIP concert tickets and exclusive merchandise.
            </p>
          </Card>
        </div>
      </section>

      {/* How it Works */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="p-6 text-center">
            <div className="text-4xl font-bold text-primary mb-4">1</div>
            <h3 className="text-xl font-semibold mb-2">Choose a Project</h3>
            <p className="text-muted-foreground">
              Browse through movies, books, and albums looking for support.
            </p>
          </Card>
          <Card className="p-6 text-center">
            <div className="text-4xl font-bold text-primary mb-4">2</div>
            <h3 className="text-xl font-semibold mb-2">Buy Project Coins</h3>
            <p className="text-muted-foreground">
              Purchase project coins to support your favorite creative work.
            </p>
          </Card>
          <Card className="p-6 text-center">
            <div className="text-4xl font-bold text-primary mb-4">3</div>
            <h3 className="text-xl font-semibold mb-2">Get Rewards</h3>
            <p className="text-muted-foreground">
              Receive exclusive rewards and updates as the project progresses.
            </p>
          </Card>
        </div>
      </section>

      {/* Success Stories */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8">Success Stories</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="p-6">
            <div className="aspect-video rounded-lg bg-muted mb-4" />
            <h3 className="text-xl font-semibold mb-2">"The Last Sunset" - Indie Film</h3>
            <p className="text-muted-foreground mb-4">
              Raised 500 ETH from 2,000 supporters. Now in post-production with a major studio deal.
            </p>
            <Button variant="link" className="px-0">Read more</Button>
          </Card>
          <Card className="p-6">
            <div className="aspect-video rounded-lg bg-muted mb-4" />
            <h3 className="text-xl font-semibold mb-2">"Digital Dreams" - Album</h3>
            <p className="text-muted-foreground mb-4">
              Independent artist raised 200 ETH, now touring internationally with sold-out shows.
            </p>
            <Button variant="link" className="px-0">Read more</Button>
          </Card>
        </div>
      </section>
    </div>
  );
}