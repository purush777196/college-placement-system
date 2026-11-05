import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, ArrowLeft, Home } from 'lucide-react';
import Button from '../components/ui/Button';

export const UnauthorizedPage = () => {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center p-6 text-center">
      <div className="rounded-full bg-rose-100 p-4 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400 mb-4">
        <ShieldAlert className="h-10 w-10" />
      </div>
      <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100">
        403 - Access Restricted
      </h1>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 max-w-md">
        Your active demonstration account does not have permission to view this section. Use the top-right profile menu to switch roles.
      </p>
      <div className="mt-6 flex items-center gap-3">
        <Link to="/auth/login">
          <Button variant="outline" size="sm" leftIcon={<ArrowLeft className="h-4 w-4" />}>
            Switch Demo Role
          </Button>
        </Link>
        <Link to="/">
          <Button variant="primary" size="sm" leftIcon={<Home className="h-4 w-4" />}>
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default UnauthorizedPage;

