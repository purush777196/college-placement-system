import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  GraduationCap,
  Plus,
  Edit2,
  Trash2,
  Building,
  Calendar,
  Award,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Modal from '../../../components/ui/Modal';
import { Badge } from '../../../components/ui/Badge';
import EmptyState from '../../../components/common/EmptyState';
import { educationRecordSchema, EDUCATION_QUALIFICATIONS } from '../../../schemas/profileSchemas';
import { toast } from 'sonner';

export const EducationHistorySection = ({
  educationList = [],
  onAddEducation,
  onUpdateEducation,
  onDeleteEducation,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [deleteRecordId, setDeleteRecordId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(educationRecordSchema),
    defaultValues: {
      institution: '',
      qualification: 'B.Tech / B.E. (Undergraduate)',
      board: '',
      startYear: 2022,
      endYear: 2026,
      scoreType: 'CGPA',
      score: '8.85',
      current: false,
    },
  });

  const handleOpenAdd = () => {
    setEditingRecord(null);
    reset({
      institution: '',
      qualification: 'Senior Secondary (Class XII / Intermediate)',
      board: 'CBSE',
      startYear: 2020,
      endYear: 2022,
      scoreType: 'Percentage',
      score: '90.0',
      current: false,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (rec) => {
    setEditingRecord(rec);
    reset({
      institution: rec.institution,
      qualification: rec.qualification,
      board: rec.board,
      startYear: rec.startYear,
      endYear: rec.endYear,
      scoreType: rec.scoreType,
      score: rec.score,
      current: rec.current || false,
    });
    setIsModalOpen(true);
  };

  const onSubmit = async (formData) => {
    try {
      setIsSubmitting(true);
      if (editingRecord) {
        await onUpdateEducation(editingRecord.id, formData);
        toast.success('Education record updated');
      } else {
        await onAddEducation(formData);
        toast.success('Education milestone added');
      }
      setIsModalOpen(false);
    } catch (err) {
      toast.error(err.message || 'Operation failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleteRecordId) return;
    try {
      setIsSubmitting(true);
      await onDeleteEducation(deleteRecordId);
      toast.success('Education record deleted');
      setDeleteRecordId(null);
    } catch (err) {
      toast.error(err.message || 'Failed to delete record');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="border-slate-200 dark:border-slate-800 shadow-xs">
      <CardHeader className="pb-3 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              <GraduationCap className="h-4 w-4" />
            </div>
            <div>
              <CardTitle className="text-base font-bold text-slate-900 dark:text-slate-100">
                Education History & Milestones
              </CardTitle>
              <p className="text-xs text-slate-500">
                Chronological transcript records (Degree, 12th/Intermediate, and 10th standard).
              </p>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={handleOpenAdd}
            leftIcon={<Plus className="h-3.5 w-3.5" />}
          >
            Add Education
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-5">
        {educationList.length === 0 ? (
          <EmptyState
            title="No Education Records Found"
            description="Add your degree and high school credentials to complete corporate eligibility checks."
            action={
              <Button variant="outline" size="sm" onClick={handleOpenAdd}>
                Add First Milestone
              </Button>
            }
          />
        ) : (
          <div className="space-y-3">
            {educationList.map((rec) => (
              <div
                key={rec.id}
                className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border border-slate-200 bg-white hover:border-blue-300 dark:border-slate-800 dark:bg-slate-900 transition-all"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                      {rec.qualification}
                    </h4>
                    {rec.current && (
                      <Badge variant="primary" className="text-[10px] py-0">
                        Current Degree
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                    <Building className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                    <span>{rec.institution}</span>
                    <span className="text-slate-400 font-normal">• {rec.board}</span>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5 text-slate-400" />
                      {rec.startYear} – {rec.endYear}
                    </span>
                    <span className="flex items-center gap-1 font-bold text-emerald-600 dark:text-emerald-400">
                      <Award className="h-3.5 w-3.5" />
                      {rec.scoreType}: {rec.score} {rec.scoreType === 'Percentage' ? '%' : ''}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 self-end sm:self-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleOpenEdit(rec)}
                    title="Edit Record"
                    className="h-8 w-8 p-0"
                  >
                    <Edit2 className="h-3.5 w-3.5 text-slate-600 dark:text-slate-400" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setDeleteRecordId(rec.id)}
                    title="Delete Record"
                    className="h-8 w-8 p-0 hover:text-rose-600"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>

      {/* Add / Edit Education Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingRecord ? 'Edit Education Milestone' : 'Add Education Milestone'}
        description="Provide accredited institution details, academic board, and scores."
        size="md"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-2">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Qualification / Level
            </label>
            <select
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
              {...register('qualification')}
            >
              {EDUCATION_QUALIFICATIONS.map((q) => (
                <option key={q} value={q}>
                  {q}
                </option>
              ))}
            </select>
          </div>

          <Input
            label="School / College / Institution Name"
            placeholder="e.g. National Institute of Engineering"
            error={errors.institution?.message}
            {...register('institution')}
          />

          <Input
            label="Board or Affiliated University"
            placeholder="e.g. CBSE / State Board / University"
            error={errors.board?.message}
            {...register('board')}
          />

          <div className="grid grid-cols-2 gap-3">
            <Input
              type="number"
              label="Start Year"
              placeholder="2022"
              error={errors.startYear?.message}
              {...register('startYear')}
            />
            <Input
              type="number"
              label="Completion / End Year"
              placeholder="2026"
              error={errors.endYear?.message}
              {...register('endYear')}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Score Grading Type
              </label>
              <select
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                {...register('scoreType')}
              >
                <option value="CGPA">CGPA (Out of 10.0)</option>
                <option value="Percentage">Percentage (%)</option>
              </select>
            </div>

            <Input
              label="Grade / Score Value"
              placeholder="e.g. 8.85 or 94.6"
              error={errors.score?.message}
              {...register('score')}
            />
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="isCurrentDegree"
              className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              {...register('current')}
            />
            <label htmlFor="isCurrentDegree" className="text-xs text-slate-600 dark:text-slate-400">
              This is my currently enrolled primary degree
            </label>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsModalOpen(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm" isLoading={isSubmitting}>
              {editingRecord ? 'Update Milestone' : 'Add Milestone'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={!!deleteRecordId}
        onClose={() => setDeleteRecordId(null)}
        title="Delete Education Record?"
        description="Are you sure you want to remove this educational milestone? This action cannot be undone."
        size="sm"
      >
        <div className="flex justify-end gap-2 pt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setDeleteRecordId(null)}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={confirmDelete}
            isLoading={isSubmitting}
          >
            Delete Record
          </Button>
        </div>
      </Modal>
    </Card>
  );
};

export default EducationHistorySection;
