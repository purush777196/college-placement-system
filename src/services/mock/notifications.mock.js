/**
 * Mock Student Notifications Service
 * Dispatches realistic placement alerts, interview reminders, and TPO notices.
 */

const delay = (ms = 150) => new Promise((resolve) => setTimeout(resolve, ms));

export const INITIAL_NOTIFICATIONS = [
  {
    id: 'notif-1',
    title: 'Technical Interview Confirmed',
    description: 'Your Technical Round 1 for Google Cloud India has been confirmed for Nov 12 at 10:30 AM.',
    category: 'interview',
    timestamp: '25 minutes ago',
    read: false,
    actionUrl: '/student/interviews',
    actionLabel: 'View Meeting Link',
  },
  {
    id: 'notif-2',
    title: 'Formal Offer Letter Released',
    description: 'NovaTech Global Inc. has released your formal appointment letter with a CTC of ₹18.5 LPA.',
    category: 'offer',
    timestamp: '2 hours ago',
    read: false,
    actionUrl: '/student/applications',
    actionLabel: 'Inspect Offer',
  },
  {
    id: 'notif-3',
    title: 'New Placement Drive Published',
    description: 'Amazon Web Services is recruiting for Associate Solutions Architect (₹30.0 LPA). Check eligibility now.',
    category: 'drive',
    timestamp: '1 day ago',
    read: false,
    actionUrl: '/student/drives/DRV-2026-04',
    actionLabel: 'Check Drive Details',
  },
  {
    id: 'notif-4',
    title: 'TPO Notice: Pre-Placement Briefing',
    description: 'Dr. Ramesh Kulkarni has scheduled a mandatory online session on placement conduct and dream drive rules.',
    category: 'announcement',
    timestamp: '2 days ago',
    read: true,
    actionUrl: '/student/dashboard',
    actionLabel: 'Review Notice',
  },
  {
    id: 'notif-5',
    title: 'Assessment Window Reminder',
    description: 'Horizon FinTech Group online algorithmic challenge window closes tomorrow at 11:59 PM.',
    category: 'assessment',
    timestamp: '3 days ago',
    read: true,
    actionUrl: '/student/applications',
    actionLabel: 'View Test Link',
  },
  {
    id: 'notif-6',
    title: 'Profile Verification Complete',
    description: 'Your 7th semester CGPA (8.85) and academic transcript have been approved by the placement cell.',
    category: 'profile',
    timestamp: '5 days ago',
    read: true,
  },
];

let sessionNotifications = [...INITIAL_NOTIFICATIONS];

export const notificationsMockService = {
  async getStudentNotifications(filters = {}) {
    await delay();
    let result = [...sessionNotifications];

    if (filters.category && filters.category !== 'all') {
      result = result.filter((n) => n.category.toLowerCase() === filters.category.toLowerCase());
    }

    if (filters.unreadOnly) {
      result = result.filter((n) => !n.read);
    }

    const unreadCount = sessionNotifications.filter((n) => !n.read).length;

    return {
      data: result,
      total: result.length,
      unreadCount,
    };
  },

  async markNotificationRead(notificationId) {
    await delay(80);
    sessionNotifications = sessionNotifications.map((n) =>
      n.id === notificationId ? { ...n, read: true } : n
    );
    const unreadCount = sessionNotifications.filter((n) => !n.read).length;
    return {
      success: true,
      unreadCount,
    };
  },

  async markAllNotificationsRead() {
    await delay(100);
    sessionNotifications = sessionNotifications.map((n) => ({ ...n, read: true }));
    return {
      success: true,
      unreadCount: 0,
    };
  },

  _resetMemory() {
    sessionNotifications = [...INITIAL_NOTIFICATIONS];
  },
};

