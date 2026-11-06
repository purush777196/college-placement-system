import React, { useState } from 'react';
import {
  FileText,
  CheckCircle2,
  Download,
  Upload,
  Calendar,
  Sparkles,
  Info,
  HardDrive,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import Modal from '../../../components/ui/Modal';
import Input from '../../../components/ui/Input';
import { Badge } from '../../../components/ui/Badge';
import { toast } from 'sonner';

export const DocumentReferenceSection = ({
  documents = {
    resumeStatus: 'Uploaded & Verified',
    documentName: 'Aarav_Sharma_SDE_Resume_2026.pdf',
    lastUpdated: '2026-11-04',
    fileSize: '420 KB',
    completenessStatus: 'Verified by TPO Cell',
    atsScoreEstimate: 92,
  },
  onUpdateDocument,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [documentName, setDocumentName] = useState(documents?.documentName || 'Student_Resume_2026.pdf');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      if (onUpdateDocument) {
        await onUpdateDocument({
          ...documents,
          documentName,
          lastUpdated: new Date().toISOString().split('T')[0],
        });
      }
      toast.success('Resume reference updated');
      setIsModalOpen(false);
    } catch (err) {
      toast.error(err.message || 'Failed to update document metadata');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDownloadMock = () => {
    toast.info(`Downloading official verified resume: ${documents?.documentName || 'resume.pdf'}`);
  };

  return (
    <Card className="border-slate-200 dark:border-slate-800 shadow-xs">
      <CardHeader className="pb-3 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-sky-100 dark:bg-sky-900/40 flex items-center justify-center text-sky-600 dark:text-sky-400">
              <FileText className="h-4 w-4" />
            </div>
            <div>
              <CardTitle className="text-base font-bold text-slate-900 dark:text-slate-100">
                Verified Placement Resume
              </CardTitle>
              <p className="text-xs text-slate-500">
                Official institutional CV on record dispatched to visiting campus recruiters.
              </p>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsModalOpen(true)}
            leftIcon={<Upload className="h-3.5 w-3.5" />}
          >
            Update File
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-5 space-y-4">
        {/* Document Metadata Card */}
        <div className="p-4 rounded-xl border border-sky-100 dark:border-sky-900/40 bg-sky-50/50 dark:bg-sky-950/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3">
            <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800 shadow-xs text-sky-600 dark:text-sky-400 shrink-0">
              <FileText className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  {documents?.documentName || 'Standard_Placement_Resume.pdf'}
                </span>
                <Badge variant="success" className="gap-1 text-[11px]">
                  <CheckCircle2 className="h-3 w-3" />
                  {documents?.completenessStatus || 'Verified'}
                </Badge>
              </div>

              <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <HardDrive className="h-3 w-3" />
                  {documents?.fileSize || '380 KB'}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  Last Updated: {documents?.lastUpdated || 'Recent'}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            {documents?.atsScoreEstimate && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
                <span>ATS {documents.atsScoreEstimate}%</span>
              </div>
            )}

            <Button
              variant="outline"
              size="sm"
              onClick={handleDownloadMock}
              leftIcon={<Download className="h-3.5 w-3.5" />}
            >
              Download PDF
            </Button>
          </div>
        </div>

        {/* Phase 11 AI Resume Builder Advisory Note */}
        <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-start gap-2.5">
          <Info className="h-4 w-4 text-indigo-500 shrink-0 mt-0.5" />
          <div className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            <span className="font-semibold text-slate-900 dark:text-slate-100">
              AI Resume Builder Integration (Phase 11):
            </span>{' '}
            Automated multi-template generation, real-time keyword tailoring for job descriptions, and live ATS parser feedback will be activated in Phase 11. Current profile data is synchronized with your placement credentials automatically.
          </div>
        </div>
      </CardContent>

      {/* Edit Document Metadata Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Update Placement Resume Reference"
        size="sm"
      >
        <form onSubmit={handleUpdate} className="space-y-4">
          <Input
            label="Resume File Name"
            value={documentName}
            onChange={(e) => setDocumentName(e.target.value)}
            placeholder="e.g. FullName_SDE_Resume_2026.pdf"
            required
          />

          <p className="text-xs text-slate-500">
            Note: In this frontend preview phase, file selection updates the reference metadata and timestamp in your active student session.
          </p>

          <div className="flex justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsModalOpen(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" size="sm" loading={isSubmitting}>
              Update Metadata
            </Button>
          </div>
        </form>
      </Modal>
    </Card>
  );
};

export default DocumentReferenceSection;
