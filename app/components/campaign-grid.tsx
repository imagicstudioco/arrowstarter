import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import Image from "next/image";
import campaignsData from "@/data/campaigns.json";

interface Campaign {
  id: number;
  title: string;
  image: string;
  description: string;
  raised: number;
  goal: number;
  donors: number;
  daysLeft: number;
  category: string;
}

const CampaignGrid = () => {
  const { campaigns } = campaignsData;

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {campaigns.map((campaign: Campaign) => (
        <Link key={campaign.id} href={`/campaigns/${campaign.id}`}>
          <Card className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-[4/3] relative">
              <Image
                src={campaign.image}
                alt={campaign.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="font-semibold text-xl mb-2">{campaign.title}</h3>
              <p className="text-muted-foreground text-sm mb-4">
                {campaign.description}
              </p>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Raised</span>
                    <span className="font-medium">
                      ${campaign.raised.toLocaleString()} of ${campaign.goal.toLocaleString()}
                    </span>
                  </div>
                  <Progress
                    value={(campaign.raised / campaign.goal) * 100}
                    className="h-2"
                  />
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{campaign.donors} donors</span>
                  <span>{campaign.daysLeft} days left</span>
                </div>
              </div>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default CampaignGrid;