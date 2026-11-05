import React from 'react';
import { Link } from 'react-router-dom';
import { FileQuestion, Home } from 'lucide-react';
import Button from '../components/ui/Button';

export const NotFoundPage = () => {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center p-6 text-center">
      <div className="rounded-full bg-blue-100 p-4 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400 mb-4">
        <FileQuestion className="h-10 w-10" />
      </div>
      <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100">
        404 - Page Not Found
      </h1>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 max-w-md">
        The route or campus placement resource you requested does not exist or has been relocated.
      </p>
      <div className="mt-6">
        <Link to="/">
          <Button variant="primary" size="sm" leftIcon={<Home className="h-4 w-4" />}>
            Return to CampusConnect Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;

