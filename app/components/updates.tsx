import { Card } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";

export function Updates() {
  const updates = [
    {
      id: 1,
      title: "Halfway to Our Goal!",
      content: "Thanks to your incredible support, we've reached 50% of our fundraising goal...",
      date: new Date("2024-03-10"),
    },
    {
      id: 2,
      title: "New Photos from the Project",
      content: "We wanted to share some recent photos showing the progress we've made...",
      date: new Date("2024-03-05"),
    },
    {
      id: 3,
      title: "Thank You to Our Supporters",
      content: "We're overwhelmed by the support we've received from our community...",
      date: new Date("2024-03-01"),
    },
  ];

  return (
    <div className="space-y-6">
      {updates.map((update) => (
        <Card key={update.id} className="p-6">
          <h3 className="text-xl font-semibold mb-2">{update.title}</h3>
          <p className="text-sm text-muted-foreground mb-4">
            {formatDistanceToNow(update.date, { addSuffix: true })}
          </p>
          <p className="text-muted-foreground">{update.content}</p>
        </Card>
      ))}
    </div>
  );
}