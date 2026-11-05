import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';
import GlobalSearchModal from '../components/common/GlobalSearchModal';
import { ROLES } from '../constants/roles';

export const TpoLayout = () => {
  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
      <Sidebar role={ROLES.TPO} />
      <div className="flex flex-1 flex-col min-w-0">
        <Header title="Training & Placement Office (TPO)" />
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
      <GlobalSearchModal />
    </div>
  );
};

export default TpoLayout;

