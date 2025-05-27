"use client";

import { useState } from "react";
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
    image:
      "https://arrowheads-timer.lovable.app/lovable-uploads/70a0a04f-7986-4605-8852-902d239bafc3.png",
    category: "art",
    creator: "@luisotravez",
    avatar: "https://arrowheads-timer.lovable.app/placeholder.svg",
  },
];

export function HeroFeatured() {
  const [showModal, setShowModal] = useState(false);
  const project = projects[0];
  const Icon = project.icon;

  return (
    <>
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
                  <span className="text-muted-foreground">
                    by {project.creator}
                  </span>
                </div>
                <p className="text-muted-foreground text-lg">
                  {project.description}
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Funding Progress
                    </span>
                    <span className="font-semibold">
                      {project.percentage}%
                    </span>
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
                <Button
                  className="h-11 rounded-md px-8"
                  onClick={() => setShowModal(true)}
                >
                  Back This Project
                </Button>
              </div>
            </div>
            <div>
              <img
                src={project.image}
                alt={project.title}
                className="rounded-lg w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <>
          <div
            data-state="open"
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
            style={{ pointerEvents: "auto" }}
            aria-hidden="true"
            onClick={() => setShowModal(false)}
          />
          <div
            role="dialog"
            className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg md:w-full sm:max-w-[500px] max-h-[90vh] overflow-y-auto"
            style={{ pointerEvents: "auto" }}
          >
            <div className="flex flex-col space-y-1.5 text-center sm:text-left">
              <h2 className="text-lg font-semibold leading-none tracking-tight">
                Back This Project
              </h2>
              <p className="text-sm text-muted-foreground">
                Step 1 of 4 - Digital Art Collection Genesis
              </p>
            </div>

            <div className="flex items-center justify-between mb-6">
              {[1, 2, 3, 4].map((step, i) => (
                <div
                  key={i}
                  className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                    step === 1
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {step}
                </div>
              ))}
            </div>

            <div className="py-4 space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">
                  Choose Backing Amount
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  This project only accepts backings in 0.01 ETH increments
                </p>
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {["0.01", "0.02", "0.03", "0.05", "0.1", "0.25", "0.5"].map(
                    (eth) => (
                      <button
                        key={eth}
                        className={`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border ${
                          eth === "0.01"
                            ? "bg-primary text-primary-foreground hover:bg-primary/90"
                            : "border-input bg-background hover:bg-accent hover:text-accent-foreground"
                        } h-10 px-4 py-2 text-sm`}
                      >
                        {eth} ETH
                      </button>
                    )
                  )}
                </div>
                <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">Backing 0.01 ETH</span>
                    <span className="text-muted-foreground">(1 unit)</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Estimated: 30 $arrow or 1 NFT per unit
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <button
                disabled
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 opacity-50"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-arrow-left mr-2 h-4 w-4"
                >
                  <path d="m12 19-7-7 7-7" />
                  <path d="M19 12H5" />
                </svg>
                Previous
              </button>
              <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                Next
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-arrow-right ml-2 h-4 w-4"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </button>
            </div>

            <button
              type="button"
              className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              onClick={() => setShowModal(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-x h-4 w-4"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
              <span className="sr-only">Close</span>
            </button>
          </div>
        </>
      )}
    </>
  );
}
