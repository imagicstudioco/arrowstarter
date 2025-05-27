"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Film, Book, Music } from "lucide-react";
import Link from "next/link";

const categories = [
  {
    id: "movies",
    title: "Movies",
    description: "Support independent filmmakers and get exclusive behind-the-scenes access",
    icon: Film,
    count: "12 active projects"
  },
  {
    id: "books",
    title: "Books",
    description: "Help authors publish their work and receive signed copies and early access",
    icon: Book,
    count: "8 active projects"
  },
  {
    id: "albums",
    title: "Albums",
    description: "Support musicians and get VIP concert tickets and exclusive merchandise",
    icon: Music,
    count: "15 active projects"
  }
];

export function Categories() {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {categories.map((category) => {
        const Icon = category.icon;
        return (
          <Link key={category.id} href={`/projects/category/${category.id}`}>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle>{category.title}</CardTitle>
                    <CardDescription>{category.count}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{category.description}</p>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}