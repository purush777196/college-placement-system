import React from 'react';
import {
  ShieldCheck,
  ExternalLink,
  Github,
  Linkedin,
  Globe,
  Lock,
} from 'lucide-react';
import Modal from '../../../components/ui/Modal';
import { Badge } from '../../../components/ui/Badge';
import Button from '../../../components/ui/Button';

export const PublicProfilePreviewModal = ({
  isOpen,
  onClose,
  previewData,
}) => {
  if (!previewData) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Corporate Recruiter Profile Preview"
      size="xl"
    >
      <div className="space-y-6 max-h-[75vh] overflow-y-auto pr-1">
        {/* Recruiter Simulation Banner */}
        <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 flex items-start gap-3">
          <Lock className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-xs text-amber-800 dark:text-amber-200 leading-relaxed">
            <span className="font-semibold">Recruiter View Simulation:</span> This is how hiring managers and campus recruiters see your profile. Sensitive personal contact details (phone number, date of birth, and residential home address) are strictly redacted in compliance with institutional privacy policies.
          </div>
        </div>

        {/* Candidate Summary Card */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 to-indigo-950 text-white shadow-md">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
            <img
              src={previewData.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
              alt={previewData.fullName}
              className="h-20 w-20 rounded-2xl object-cover ring-2 ring-white/20 shrink-0"
            />

            <div className="flex-1 text-center sm:text-left space-y-1.5">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h3 className="text-lg font-bold">{previewData.fullName}</h3>
                <Badge variant="success" className="gap-1 text-xs">
                  <ShieldCheck className="h-3 w-3" />
                  Verified Candidate
                </Badge>
                <span className="px-2 py-0.5 rounded-full text-xs bg-indigo-500/30 text-indigo-200 border border-indigo-400/30">
                  {previewData.visibility || 'Recruiter-visible'}
                </span>
              </div>

              <p className="text-xs text-slate-300">
                {previewData.degree} &bull; {previewData.department}
              </p>
              <p className="text-xs text-slate-400">
                {previewData.college} &bull; Batch {previewData.graduationYear} (Semester {previewData.currentSemester})
              </p>

              {previewData.bio && (
                <p className="text-xs text-slate-300/90 pt-1 leading-relaxed">
                  {previewData.bio}
                </p>
              )}

              {/* Verified Links */}
              <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-2">
                {previewData.linkedinUrl && (
                  <a
                    href={previewData.linkedinUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs bg-white/10 hover:bg-white/20 text-white transition-colors"
                  >
                    <Linkedin className="h-3 w-3 text-sky-400" />
                    LinkedIn
                  </a>
                )}
                {previewData.githubUrl && (
                  <a
                    href={previewData.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs bg-white/10 hover:bg-white/20 text-white transition-colors"
                  >
                    <Github className="h-3 w-3 text-white" />
                    GitHub
                  </a>
                )}
                {previewData.portfolioUrl && (
                  <a
                    href={previewData.portfolioUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs bg-white/10 hover:bg-white/20 text-white transition-colors"
                  >
                    <Globe className="h-3 w-3 text-emerald-400" />
                    Portfolio
                  </a>
                )}
              </div>
            </div>

            {/* CGPA Badge */}
            <div className="p-3 rounded-xl bg-white/10 backdrop-blur-xs text-center min-w-[90px]">
              <div className="text-xs text-slate-300 uppercase tracking-wider font-semibold">
                CGPA
              </div>
              <div className="text-2xl font-black text-amber-400">
                {previewData.cgpa?.toFixed ? previewData.cgpa.toFixed(2) : previewData.cgpa}
              </div>
              <div className="text-[10px] text-slate-400">Scale 10.0</div>
            </div>
          </div>
        </div>

        {/* Technical Skills Section */}
        {previewData.skills && previewData.skills.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Technical Competencies ({previewData.skills.length})
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {previewData.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
                >
                  <span>{typeof skill === 'string' ? skill : skill.name}</span>
                  {typeof skill !== 'string' && skill.proficiency && (
                    <span className="text-[10px] px-1 py-0.2 rounded bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
                      {skill.proficiency}
                    </span>
                  )}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Projects Showcase */}
        {previewData.projects && previewData.projects.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Selected Engineering Projects ({previewData.projects.length})
            </h4>
            <div className="grid grid-cols-1 gap-3">
              {previewData.projects.map((proj) => (
                <div
                  key={proj.id}
                  className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <h5 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                          {proj.title}
                        </h5>
                        <Badge variant="outline" className="text-[10px]">
                          {proj.status}
                        </Badge>
                      </div>
                      <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
                        {proj.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {proj.githubUrl && (
                        <a
                          href={proj.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1 rounded text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                        >
                          <Github className="h-4 w-4" />
                        </a>
                      )}
                      {proj.liveUrl && (
                        <a
                          href={proj.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1 rounded text-teal-600 hover:text-teal-700 dark:text-teal-400"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </div>

                  {proj.technologies && (
                    <div className="mt-2.5 flex flex-wrap gap-1">
                      {proj.technologies.map((t, i) => (
                        <span
                          key={i}
                          className="px-1.5 py-0.5 rounded text-[10px] bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications Showcase */}
        {previewData.certifications && previewData.certifications.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Accredited Certifications ({previewData.certifications.length})
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {previewData.certifications.map((c) => (
                <div
                  key={c.id}
                  className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
                >
                  <div className="font-semibold text-xs text-slate-900 dark:text-slate-100">
                    {c.name}
                  </div>
                  <div className="text-[11px] text-slate-500">{c.issuingOrganization}</div>
                  <div className="mt-1 text-[10px] text-emerald-600 dark:text-emerald-400">
                    Issued: {c.issueDate}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Achievements Showcase */}
        {previewData.achievements && previewData.achievements.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Honors & Awards ({previewData.achievements.length})
            </h4>
            <div className="space-y-2">
              {previewData.achievements.map((a) => (
                <div
                  key={a.id}
                  className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
                >
                  <div className="font-semibold text-xs text-slate-900 dark:text-slate-100">
                    {a.title}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    {a.issuingOrganization} &bull; {a.date}
                  </div>
                  <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
                    {a.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-end pt-4 border-t border-slate-100 dark:border-slate-800">
        <Button variant="outline" size="sm" onClick={onClose}>
          Close Preview
        </Button>
      </div>
    </Modal>
  );
};

export default PublicProfilePreviewModal;
