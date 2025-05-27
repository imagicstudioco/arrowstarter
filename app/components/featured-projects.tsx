"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Film, Book, Music } from "lucide-react";
import Link from "next/link";

const projects = [
  {
    id: 1,
    title: "The Last Sunset",
    type: "movie",
    description: "A sci-fi thriller about time travel and redemption",
    raised: "500 ETH",
    supporters: "2,000",
    icon: Film,
    status: "In Production",
    image: "/projects/movie1.jpg"
  },
  {
    id: 2,
    title: "Digital Dreams",
    type: "album",
    description: "Electronic music album exploring AI and human connection",
    raised: "200 ETH",
    supporters: "1,500",
    icon: Music,
    status: "Recording",
    image: "/projects/album1.jpg"
  },
  {
    id: 3,
    title: "Quantum Echoes",
    type: "book",
    description: "A novel about parallel universes and quantum physics",
    raised: "150 ETH",
    supporters: "800",
    icon: Book,
    status: "Writing",
    image: "/projects/book1.jpg"
  }
];

export function FeaturedProjects() {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {projects.map((project) => {
        const Icon = project.icon;
        return (
          <Card key={project.id} className="overflow-hidden">
            <div className="aspect-video relative">
              <div className="absolute inset-0 bg-muted" />
            </div>
            <CardHeader>
              <div className="flex items-center space-x-2 mb-2">
                <Icon className="h-5 w-5 text-primary" />
                <span className="text-sm text-muted-foreground">{project.type}</span>
              </div>
              <CardTitle>{project.title}</CardTitle>
              <CardDescription>{project.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Raised</span>
                  <span className="font-medium">{project.raised}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Supporters</span>
                  <span className="font-medium">{project.supporters}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Status</span>
                  <span className="font-medium">{project.status}</span>
                </div>
                <Button className="w-full mt-4" asChild>
                  <Link href={`/projects/${project.id}`}>Buy Project Coins</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}