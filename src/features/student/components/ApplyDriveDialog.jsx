import React, { useState } from 'react';
import {
  ShieldCheck,
  FileText,
  ArrowRight,
} from 'lucide-react';
import Modal from '../../../components/ui/Modal';
import Button from '../../../components/ui/Button';

export const ApplyDriveDialog = ({
  isOpen,
  onClose,
  drive,
  student,
  onConfirmApply,
  isSubmitting = false,
}) => {
  const [agreed, setAgreed] = useState(false);
  const [resumeOption, setResumeOption] = useState('default');

  if (!drive) return null;

  const handleConfirm = () => {
    if (!agreed) return;
    onConfirmApply(drive);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Confirm Placement Drive Application"
      description={`Submit your verified credentials for ${drive.companyName}`}
      size="md"
    >
      <div className="space-y-4 pt-2">
        {/* Drive & Role Summary */}
        <div className="rounded-xl bg-slate-50 dark:bg-slate-900/60 p-4 border border-slate-200 dark:border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500 font-medium">{drive.companyName}</p>
              <h4 className="text-base font-bold text-slate-900 dark:text-slate-100">
                {drive.roleTitle}
              </h4>
            </div>
            <span className="text-lg font-extrabold text-emerald-600 dark:text-emerald-400">
              ₹{drive.packageLPA} LPA
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs text-slate-500 pt-1 border-t border-slate-200 dark:border-slate-800">
            <span>Location: {drive.location}</span>
            <span>Cutoff: {drive.minCGPA} CGPA</span>
          </div>
        </div>

        {/* Candidate Verification Status */}
        <div className="rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 p-3.5 border border-emerald-200 dark:border-emerald-900/40 text-xs text-emerald-800 dark:text-emerald-300 space-y-1.5">
          <div className="flex items-center gap-2 font-semibold">
            <ShieldCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            <span>Automated Eligibility Verification Passed</span>
          </div>
          <p className="text-[11px] leading-relaxed">
            Candidate CGPA ({student?.cgpa || '8.85'}) satisfies drive requirement ({drive.minCGPA}). Department ({student?.department || 'CSE'}) is recognized in the allowed cohort.
          </p>
        </div>

        {/* Resume Selection */}
        <div className="space-y-2 text-xs">
          <label className="font-semibold text-slate-700 dark:text-slate-300">
            Select Verified Resume
          </label>
          <div className="space-y-2">
            <label className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 cursor-pointer">
              <input
                type="radio"
                name="resume"
                value="default"
                checked={resumeOption === 'default'}
                onChange={(e) => setResumeOption(e.target.value)}
                className="text-blue-600 focus:ring-blue-500"
              />
              <FileText className="h-4 w-4 text-blue-500" />
              <div>
                <p className="font-semibold text-slate-900 dark:text-slate-100">
                  Primary Placement Resume (ATS Score 92/100)
                </p>
                <p className="text-[10px] text-slate-400">Verified by TPO • Updated 2 days ago</p>
              </div>
            </label>
          </div>
        </div>

        {/* Declaration Checkbox */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2">
          <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-600 dark:text-slate-400">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 mt-0.5"
            />
            <span className="leading-relaxed">
              I certify that all my academic credentials are authentic. I agree to adhere to the placement honor code and attend all interview rounds if shortlisted.
            </span>
          </label>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
          <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleConfirm}
            disabled={!agreed || isSubmitting}
            isLoading={isSubmitting}
            rightIcon={<ArrowRight className="h-4 w-4" />}
          >
            Confirm & Apply
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ApplyDriveDialog;
