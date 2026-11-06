import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Trophy,
  Plus,
  Trash2,
  ExternalLink,
  Calendar,
  Building,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Textarea from '../../../components/ui/Textarea';
import Modal from '../../../components/ui/Modal';
import EmptyState from '../../../components/common/EmptyState';
import { achievementSchema } from '../../../schemas/profileSchemas';
import { toast } from 'sonner';

export const AchievementsSection = ({
  achievements = [],
  onAddAchievement,
  onDeleteAchievement,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteAchId, setDeleteAchId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(achievementSchema),
    defaultValues: {
      title: '',
      issuingOrganization: '',
      date: '',
      description: '',
      credentialUrl: '',
    },
  });

  const handleOpenAdd = () => {
    reset({
      title: '',
      issuingOrganization: '',
      date: new Date().toISOString().split('T')[0],
      description: '',
      credentialUrl: '',
    });
    setIsModalOpen(true);
  };

  const onSubmit = async (formData) => {
    try {
      setIsSubmitting(true);
      await onAddAchievement(formData);
      toast.success('Honors/Achievement added');
      setIsModalOpen(false);
    } catch (err) {
      toast.error(err.message || 'Operation failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleteAchId) return;
    try {
      setIsSubmitting(true);
      await onDeleteAchievement(deleteAchId);
      toast.success('Achievement removed');
      setDeleteAchId(null);
    } catch (err) {
      toast.error(err.message || 'Failed to remove achievement');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="border-slate-200 dark:border-slate-800 shadow-xs">
      <CardHeader className="pb-3 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center text-amber-600 dark:text-amber-400">
              <Trophy className="h-4 w-4" />
            </div>
            <div>
              <CardTitle className="text-base font-bold text-slate-900 dark:text-slate-100">
                Honors, Hackathons & Awards
              </CardTitle>
              <p className="text-xs text-slate-500">
                Competitive programming rank, dean's honor list, national hackathon podium finishes.
              </p>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={handleOpenAdd}
            leftIcon={<Plus className="h-3.5 w-3.5" />}
          >
            Add Honor
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-5">
        {achievements.length === 0 ? (
          <EmptyState
            title="No Honors or Awards Recorded"
            description="Highlight competition victories, scholarships, and academic recognition."
            action={
              <Button variant="outline" size="sm" onClick={handleOpenAdd}>
                Add First Achievement
              </Button>
            }
          />
        ) : (
          <div className="space-y-3">
            {achievements.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-amber-300 dark:hover:border-amber-700/50 transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                      {item.title}
                    </h4>
                    <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <Building className="h-3.5 w-3.5" />
                        {item.issuingOrganization}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {item.date}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setDeleteAchId(item.id)}
                    className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                    title="Delete item"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                <p className="mt-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {item.description}
                </p>

                {item.credentialUrl && (
                  <div className="mt-2.5">
                    <a
                      href={item.credentialUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-amber-600 dark:text-amber-400 hover:underline"
                    >
                      <ExternalLink className="h-3 w-3" />
                      View Certificate / Award Letter
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>

      {/* Add Achievement Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add Honor or Achievement"
        size="md"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Achievement Title"
            placeholder="e.g. 1st Place Winner – National Smart Campus Hackathon"
            {...register('title')}
            error={errors.title?.message}
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Issuing Organization"
              placeholder="e.g. Ministry of Education & AICTE"
              {...register('issuingOrganization')}
              error={errors.issuingOrganization?.message}
              required
            />

            <Input
              label="Date Conferred"
              type="date"
              {...register('date')}
              error={errors.date?.message}
              required
            />
          </div>

          <Textarea
            label="Description"
            placeholder="Briefly describe the competition, rank achieved, and prize details (min 10 characters)..."
            rows={3}
            {...register('description')}
            error={errors.description?.message}
            required
          />

          <Input
            label="Verification Link (Optional)"
            placeholder="https://..."
            {...register('credentialUrl')}
            error={errors.credentialUrl?.message}
          />

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
              Add Honor
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={Boolean(deleteAchId)}
        onClose={() => setDeleteAchId(null)}
        title="Delete Achievement"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Are you sure you want to remove this achievement from your profile?
          </p>

          <div className="flex justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setDeleteAchId(null)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={confirmDelete}
              loading={isSubmitting}
            >
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </Card>
  );
};

export default AchievementsSection;
