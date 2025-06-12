"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock } from "lucide-react";
import { Project, getProjects } from "@/lib/api";

export function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (err) {
        setError("Failed to load projects");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="rounded-lg border overflow-hidden bg-card text-card-foreground shadow-sm animate-pulse">
            <div className="aspect-video bg-muted" />
            <div className="p-4 space-y-4">
              <div className="h-4 bg-muted rounded w-3/4" />
              <div className="h-4 bg-muted rounded w-1/2" />
              <div className="h-4 bg-muted rounded w-2/3" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-destructive">{error}</p>
      </div>
    );
  }

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
              <Image
                src={project.image || "/placeholder.png"}
                alt={project.title}
                className="w-full aspect-video object-cover"
                width={800}
                height={450}
              />
              <div className="absolute top-3 right-3">
                <span
                  className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold text-primary-foreground ${
                    project.status === "Funding Open" ? "bg-blue-500" :
                    project.status === "Completed" ? "bg-green-500" :
                    "bg-yellow-500"
                  }`}
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
                <span className="text-sm text-muted-foreground">
                  {project.creatorAddress.slice(0, 6)}...{project.creatorAddress.slice(-4)}
                </span>
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
                      <span className="text-muted-foreground">Supporters</span>
                      <span className="font-medium">{project.supporters}</span>
                    </div>
                  </>
                )}
              </div>

              <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full">
                {project.status === "Funding Open" ? "Back This Project" : "View Project"}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
