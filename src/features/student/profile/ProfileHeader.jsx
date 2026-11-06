import React, { useState } from 'react';
import {
  GraduationCap,
  MapPin,
  ShieldCheck,
  Eye,
  Globe,
  Github,
  Linkedin,
  Sparkles,
  ExternalLink,
  Lock,
  Building,
} from 'lucide-react';
import { Badge } from '../../../components/ui/Badge';
import Button from '../../../components/ui/Button';
import { toast } from 'sonner';

export const ProfileHeader = ({
  profile,
  onOpenPreview,
  onUpdateVisibility,
  isUpdatingVisibility = false,
}) => {
  const [isChangingVisibility, setIsChangingVisibility] = useState(false);

  const getVisibilityBadge = (visibility) => {
    switch (visibility) {
      case 'Recruiter-visible':
        return (
          <Badge variant="success" className="inline-flex items-center gap-1.5 text-xs py-1 px-2.5">
            <Globe className="h-3.5 w-3.5" />
            Recruiter-Visible (Public)
          </Badge>
        );
      case 'College only':
        return (
          <Badge variant="primary" className="inline-flex items-center gap-1.5 text-xs py-1 px-2.5">
            <Building className="h-3.5 w-3.5" />
            College & TPO Only
          </Badge>
        );
      case 'Private':
      default:
        return (
          <Badge variant="outline" className="inline-flex items-center gap-1.5 text-xs py-1 px-2.5">
            <Lock className="h-3.5 w-3.5" />
            Private (Draft)
          </Badge>
        );
    }
  };

  const handleVisibilityChange = async (newVisibility) => {
    try {
      await onUpdateVisibility(newVisibility);
      setIsChangingVisibility(false);
      toast.success(`Profile visibility updated to: ${newVisibility}`);
    } catch (err) {
      toast.error(err.message || 'Failed to update visibility');
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 transition-all">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        {/* Left: Avatar & Primary Details */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
          <div className="relative">
            <img
              src={profile.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
              alt={profile.fullName || profile.name}
              className="h-24 w-24 sm:h-28 sm:sm:w-28 rounded-2xl object-cover ring-4 ring-blue-50 dark:ring-blue-950/40 shadow-sm"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150';
              }}
            />
            <span className="absolute -bottom-1.5 -right-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white shadow-xs">
              <ShieldCheck className="h-3.5 w-3.5" />
            </span>
          </div>

          <div className="space-y-2">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
                {profile.fullName || profile.name}
              </h1>
              <Badge variant="primary" className="text-xs">
                Roll No: {profile.rollNumber}
              </Badge>
            </div>

            <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">
              {profile.degree} • {profile.department}
            </p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1.5 text-xs text-slate-500 dark:text-slate-400 pt-1">
              <span className="inline-flex items-center gap-1">
                <GraduationCap className="h-3.5 w-3.5 text-slate-400" />
                Batch {profile.batch || '2022 - 2026'} (Graduating {profile.graduationYear})
              </span>
              <span className="inline-flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400">
                <Sparkles className="h-3.5 w-3.5" />
                CGPA: {profile.cgpa} / {profile.cgpaScale || '10.0'}
              </span>
              {profile.city && profile.state && (
                <span className="inline-flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 text-slate-400" />
                  {profile.city}, {profile.state}
                </span>
              )}
            </div>

            {/* Social / Portfolio Links */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-2">
              {profile.linkedinUrl && (
                <a
                  href={profile.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-xs font-medium text-slate-700 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-300"
                >
                  <Linkedin className="h-3 w-3 text-blue-600" />
                  LinkedIn
                  <ExternalLink className="h-2.5 w-2.5 text-slate-400" />
                </a>
              )}
              {profile.githubUrl && (
                <a
                  href={profile.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-xs font-medium text-slate-700 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-300"
                >
                  <Github className="h-3 w-3 text-slate-900 dark:text-slate-100" />
                  GitHub
                  <ExternalLink className="h-2.5 w-2.5 text-slate-400" />
                </a>
              )}
              {profile.portfolioUrl && (
                <a
                  href={profile.portfolioUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-xs font-medium text-slate-700 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-300"
                >
                  <Globe className="h-3 w-3 text-emerald-600" />
                  Portfolio
                  <ExternalLink className="h-2.5 w-2.5 text-slate-400" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Right: Actions, Visibility & Completeness Summary */}
        <div className="flex flex-col items-center sm:items-end justify-between gap-4 border-t border-slate-100 dark:border-slate-800 pt-4 lg:border-t-0 lg:pt-0">
          {/* Visibility Controls */}
          <div className="flex flex-col items-center sm:items-end gap-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Placement Visibility
            </span>
            {isChangingVisibility ? (
              <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-800 p-1 rounded-lg border border-slate-200 dark:border-slate-700">
                <button
                  type="button"
                  disabled={isUpdatingVisibility}
                  onClick={() => handleVisibilityChange('Recruiter-visible')}
                  className="text-[11px] font-semibold px-2 py-1 rounded bg-white dark:bg-slate-900 text-blue-600 shadow-xs"
                >
                  Public
                </button>
                <button
                  type="button"
                  disabled={isUpdatingVisibility}
                  onClick={() => handleVisibilityChange('College only')}
                  className="text-[11px] font-semibold px-2 py-1 rounded text-slate-600 dark:text-slate-300 hover:text-slate-900"
                >
                  Campus Only
                </button>
                <button
                  type="button"
                  disabled={isUpdatingVisibility}
                  onClick={() => handleVisibilityChange('Private')}
                  className="text-[11px] font-semibold px-2 py-1 rounded text-slate-600 dark:text-slate-300 hover:text-slate-900"
                >
                  Private
                </button>
              </div>
            ) : (
              <div
                onClick={() => setIsChangingVisibility(true)}
                className="cursor-pointer hover:opacity-80 transition-opacity"
                title="Click to simulate changing profile visibility"
              >
                {getVisibilityBadge(profile.visibility)}
              </div>
            )}
            <span className="text-[10px] text-slate-400">
              Last updated: {new Date(profile.updatedAt || Date.now()).toLocaleDateString()}
            </span>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-2.5">
            <Button
              variant="outline"
              size="sm"
              onClick={onOpenPreview}
              leftIcon={<Eye className="h-4 w-4" />}
            >
              Public Profile Preview
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
