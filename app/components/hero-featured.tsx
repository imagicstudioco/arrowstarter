"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Film } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "The Last Sunset",
    type: "movie",
    description: "A sci-fi thriller about time travel and redemption",
    raised: "4.2 ETH",
    goal: "5.0 ETH",
    percentage: 84,
    daysLeft: "8 days left",
    supporters: "2,000",
    status: "In Production",
    icon: Film,
    image: "https://arrowheads-timer.lovable.app/lovable-uploads/70a0a04f-7986-4605-8852-902d239bafc3.png",
    category: "art",
    creator: "@luisotravez",
    avatar: "https://arrowheads-timer.lovable.app/placeholder.svg",
  },
];

export function HeroFeatured() {
  const project = projects[0]; // Only showing one featured project for now
  const Icon = project.icon;

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Featured Project</h2>
      <div className="relative rounded-xl overflow-hidden bg-gradient-to-r from-primary/10 to-secondary/10 border">
        <div className="grid lg:grid-cols-2 gap-6 p-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-primary text-primary-foreground">
                  Featured
                </span>
                <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold capitalize text-foreground">
                  {project.category}
                </span>
              </div>
              <h2 className="text-3xl font-bold">{project.title}</h2>
              <div className="flex items-center gap-2">
                <img
                  src={project.avatar}
                  alt={project.creator}
                  className="w-6 h-6 rounded-full object-cover"
                />
                <span className="text-muted-foreground">by {project.creator}</span>
              </div>
              <p className="text-muted-foreground text-lg">
                {project.description}
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Funding Progress</span>
                  <span className="font-semibold">{project.percentage}%</span>
                </div>
                <div
                  role="progressbar"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={project.percentage}
                  className="relative w-full overflow-hidden rounded-full bg-secondary h-3"
                >
                  <div
                    className="h-full bg-primary transition-all"
                    style={{ width: `${project.percentage}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{project.raised} raised</span>
                  <span>Goal: {project.goal}</span>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <svg
                    className="lucide lucide-clock h-4 w-4"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  <span>{project.daysLeft}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button className="h-11 rounded-md px-8">
                Back This Project
                <svg
                  className="lucide lucide-arrow-right ml-2 h-4 w-4"
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Button>
              <Button
                variant="outline"
                className="h-11 rounded-md px-8 border border-input"
              >
                Learn More
              </Button>
            </div>
          </div>

          <div className="relative">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
