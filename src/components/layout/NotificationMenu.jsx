import React, { useState } from 'react';
import { Bell, Check, Clock } from 'lucide-react';
import Dropdown from '../ui/Dropdown';
import { Badge } from '../ui/Badge';
import { cn } from '../../utils/cn';

const SAMPLE_NOTIFICATIONS = [
  {
    id: 1,
    title: 'Drive Shortlist Published',
    description: 'Google Cloud India shortlisted 38 candidates for Round 1.',
    time: '15m ago',
    unread: true,
  },
  {
    id: 2,
    title: 'Upcoming Mock Assessment',
    description: 'System Design & DSA test goes live tomorrow at 10:00 AM.',
    time: '2h ago',
    unread: true,
  },
  {
    id: 3,
    title: 'Application Received',
    description: 'NovaTech Global confirmed your application for SWE role.',
    time: '1d ago',
    unread: false,
  },
];

export const NotificationMenu = () => {
  const [notifications, setNotifications] = useState(SAMPLE_NOTIFICATIONS);
  const unreadCount = notifications.filter((n) => n.unread).length;

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const trigger = (
    <div className="relative rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100 transition-colors cursor-pointer">
      <Bell className="h-5 w-5" />
      {unreadCount > 0 && (
        <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white ring-2 ring-white dark:ring-slate-900">
          {unreadCount}
        </span>
      )}
    </div>
  );

  return (
    <Dropdown
      trigger={trigger}
      align="right"
      menuClassName="w-80 p-0 overflow-hidden shadow-xl"
      items={[
        {
          label: (
            <div className="w-full">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 px-4 py-3 bg-slate-50/70 dark:bg-slate-800/40">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-900 dark:text-slate-100 text-sm">Notifications</span>
                  {unreadCount > 0 && (
                    <Badge variant="primary" className="text-[10px] py-0 px-1.5">
                      {unreadCount} new
                    </Badge>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      markAllAsRead();
                    }}
                    className="text-xs text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1 cursor-pointer"
                  >
                    <Check className="h-3 w-3" /> Mark read
                  </button>
                )}
              </div>
              <div className="max-h-72 divide-y divide-slate-100 overflow-y-auto dark:divide-slate-800">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className={cn(
                      'p-3.5 transition-colors text-left hover:bg-slate-50 dark:hover:bg-slate-800/50',
                      n.unread && 'bg-blue-50/40 dark:bg-blue-950/20'
                    )}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-xs font-semibold text-slate-900 dark:text-slate-100">
                        {n.title}
                      </p>
                      <span className="flex items-center text-[10px] text-slate-400 shrink-0">
                        <Clock className="mr-1 h-2.5 w-2.5" />
                        {n.time}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      {n.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ),
        },
      ]}
    />
  );
};

export default NotificationMenu;

