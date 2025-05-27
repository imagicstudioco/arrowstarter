import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { formatDistanceToNow } from "date-fns";

export function Comments() {
  const comments = [
    {
      id: 1,
      user: {
        name: "Sarah Johnson",
        avatar: "https://i.pravatar.cc/150?u=sarah",
        initials: "SJ",
      },
      content: "This is such an important cause. Happy to support!",
      date: new Date("2024-03-10"),
      donation: 50,
    },
    {
      id: 2,
      user: {
        name: "Michael Chen",
        avatar: "https://i.pravatar.cc/150?u=michael",
        initials: "MC",
      },
      content: "Keep up the great work! Rooting for your success.",
      date: new Date("2024-03-09"),
      donation: 100,
    },
    {
      id: 3,
      user: {
        name: "Emma Wilson",
        avatar: "https://i.pravatar.cc/150?u=emma",
        initials: "EW",
      },
      content: "Inspiring initiative. Shared with my network!",
      date: new Date("2024-03-08"),
      donation: 25,
    },
  ];

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Leave a Comment</h3>
        <div className="space-y-4">
          <Textarea placeholder="Write your message..." />
          <Button>Post Comment</Button>
        </div>
      </Card>

      <div className="space-y-4">
        {comments.map((comment) => (
          <Card key={comment.id} className="p-6">
            <div className="flex gap-4">
              <Avatar>
                <AvatarImage src={comment.user.avatar} />
                <AvatarFallback>{comment.user.initials}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-semibold">{comment.user.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      Donated ${comment.donation}
                    </p>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {formatDistanceToNow(comment.date, { addSuffix: true })}
                  </span>
                </div>
                <p className="text-muted-foreground">{comment.content}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}