"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Project {
  id: string;
  title: string;
  description: string;
  status: "draft" | "live" | "completed";
  progress: number;
}

const mockProjects: Project[] = [
  {
    id: "1",
    title: "ZK Messaging App",
    description: "A private Farcaster frame for anonymous feedback.",
    status: "live",
    progress: 75,
  },
  {
    id: "2",
    title: "Onchain Roast Battles",
    description: "Farcaster mini-app for onchain battle tournaments.",
    status: "draft",
    progress: 30,
  },
  {
    id: "3",
    title: "Melobanc Creator Hub",
    description: "Platform for web3 music creators to showcase work.",
    status: "completed",
    progress: 100,
  },
];

const statusColorMap: Record<Project["status"], string> = {
  draft: "bg-yellow-100 text-yellow-800",
  live: "bg-green-100 text-green-800",
  completed: "bg-blue-100 text-blue-800",
};

export function MyProjects() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {mockProjects.map((project) => (
        <Card key={project.id} className="p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold">{project.title}</h3>
              <Badge className={statusColorMap[project.status]}>
                {project.status}
              </Badge>
            </div>
            <p className="text-muted-foreground text-sm mb-4">
              {project.description}
            </p>
            <div className="mb-4">
              <Progress value={project.progress} />
              <p className="text-xs mt-1">{project.progress}% complete</p>
            </div>
          </div>
          <div className="flex justify-between items-center mt-auto">
            <Avatar className="h-6 w-6">
              <AvatarFallback>
                {project.title.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <Button size="sm" variant="outline" asChild>
              <Link href={`/projects/${project.id}`}>Manage</Link>
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}
