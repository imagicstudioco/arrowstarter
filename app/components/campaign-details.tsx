"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DonationForm } from "@/components/donation-form";
import { Updates } from "@/components/updates";
import { Comments } from "@/components/comments";
import { Heart, Share2 } from "lucide-react";
import Image from "next/image";

interface Campaign {
  id: string;
  title: string;
  image?: string;
  description?: string;
  raised?: number;
  goal?: number;
  donors?: number;
  daysLeft?: number;
}

interface CampaignDetailsProps {
  campaign: Campaign | undefined;
}

export function CampaignDetails({ campaign }: CampaignDetailsProps) {
  if (!campaign) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="md:col-span-2 space-y-6">
          <div className="aspect-video relative rounded-xl overflow-hidden">
            <Image
              src={campaign.image || "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&h=450&fit=crop"}
              alt={campaign.title}
              fill
              className="object-cover"
            />
          </div>

          <Tabs defaultValue="story" className="w-full">
            <TabsList className="w-full">
              <TabsTrigger value="story" className="flex-1">Story</TabsTrigger>
              <TabsTrigger value="updates" className="flex-1">Updates</TabsTrigger>
              <TabsTrigger value="comments" className="flex-1">Comments</TabsTrigger>
            </TabsList>
            <TabsContent value="story">
              <p className="text-muted-foreground">
                {campaign.description || "No description available."}
              </p>
            </TabsContent>
            <TabsContent value="updates">
              <Updates />
            </TabsContent>
            <TabsContent value="comments">
              <Comments />
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="sticky top-6">
            <DonationForm campaign={campaign} />
          </div>
        </div>
      </div>
    </div>
  );
}
