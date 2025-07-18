"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DollarSign,
  Calendar,
  Clock,
} from "lucide-react";

interface Project {
  id: string;
  title: string;
  image: string;
  creator: {
    name: string;
    avatar: string;
  };
  statusBadge: {
    label: string;
    variant?: "default" | "outline";
  };
  backed: string;
  deadline: string;
  progressLabel: string;
  progressRatio: string;
  progressPercent: number;
  actions: string[];
}

const projects: Project[] = [
  {
    id: "1",
    title: "Build a Solar Music Box",
    image: "https://arrowheads-timer.lovable.app/lovable-uploads/70a0a04f-7986-4605-8852-902d239bafc3.png",
    creator: {
      name: "@stellabeam",
      avatar: "https://arrowheads-timer.lovable.app/placeholder.svg",
    },
    statusBadge: {
      label: "Refundable",
    },
    backed: "0.03 ETH",
    deadline: "Passed",
    progressLabel: "Progress: 72%",
    progressRatio: "0.72 / 1.0 ETH",
    progressPercent: 72,
    actions: ["Manage Backing"],
  },
  {
    id: "2",
    title: "Crypto Cookbook Vol. 1",
    image: "https://arrowheads-timer.lovable.app/lovable-uploads/d6392a33-25c4-4ee2-a4ce-95adbbbeec3f.png",
    creator: {
      name: "@web3chef",
      avatar: "https://arrowheads-timer.lovable.app/placeholder.svg",
    },
    statusBadge: {
      label: "Deliverable Available",
      variant: "default",
    },
    backed: "0.05 ETH",
    deadline: "Passed",
    progressLabel: "Progress: 140%",
    progressRatio: "2.1 / 1.5 ETH",
    progressPercent: 100,
    actions: ["Manage Backing", "Receive Deliverable"],
  },
];

export function BackedProjects() {
  return (
    <div className="space-y-4">
      {projects.map((project) => (
        <div key={project.id} className="rounded-lg border p-6 bg-card">
          <div className="flex gap-6">
            <Image
              src={project.image}
              alt={project.title}
              width={96}
              height={96}
              className="w-24 h-24 rounded-md object-cover"
            />
            <div className="flex-1 space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-semibold">{project.title}</h3>
                  <Badge variant={project.statusBadge.variant}>
                    {project.statusBadge.label}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Image
                    src={project.creator.avatar}
                    alt={project.creator.name}
                    width={16}
                    height={16}
                    className="w-4 h-4 rounded-full"
                  />
                  <span>by {project.creator.name}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  <span>Backed: {project.backed}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>Deadline: {project.deadline}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{project.progressLabel}</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Funding Progress</span>
                  <span>{project.progressRatio}</span>
                </div>
                <div className="relative h-4 w-full overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-full bg-primary transition-all"
                    style={{
                      width: `${Math.min(project.progressPercent, 100)}%`,
                    }}
                  />
                </div>
              </div>

              <div className="flex gap-3">
                {project.actions.map((action) => (
                  <Button key={action} variant={action.includes("Deliverable") ? "outline" : "default"}>
                    {action}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
