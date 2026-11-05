import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Briefcase, Building2, ArrowRight } from 'lucide-react';
import Modal from '../ui/Modal';
import { useUIStore } from '../../store/uiStore';
import { MOCK_DRIVES } from '../../services/mock/drives.mock';
import { MOCK_COMPANIES } from '../../services/mock/companies.mock';

export const GlobalSearchModal = () => {
  const isSearchModalOpen = useUIStore((state) => state.isSearchModalOpen);
  const setSearchModalOpen = useUIStore((state) => state.setSearchModalOpen);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchModalOpen(!isSearchModalOpen);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchModalOpen, setSearchModalOpen]);

  const filteredDrives = query
    ? MOCK_DRIVES.filter(
        (d) =>
          d.companyName.toLowerCase().includes(query.toLowerCase()) ||
          d.roleTitle.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const filteredCompanies = query
    ? MOCK_COMPANIES.filter(
        (c) =>
          c.name.toLowerCase().includes(query.toLowerCase()) ||
          c.industry.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const handleSelect = (path) => {
    setSearchModalOpen(false);
    setQuery('');
    navigate(path);
  };

  return (
    <Modal
      isOpen={isSearchModalOpen}
      onClose={() => setSearchModalOpen(false)}
      maxWidth="max-w-xl"
      showClose={false}
      className="p-0 overflow-hidden"
    >
      <div className="flex items-center px-4 border-b border-slate-200 dark:border-slate-800">
        <Search className="h-5 w-5 text-slate-400 mr-3" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type to search drives, companies, roles..."
          autoFocus
          className="h-14 w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none dark:text-slate-100"
        />
        <kbd className="hidden sm:inline-block rounded bg-slate-100 px-2 py-0.5 text-xs text-slate-500 dark:bg-slate-800 dark:text-slate-400">
          ESC
        </kbd>
      </div>

      <div className="max-h-96 overflow-y-auto p-4 space-y-4">
        {!query && (
          <div className="py-8 text-center text-xs text-slate-400">
            Search for active placement drives, corporate partners, or navigation items.
          </div>
        )}

        {query && filteredDrives.length === 0 && filteredCompanies.length === 0 && (
          <div className="py-8 text-center text-xs text-slate-400">
            No matching placement records found for &quot;{query}&quot;.
          </div>
        )}

        {filteredDrives.length > 0 && (
          <div>
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2 px-2">
              Placement Drives
            </p>
            <div className="space-y-1">
              {filteredDrives.map((drive) => (
                <button
                  key={drive.id}
                  type="button"
                  onClick={() => handleSelect('/student/dashboard')}
                  className="flex w-full items-center justify-between p-2.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-left transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <Briefcase className="h-4 w-4 text-blue-600" />
                    <div>
                      <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                        {drive.roleTitle}
                      </p>
                      <p className="text-[11px] text-slate-500">{drive.companyName} • {drive.packageLPA} LPA</p>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-slate-400" />
                </button>
              ))}
            </div>
          </div>
        )}

        {filteredCompanies.length > 0 && (
          <div>
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2 px-2">
              Partner Companies
            </p>
            <div className="space-y-1">
              {filteredCompanies.map((company) => (
                <button
                  key={company.id}
                  type="button"
                  onClick={() => handleSelect('/tpo/dashboard')}
                  className="flex w-full items-center justify-between p-2.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-left transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <Building2 className="h-4 w-4 text-emerald-600" />
                    <div>
                      <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                        {company.name}
                      </p>
                      <p className="text-[11px] text-slate-500">{company.industry} • {company.tier}</p>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-slate-400" />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default GlobalSearchModal;
