import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  Bell,
  CheckCheck,
  Briefcase,
  Calendar,
  Award,
  FileText,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import { Card, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { notificationsMockService } from '../../services/mock/notifications.mock';
import { toast } from 'sonner';

export const StudentNotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [unreadOnly, setUnreadOnly] = useState(false);

  const fetchNotifications = useCallback(async () => {
    try {
      setLoading(true);
      const res = await notificationsMockService.getStudentNotifications({
        category: activeCategory,
        unreadOnly,
      });
      setNotifications(res.data || []);
      setUnreadCount(res.unreadCount || 0);
    } catch {
      toast.error('Failed to load notifications');
    } finally {
      setLoading(false);
    }
  }, [activeCategory, unreadOnly]);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const handleMarkAsRead = async (id, e) => {
    e?.stopPropagation();
    try {
      const res = await notificationsMockService.markNotificationRead(id);
      if (res.success) {
        setNotifications((prev) =>
          prev.map((n) => (n.id === id ? { ...n, read: true } : n))
        );
        setUnreadCount(res.unreadCount);
        toast.success('Marked as read');
      }
    } catch {
      toast.error('Failed to update notification');
    }
  };

  const handleMarkAllRead = async () => {
    try {
      const res = await notificationsMockService.markAllNotificationsRead();
      if (res.success) {
        setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
        setUnreadCount(0);
        toast.success('All notifications marked as read');
      }
    } catch {
      toast.error('Failed to mark all as read');
    }
  };

  const getCategoryIcon = (category) => {
    switch (category?.toLowerCase()) {
      case 'drive':
        return <Briefcase className="h-4 w-4 text-blue-600" />;
      case 'interview':
        return <Calendar className="h-4 w-4 text-emerald-600" />;
      case 'offer':
        return <Award className="h-4 w-4 text-amber-500" />;
      case 'assessment':
        return <FileText className="h-4 w-4 text-purple-600" />;
      case 'announcement':
      default:
        return <Bell className="h-4 w-4 text-indigo-600" />;
    }
  };

  const categories = [
    { id: 'all', label: 'All Alerts' },
    { id: 'drive', label: 'Drives' },
    { id: 'interview', label: 'Interviews' },
    { id: 'offer', label: 'Offers' },
    { id: 'assessment', label: 'Assessments' },
    { id: 'announcement', label: 'TPO Notices' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              Notification Center
            </h1>
            {unreadCount > 0 && (
              <Badge variant="primary" className="text-xs px-2.5 py-0.5 font-bold">
                {unreadCount} Unread
              </Badge>
            )}
          </div>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Real-time placement alerts, interview reminders, and campus announcements.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleMarkAllRead}
              className="text-xs font-semibold"
            >
              <CheckCheck className="h-3.5 w-3.5 mr-1.5" />
              Mark All as Read
            </Button>
          )}
        </div>
      </div>

      {/* Filter Tabs and Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-3">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                activeCategory === cat.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Unread Only Toggle */}
        <label className="flex items-center gap-2 text-xs font-medium text-slate-600 dark:text-slate-300 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={unreadOnly}
            onChange={(e) => setUnreadOnly(e.target.checked)}
            className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
          />
          Show Unread Only
        </label>
      </div>

      {/* Notification List */}
      {loading ? (
        <div className="py-16 text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-r-transparent align-[-0.125em]" />
          <p className="mt-3 text-sm font-medium text-slate-500 dark:text-slate-400">
            Updating alerts...
          </p>
        </div>
      ) : notifications.length === 0 ? (
        <Card className="py-14 text-center">
          <CardContent className="space-y-3">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400">
              <CheckCircle2 className="h-6 w-6 text-emerald-500" />
            </div>
            <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
              You're all caught up!
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
              {unreadOnly
                ? 'No unread notifications at the moment. Switch toggle to view all historical notices.'
                : 'No alerts found for this category filter.'}
            </p>
            {unreadOnly && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setUnreadOnly(false)}
                className="mt-2 text-xs"
              >
                Show All Notifications
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {notifications.map((item) => (
            <div
              key={item.id}
              onClick={() => !item.read && handleMarkAsRead(item.id)}
              className={`group flex items-start gap-4 rounded-xl border p-4 transition-all ${
                item.read
                  ? 'border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 opacity-80 hover:opacity-100'
                  : 'border-blue-200 bg-blue-50/40 dark:border-blue-900/50 dark:bg-blue-950/20 shadow-xs'
              }`}
            >
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                  item.read
                    ? 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                    : 'bg-white dark:bg-slate-800 shadow-xs border border-blue-100 dark:border-blue-900/40'
                }`}
              >
                {getCategoryIcon(item.category)}
              </div>

              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`font-semibold text-sm ${
                        item.read
                          ? 'text-slate-800 dark:text-slate-200'
                          : 'text-slate-900 dark:text-slate-50 font-bold'
                      }`}
                    >
                      {item.title}
                    </span>
                    {!item.read && (
                      <span className="h-2 w-2 rounded-full bg-blue-600 ring-2 ring-blue-200 dark:ring-blue-900" />
                    )}
                  </div>
                  <span className="text-xs text-slate-400 font-medium">
                    {item.timestamp}
                  </span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {item.description}
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Badge variant="outline" className="text-[10px] capitalize py-0">
                    {item.category}
                  </Badge>

                  {item.actionUrl && (
                    <Link
                      to={item.actionUrl}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400"
                    >
                      {item.actionLabel || 'View Details'}
                      <ExternalLink className="h-3 w-3" />
                    </Link>
                  )}

                  {!item.read && (
                    <button
                      type="button"
                      onClick={(e) => handleMarkAsRead(item.id, e)}
                      className="text-[11px] font-medium text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 ml-auto"
                    >
                      Mark as read
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentNotificationsPage;
