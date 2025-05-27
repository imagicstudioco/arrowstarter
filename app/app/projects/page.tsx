"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Film, Book, Music, Search } from "lucide-react";
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
    image: "/projects/movie1.jpg",
    category: "movies"
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
    image: "/projects/album1.jpg",
    category: "albums"
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
    image: "/projects/book1.jpg",
    category: "books"
  },
  {
    id: 4,
    title: "Midnight Run",
    type: "movie",
    description: "Action-packed thriller set in the streets of Tokyo",
    raised: "300 ETH",
    supporters: "1,200",
    icon: Film,
    status: "Pre-Production",
    image: "/projects/movie2.jpg",
    category: "movies"
  },
  {
    id: 5,
    title: "Echoes of Silence",
    type: "album",
    description: "Acoustic album featuring traditional instruments",
    raised: "180 ETH",
    supporters: "900",
    icon: Music,
    status: "Mixing",
    image: "/projects/album2.jpg",
    category: "albums"
  },
  {
    id: 6,
    title: "The Lost City",
    type: "book",
    description: "Historical fiction about ancient civilizations",
    raised: "120 ETH",
    supporters: "600",
    icon: Book,
    status: "Editing",
    image: "/projects/book2.jpg",
    category: "books"
  }
];

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("all");

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = category === "all" || project.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold">All Projects</h1>
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search projects..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="movies">Movies</SelectItem>
              <SelectItem value="books">Books</SelectItem>
              <SelectItem value="albums">Albums</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => {
          const Icon = project.icon;
          return (
            <Card key={project.id} className="overflow-hidden">
              <div className="aspect-video relative">
                <div className="absolute inset-0 bg-muted" />
              </div>
              <CardHeader>
                <div className="flex items-center space-x-2 mb-2">
                  <Icon className="h-5 w-5 text-primary" />
                  <span className="text-sm text-muted-foreground capitalize">{project.type}</span>
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

      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold mb-2">No projects found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
}