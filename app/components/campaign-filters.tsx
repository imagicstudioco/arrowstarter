"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export function CampaignFilters() {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold mb-4">Categories</h3>
            <div className="space-y-3">
              {["Medical", "Education", "Emergency", "Nonprofit", "Animals"].map(
                (category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox id={category.toLowerCase()} />
                    <Label htmlFor={category.toLowerCase()}>{category}</Label>
                  </div>
                )
              )}
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="font-semibold mb-4">Goal Amount</h3>
            <div className="space-y-3">
              {[
                "Under $1,000",
                "$1,000 - $10,000",
                "$10,000 - $50,000",
                "Over $50,000",
              ].map((range) => (
                <div key={range} className="flex items-center space-x-2">
                  <Checkbox id={range.toLowerCase().replace(/\s/g, "-")} />
                  <Label htmlFor={range.toLowerCase().replace(/\s/g, "-")}>
                    {range}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Button className="w-full">Apply Filters</Button>
        </div>
      </CardContent>
    </Card>
  );
}