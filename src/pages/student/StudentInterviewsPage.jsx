import React, { useState, useEffect } from 'react';
import {
  CalendarDays,
  List,
  Video,
  ExternalLink,
  Clock,
  User,
  CheckCircle2,
  Calendar as CalendarIcon,
  Search,
  Sparkles,
  Info,
} from 'lucide-react';
import { Card, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { applicationsMockService } from '../../services/mock/applications.mock';
import { toast } from 'sonner';

export const StudentInterviewsPage = () => {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('list'); // 'list' | 'calendar'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInterview, setSelectedInterview] = useState(null);

  useEffect(() => {
    fetchInterviews();
  }, []);

  const fetchInterviews = async () => {
    try {
      setLoading(true);
      const res = await applicationsMockService.getUpcomingInterviews();
      setInterviews(res.data || []);
    } catch {
      toast.error('Failed to load scheduled interviews');
    } finally {
      setLoading(false);
    }
  };

  const filteredInterviews = interviews.filter((item) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      item.companyName?.toLowerCase().includes(query) ||
      item.roleTitle?.toLowerCase().includes(query) ||
      item.round?.toLowerCase().includes(query)
    );
  });

  const formatDate = (isoString) => {
    if (!isoString) return 'Date TBD';
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatTime = (isoString) => {
    if (!isoString) return 'Time TBD';
    const date = new Date(isoString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleCopyLink = (url) => {
    navigator.clipboard?.writeText(url);
    toast.success('Interview meeting link copied to clipboard');
  };

  return (
    <div className="space-y-6">
      {/* Header & View Switcher */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Upcoming Interviews
          </h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Track scheduled technical evaluations, campus panel rounds, and meeting links.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="inline-flex rounded-lg border border-slate-200 bg-white p-1 dark:border-slate-800 dark:bg-slate-900 shadow-xs">
            <button
              type="button"
              onClick={() => setViewMode('list')}
              className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-colors ${
                viewMode === 'list'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100'
              }`}
            >
              <List className="h-3.5 w-3.5" />
              List View
            </button>
            <button
              type="button"
              onClick={() => setViewMode('calendar')}
              className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-colors ${
                viewMode === 'calendar'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100'
              }`}
            >
              <CalendarDays className="h-3.5 w-3.5" />
              Calendar View
            </button>
          </div>
        </div>
      </div>

      {/* KPI Stats Strip */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card className="border-blue-100 dark:border-blue-900/40 bg-gradient-to-br from-blue-50/50 to-white dark:from-blue-950/20 dark:to-slate-900">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Scheduled Rounds
              </p>
              <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-slate-100">
                {interviews.length}
              </p>
            </div>
            <div className="h-10 w-10 rounded-xl bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <CalendarIcon className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-emerald-100 dark:border-emerald-900/40 bg-gradient-to-br from-emerald-50/50 to-white dark:from-emerald-950/20 dark:to-slate-900">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                Confirmed Sessions
              </p>
              <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-slate-100">
                {interviews.filter((i) => i.status === 'Confirmed').length}
              </p>
            </div>
            <div className="h-10 w-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-amber-100 dark:border-amber-900/40 bg-gradient-to-br from-amber-50/50 to-white dark:from-amber-950/20 dark:to-slate-900">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                Next Immediate
              </p>
              <p className="mt-1 text-sm font-bold text-slate-900 dark:text-slate-100 truncate">
                {interviews[0] ? `${interviews[0].companyName} (${formatDate(interviews[0].scheduledAt).split(',')[0]})` : 'None pending'}
              </p>
            </div>
            <div className="h-10 w-10 rounded-xl bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center text-amber-600 dark:text-amber-400">
              <Clock className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search interview rounds by company or role..."
            className="w-full rounded-lg border border-slate-300 bg-white pl-9 pr-4 py-2 text-sm text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-hidden focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          />
        </div>
      </div>

      {/* Main Content Area */}
      {loading ? (
        <div className="py-16 text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-r-transparent align-[-0.125em]" />
          <p className="mt-3 text-sm font-medium text-slate-500 dark:text-slate-400">
            Loading interview schedule...
          </p>
        </div>
      ) : filteredInterviews.length === 0 ? (
        <Card className="py-12 text-center">
          <CardContent className="space-y-3">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400">
              <CalendarDays className="h-6 w-6" />
            </div>
            <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
              No interviews scheduled
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
              {searchQuery
                ? `No interviews match "${searchQuery}". Clear your search query to see all sessions.`
                : 'You have no pending interview rounds. Stay active in placement drives to receive shortlists!'}
            </p>
            {searchQuery && (
              <Button variant="outline" size="sm" onClick={() => setSearchQuery('')}>
                Clear Search
              </Button>
            )}
          </CardContent>
        </Card>
      ) : viewMode === 'list' ? (
        /* List View */
        <div className="space-y-4">
          {filteredInterviews.map((interview) => (
            <Card
              key={interview.id || interview.applicationId}
              className="border-slate-200 dark:border-slate-800 hover:shadow-md transition-shadow"
            >
              <CardContent className="p-5">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-bold text-lg text-slate-900 dark:text-slate-100">
                        {interview.companyName}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        ₹{interview.packageLPA} LPA
                      </Badge>
                      <Badge
                        variant={interview.status === 'Confirmed' ? 'success' : 'secondary'}
                        className="text-xs"
                      >
                        {interview.status || 'Scheduled'}
                      </Badge>
                    </div>

                    <h4 className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                      {interview.round}
                    </h4>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                      <div className="flex items-center gap-1.5">
                        <CalendarIcon className="h-3.5 w-3.5 text-slate-400" />
                        <span>{formatDate(interview.scheduledAt)}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5 text-slate-400" />
                        <span>
                          {formatTime(interview.scheduledAt)} ({interview.durationMinutes || 60} mins)
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Video className="h-3.5 w-3.5 text-blue-500" />
                        <span>{interview.mode || 'Virtual / Online'}</span>
                      </div>
                    </div>

                    {interview.interviewer && (
                      <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300">
                        <User className="h-3.5 w-3.5 text-slate-400" />
                        <span>Interviewer: <strong>{interview.interviewer}</strong></span>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap lg:flex-col items-center gap-2 pt-3 lg:pt-0 border-t border-slate-100 dark:border-slate-800 lg:border-t-0">
                    {interview.meetingUrl ? (
                      <div className="flex items-center gap-2 w-full lg:w-auto">
                        <Button
                          variant="primary"
                          size="sm"
                          className="flex-1 lg:flex-initial"
                          onClick={() => {
                            window.open(interview.meetingUrl, '_blank', 'noopener,noreferrer');
                          }}
                        >
                          <Video className="h-3.5 w-3.5 mr-1.5" />
                          Join Meeting
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          title="Copy meeting link"
                          onClick={() => handleCopyLink(interview.meetingUrl)}
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    ) : (
                      <span className="text-xs text-slate-400 italic">
                        Meeting link pending dispatcher
                      </span>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs text-slate-600 dark:text-slate-400"
                      onClick={() => setSelectedInterview(interview)}
                    >
                      <Info className="h-3.5 w-3.5 mr-1" />
                      View Instructions
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        /* Calendar Style View */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredInterviews.map((interview) => (
            <Card
              key={interview.id || interview.applicationId}
              className="border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-600 transition-colors"
            >
              <div className="p-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                    {new Date(interview.scheduledAt).getDate()}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-900 dark:text-slate-100">
                      {new Date(interview.scheduledAt).toLocaleString('en-US', { month: 'short', year: 'numeric' })}
                    </p>
                    <p className="text-[10px] text-slate-500">
                      {new Date(interview.scheduledAt).toLocaleDateString('en-US', { weekday: 'long' })}
                    </p>
                  </div>
                </div>
                <Badge variant={interview.status === 'Confirmed' ? 'success' : 'outline'} className="text-[10px]">
                  {interview.status || 'Active'}
                </Badge>
              </div>

              <CardContent className="p-4 space-y-3">
                <div>
                  <h4 className="font-bold text-base text-slate-900 dark:text-slate-100">
                    {interview.companyName}
                  </h4>
                  <p className="text-xs text-blue-600 dark:text-blue-400 font-medium line-clamp-1">
                    {interview.round}
                  </p>
                </div>

                <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                  <div className="flex items-center gap-2">
                    <Clock className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                    <span>{formatTime(interview.scheduledAt)} ({interview.durationMinutes || 60} mins)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Video className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{interview.mode}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-xs"
                    onClick={() => setSelectedInterview(interview)}
                  >
                    Details & Preparation
                  </Button>
                  {interview.meetingUrl && (
                    <Button
                      variant="primary"
                      size="sm"
                      className="text-xs shrink-0"
                      onClick={() => window.open(interview.meetingUrl, '_blank', 'noopener,noreferrer')}
                    >
                      Join
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Interview Details & Prep Modal */}
      {selectedInterview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl dark:bg-slate-900 border border-slate-200 dark:border-slate-800 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-slate-200 pb-4 dark:border-slate-800">
              <div>
                <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
                  Interview Round Briefing
                </span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                  {selectedInterview.companyName}
                </h3>
                <p className="text-xs text-slate-500">{selectedInterview.roleTitle}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedInterview(null)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 space-y-4 text-sm text-slate-600 dark:text-slate-300">
              <div className="rounded-lg bg-slate-50 p-3.5 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Round Title:</span>
                  <span className="font-semibold text-slate-900 dark:text-slate-100">
                    {selectedInterview.round}
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Date & Time:</span>
                  <span className="font-semibold text-slate-900 dark:text-slate-100">
                    {formatDate(selectedInterview.scheduledAt)} at {formatTime(selectedInterview.scheduledAt)}
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Interview Mode:</span>
                  <span className="font-semibold text-slate-900 dark:text-slate-100">
                    {selectedInterview.mode}
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Interviewer:</span>
                  <span className="font-semibold text-slate-900 dark:text-slate-100">
                    {selectedInterview.interviewer || 'Assigned Corporate Evaluator'}
                  </span>
                </div>
              </div>

              <div>
                <h5 className="font-semibold text-slate-900 dark:text-slate-100 mb-1 flex items-center gap-1.5 text-xs uppercase tracking-wide">
                  <Sparkles className="h-3.5 w-3.5 text-blue-600" />
                  Candidate Preparation Guidelines
                </h5>
                <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300 bg-blue-50/50 dark:bg-blue-950/20 p-3 rounded-lg border border-blue-100 dark:border-blue-900/40">
                  {selectedInterview.instructions ||
                    'Ensure stable internet connection and webcam setup 15 minutes before the scheduled time. Keep a valid college ID card ready for identity verification.'}
                </p>
              </div>

              {selectedInterview.meetingUrl && (
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-500">
                    Virtual Meeting Link
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      readOnly
                      value={selectedInterview.meetingUrl}
                      className="w-full text-xs font-mono rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-2 text-slate-700 dark:text-slate-300"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCopyLink(selectedInterview.meetingUrl)}
                    >
                      Copy
                    </Button>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6 flex justify-end gap-2 border-t border-slate-200 pt-4 dark:border-slate-800">
              <Button variant="outline" size="sm" onClick={() => setSelectedInterview(null)}>
                Close
              </Button>
              {selectedInterview.meetingUrl && (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    window.open(selectedInterview.meetingUrl, '_blank', 'noopener,noreferrer');
                  }}
                >
                  <Video className="h-3.5 w-3.5 mr-1.5" />
                  Launch Meeting Room
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentInterviewsPage;
