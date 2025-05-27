"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";

interface DonationFormProps {
  campaign: {
    id: string;
    title: string;
    raised?: number;
    goal?: number;
    donors?: number;
    daysLeft?: number;
  }
}

export function DonationForm({ campaign }: DonationFormProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-6">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Raised</span>
              <span className="font-medium">
                ${campaign.raised?.toLocaleString()} of ${campaign.goal?.toLocaleString()}
              </span>
            </div>
            <Progress
              value={campaign.raised && campaign.goal ? (campaign.raised / campaign.goal) * 100 : 0}
              className="h-2"
            />
            <div className="flex justify-between text-sm text-muted-foreground mt-2">
              <span>{campaign.donors} donors</span>
              <span>{campaign.daysLeft} days left</span>
            </div>
          </div>

          <div className="space-y-4">
            <Button className="w-full">Donate Now</Button>
            <Button variant="outline" className="w-full">Share</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}