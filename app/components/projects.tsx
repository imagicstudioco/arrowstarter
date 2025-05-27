"use client";

import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Build a Solar Music Box",
    category: "experimental",
    description: "A poetic little invention for cloudy days.",
    image: "https://arrowheads-timer.lovable.app/lovable-uploads/70a0a04f-7986-4605-8852-902d239bafc3.png",
    creator: "@stellabeam",
    avatar: "https://arrowheads-timer.lovable.app/placeholder.svg",
    raised: 0.72,
    goal: 1.0,
    status: "Funding Open",
    statusColor: "bg-blue-500",
    timeLeft: "3 days",
    action: "Back This Project"
  },
  {
    id: 2,
    title: "Crypto Cookbook Vol. 1",
    category: "comics",
    description: "A digital zine of onchain recipes.",
    image: "https://arrowheads-timer.lovable.app/lovable-uploads/d6392a33-25c4-4ee2-a4ce-95adbbbeec3f.png",
    creator: "@web3chef",
    avatar: "https://arrowheads-timer.lovable.app/placeholder.svg",
    raised: 2.1,
    deadline: "3/15/2025",
    status: "Deliverable Available",
    statusColor: "bg-green-500",
    action: "Receive Deliverable"
  },
  {
    id: 3,
    title: "Experimental Music NFTs",
    category: "music",
    description: "Generative audio experiences on chain.",
    image: "https://arrowheads-timer.lovable.app/lovable-uploads/874f36d7-1c89-41ae-8126-297a249355ac.png",
    creator: "@soundwave",
    avatar: "https://arrowheads-timer.lovable.app/placeholder.svg",
    raised: 3.2,
    deadline: "1/20/2025",
    status: "Completed",
    statusColor: "bg-black-100",
    action: "View Project"
  }
];

export function Projects() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => {
        const percentRaised = project.goal
          ? Math.round((project.raised / project.goal) * 100)
          : null;

        return (
          <div
            key={project.id}
            className="rounded-lg border overflow-hidden bg-card text-card-foreground shadow-sm hover:shadow-lg transition-shadow"
          >
            <div className="relative">
              <img
                src={project.image}
                alt={project.title}
                className="w-full aspect-video object-cover"
              />
              <div className="absolute top-3 right-3">
                <span
                  className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold text-primary-foreground hover:bg-primary/80 ${project.statusColor}`}
                >
                  {project.status}
                </span>
              </div>
              <div className="absolute top-3 left-3">
                <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-background/80 backdrop-blur-sm capitalize">
                  {project.category}
                </span>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <img
                  src={project.avatar}
                  alt={project.creator}
                  className="w-5 h-5 rounded-full object-cover"
                />
                <span className="text-sm text-muted-foreground">{project.creator}</span>
              </div>
              <h3 className="text-lg font-semibold mb-2 line-clamp-1">{project.title}</h3>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{project.description}</p>

              <div className="space-y-3 mb-4">
                {percentRaised !== null ? (
                  <>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">{percentRaised}%</span>
                    </div>
                    <div
                      role="progressbar"
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-valuenow={percentRaised}
                      className="relative h-4 overflow-hidden rounded-full bg-secondary w-full"
                    >
                      <div
                        className="h-full bg-primary transition-all"
                        style={{ width: `${percentRaised}%` }}
                      />
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {project.raised} / {project.goal} ETH
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Raised</span>
                      <span className="font-medium">{project.raised} ETH</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Deadline</span>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{project.deadline}</span>
                      </div>
                    </div>
                  </>
                )}
              </div>

              <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full">
                {project.action}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
