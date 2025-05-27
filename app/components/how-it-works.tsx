import { Card } from "@/components/ui/card";
import { PenLine, Heart, Share2 } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      icon: PenLine,
      title: "Start Your Campaign",
      description: "Create your fundraiser in minutes. Tell your story and add photos.",
    },
    {
      icon: Share2,
      title: "Share with Friends",
      description: "Share your campaign on social media and email to gather support.",
    },
    {
      icon: Heart,
      title: "Receive Donations",
      description: "Watch your donations grow as people support your cause.",
    },
  ];

  return (
    <div className="grid md:grid-cols-3 gap-8">
      {steps.map((step, index) => (
        <Card key={index} className="p-6 text-center">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
            <step.icon className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
          <p className="text-muted-foreground">{step.description}</p>
        </Card>
      ))}
    </div>
  );
}