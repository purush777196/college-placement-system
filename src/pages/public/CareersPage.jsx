import React from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import { MapPin } from 'lucide-react';

export const CareersPage = () => {
  const openings = [
    {
      title: 'Senior Placement Coordinator',
      team: 'University Operations',
      location: 'Bengaluru / On-Site',
      type: 'Full-Time',
    },
    {
      title: 'Enterprise Recruiter Liaison',
      team: 'Corporate Relations',
      location: 'Hyderabad / Hybrid',
      type: 'Full-Time',
    },
    {
      title: 'AI/ML Systems Engineer',
      team: 'Platform Engineering',
      location: 'Remote',
      type: 'Full-Time',
    },
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 space-y-8">
      <div className="text-center space-y-3">
        <Badge variant="primary">CampusConnect Team</Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100">
          Build the Future of University Career Mobility
        </h1>
        <p className="text-sm sm:text-base text-slate-500 max-w-xl mx-auto">
          Join our mission to empower millions of university students to discover, prepare for, and secure their dream career opportunities.
        </p>
      </div>

      <div className="space-y-4">
        {openings.map((job) => (
          <Card key={job.title} className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-slate-900 dark:text-slate-100">{job.title}</h3>
                <Badge variant="outline">{job.type}</Badge>
              </div>
              <p className="text-xs text-slate-500 flex items-center gap-3">
                <span>{job.team}</span>
                <span>•</span>
                <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {job.location}</span>
              </p>
            </div>
            <Button size="sm" variant="secondary">
              Apply Now
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CareersPage;
