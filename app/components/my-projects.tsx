// components/MyProjects.tsx
import { Upload, Users, Calendar } from 'lucide-react';

const ProjectCard = ({
  image,
  title,
  ethRaised,
  thresholdPercent,
  thresholdTarget,
  deliveryDate,
  status,
}: {
  image: string;
  title: string;
  ethRaised: string;
  thresholdPercent: string;
  thresholdTarget: string;
  deliveryDate: string;
  status: string;
}) => (
  <div className="rounded-lg border overflow-hidden bg-card text-card-foreground shadow-sm">
    <div className="relative">
      <img src={image} alt={title} className="w-full aspect-video object-cover" />
      <div className="absolute top-2 right-2">
        <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-green-500 text-primary-foreground">
          {status}
        </div>
      </div>
    </div>
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <div className="space-y-3 mb-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">ETH Raised</span>
          <span className="font-medium">{ethRaised}</span>
        </div>
        <div className="space-y-1">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Threshold Progress</span>
            <span className="font-medium">{thresholdPercent}</span>
          </div>
          <div className="relative h-4 overflow-hidden rounded-full bg-secondary w-full">
            <div className="h-full w-full bg-primary transition-all" />
          </div>
          <div className="text-xs text-muted-foreground">{thresholdTarget}</div>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Delivery Date</span>
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>{deliveryDate}</span>
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <button className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full">
          <Upload className="mr-2 h-4 w-4" />
          Upload Deliverable
        </button>
        <button className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium border bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-full">
          <Users className="mr-2 h-4 w-4" />
          Request Extension
        </button>
      </div>
    </div>
  </div>
);

export const MyProjects = () => {
  const projects = [
    {
      image: 'https://arrowheads-timer.lovable.app/lovable-uploads/70a0a04f-7986-4605-8852-902d239bafc3.png',
      title: 'Digital Art Genesis Collection',
      ethRaised: '2.4 ETH',
      thresholdPercent: '120%',
      thresholdTarget: '2.4 / 2.0 ETH',
      deliveryDate: '3/1/2025',
      status: 'Threshold Met',
    },
  ];

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">My Projects ({projects.length})</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p, idx) => (
          <ProjectCard key={idx} {...p} />
        ))}
      </div>
    </div>
  );
};
