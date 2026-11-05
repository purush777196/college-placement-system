import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Layers, Database } from 'lucide-react';

export const AboutPage = () => {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 space-y-12">
      <div className="text-center space-y-4">
        <Badge variant="primary">CampusConnect System Architecture</Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100">
          Engineered for Enterprise Campus Placements
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          A dual-phase decoupled architecture: React 19 + Tailwind CSS v4 design system on the frontend, prepared for high-performance Django REST Framework backend integration.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-600">
                <Layers className="h-5 w-5" />
              </div>
              <CardTitle>Frontend Foundation (Phase 0)</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            <p>• React 19 + Vite rapid bundling with zero runtime bloat.</p>
            <p>• Tailwind CSS v4 utility architecture with enterprise color tokens.</p>
            <p>• Accessible UI primitives patterned after shadcn/ui.</p>
            <p>• Client-side role switching with reactive Zustand state stores.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-indigo-100 dark:bg-indigo-950 text-indigo-600">
                <Database className="h-5 w-5" />
              </div>
              <CardTitle>Upcoming Backend Integration (Phase 2)</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            <p>• Django 5 REST Framework with Python 3.12+ async capabilities.</p>
            <p>• PostgreSQL relational database with transactional integrity.</p>
            <p>• SimpleJWT secure authentication and fine-grained permissions.</p>
            <p>• Celery + Redis background job processing for bulk notifications.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AboutPage;
