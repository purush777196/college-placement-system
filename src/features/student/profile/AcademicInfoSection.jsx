import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  GraduationCap,
  Building,
  Award,
  AlertTriangle,
  Edit2,
  Save,
  X,
  CheckCircle2,
  Calendar,
  Layers,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Badge } from '../../../components/ui/Badge';
import { academicInfoSchema } from '../../../schemas/profileSchemas';
import { toast } from 'sonner';

export const AcademicInfoSection = ({
  profile,
  academicData,
  onUpdate,
  onUpdateAcademic,
  isUpdating = false,
}) => {
  const data = profile || academicData || {};
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(academicInfoSchema),
    defaultValues: {
      college: data.college || '',
      rollNumber: data.rollNumber || '',
      degree: data.degree || '',
      department: data.department || '',
      graduationYear: data.graduationYear || 2026,
      currentSemester: data.currentSemester || 7,
      cgpa: data.cgpa || 8.85,
      cgpaScale: data.cgpaScale || 10.0,
      totalBacklogs: data.totalBacklogs ?? 0,
      activeBacklogs: data.activeBacklogs ?? 0,
    },
  });

  const handleCancel = () => {
    reset({
      college: data.college || '',
      rollNumber: data.rollNumber || '',
      degree: data.degree || '',
      department: data.department || '',
      graduationYear: data.graduationYear || 2026,
      currentSemester: data.currentSemester || 7,
      cgpa: data.cgpa || 8.85,
      cgpaScale: data.cgpaScale || 10.0,
      totalBacklogs: data.totalBacklogs ?? 0,
      activeBacklogs: data.activeBacklogs ?? 0,
    });
    setIsEditing(false);
  };

  const onSubmit = async (formData) => {
    try {
      const updateFn = onUpdate || onUpdateAcademic;
      if (updateFn) {
        await updateFn(formData);
      }
      setIsEditing(false);
      toast.success('Academic standing records updated');
    } catch (err) {
      toast.error(err.message || 'Failed to update academic records');
    }
  };

  return (
    <Card className="border-slate-200 dark:border-slate-800 shadow-xs">
      <CardHeader className="pb-3 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <GraduationCap className="h-4 w-4" />
            </div>
            <div>
              <CardTitle className="text-base font-bold text-slate-900 dark:text-slate-100">
                Academic Standing & University Records
              </CardTitle>
              <p className="text-xs text-slate-500">
                Institutional credentials used for corporate cutoff and placement drive eligibility.
              </p>
            </div>
          </div>

          {!isEditing ? (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(true)}
              leftIcon={<Edit2 className="h-3.5 w-3.5" />}
            >
              Update Academic Records
            </Button>
          ) : (
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCancel}
                disabled={isUpdating}
                leftIcon={<X className="h-3.5 w-3.5" />}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleSubmit(onSubmit)}
                isLoading={isUpdating}
                leftIcon={<Save className="h-3.5 w-3.5" />}
              >
                Save Records
              </Button>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="p-5">
        {!isEditing ? (
          /* View Mode */
          <div className="space-y-5 text-xs">
            {/* Top Status Banner */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span className="font-semibold text-emerald-900 dark:text-emerald-200">
                  {data.standingTitle || 'Exemplary Standing (First Class with Distinction)'}
                </span>
              </div>
              <Badge variant="success" className="text-xs">
                {data.tierEligibility || 'Tier-1 & Super Dream Eligible'}
              </Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-3 rounded-lg border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1">
                <span className="text-[10px] font-semibold uppercase text-slate-400 flex items-center gap-1">
                  <Building className="h-3 w-3" /> Institution
                </span>
                <p className="font-bold text-sm text-slate-900 dark:text-slate-100 line-clamp-1">
                  {data.college}
                </p>
              </div>

              <div className="p-3 rounded-lg border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1">
                <span className="text-[10px] font-semibold uppercase text-slate-400">
                  Registration / Roll No.
                </span>
                <p className="font-bold text-sm text-slate-900 dark:text-slate-100">
                  {data.rollNumber}
                </p>
              </div>

              <div className="p-3 rounded-lg border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1">
                <span className="text-[10px] font-semibold uppercase text-slate-400">
                  Degree & Program
                </span>
                <p className="font-bold text-sm text-slate-900 dark:text-slate-100 line-clamp-1">
                  {data.degree}
                </p>
              </div>

              <div className="p-3 rounded-lg border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1">
                <span className="text-[10px] font-semibold uppercase text-slate-400">
                  Department / Branch
                </span>
                <p className="font-bold text-sm text-slate-900 dark:text-slate-100 line-clamp-1">
                  {data.department}
                </p>
              </div>

              <div className="p-3 rounded-lg border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1">
                <span className="text-[10px] font-semibold uppercase text-slate-400 flex items-center gap-1">
                  <Award className="h-3 w-3 text-emerald-500" /> Current Cumulative CGPA
                </span>
                <p className="font-extrabold text-base text-emerald-600 dark:text-emerald-400">
                  {data.cgpa} <span className="text-xs text-slate-400 font-normal">/ {data.cgpaScale || '10.0'}</span>
                </p>
              </div>

              <div className="p-3 rounded-lg border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1">
                <span className="text-[10px] font-semibold uppercase text-slate-400 flex items-center gap-1">
                  <Layers className="h-3 w-3" /> Current Semester
                </span>
                <p className="font-bold text-sm text-slate-900 dark:text-slate-100">
                  Semester {data.currentSemester} (Final Year)
                </p>
              </div>

              <div className="p-3 rounded-lg border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1">
                <span className="text-[10px] font-semibold uppercase text-slate-400 flex items-center gap-1">
                  <Calendar className="h-3 w-3" /> Graduation Year
                </span>
                <p className="font-bold text-sm text-slate-900 dark:text-slate-100">
                  {data.graduationYear} Batch
                </p>
              </div>

              <div className="p-3 rounded-lg border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1">
                <span className="text-[10px] font-semibold uppercase text-slate-400 flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3 text-amber-500" /> Active Backlogs
                </span>
                <p className={`font-bold text-sm ${data.activeBacklogs > 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
                  {data.activeBacklogs === 0 ? '0 (Clean Record)' : `${data.activeBacklogs} Active (${data.totalBacklogs} Historical)`}
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* Edit Form */
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Input
                label="College / University Name"
                placeholder="e.g. National Institute of Engineering"
                error={errors.college?.message}
                {...register('college')}
              />

              <Input
                label="College Registration Number (Roll No)"
                placeholder="e.g. 22CS014"
                error={errors.rollNumber?.message}
                {...register('rollNumber')}
              />

              <Input
                label="Degree / Academic Program"
                placeholder="e.g. B.Tech in Computer Science"
                error={errors.degree?.message}
                {...register('degree')}
              />

              <Input
                label="Department / Engineering Branch"
                placeholder="e.g. Computer Science & Engineering"
                error={errors.department?.message}
                {...register('department')}
              />

              <Input
                type="number"
                step="0.01"
                label="Current CGPA"
                placeholder="e.g. 8.85"
                error={errors.cgpa?.message}
                {...register('cgpa')}
              />

              <Input
                type="number"
                step="0.1"
                label="Maximum CGPA Scale"
                placeholder="10.0"
                error={errors.cgpaScale?.message}
                {...register('cgpaScale')}
              />

              <Input
                type="number"
                label="Current Academic Semester (1 - 8)"
                placeholder="e.g. 7"
                error={errors.currentSemester?.message}
                {...register('currentSemester')}
              />

              <Input
                type="number"
                label="Graduation Year"
                placeholder="e.g. 2026"
                error={errors.graduationYear?.message}
                {...register('graduationYear')}
              />

              <Input
                type="number"
                label="Total Historical Backlogs"
                placeholder="0"
                error={errors.totalBacklogs?.message}
                {...register('totalBacklogs')}
              />

              <Input
                type="number"
                label="Active Backlogs"
                placeholder="0"
                error={errors.activeBacklogs?.message}
                {...register('activeBacklogs')}
              />
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
              <Button type="button" variant="outline" size="sm" onClick={handleCancel} disabled={isUpdating}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm" isLoading={isUpdating}>
                Save Academic Standing
              </Button>
            </div>
          </form>
        )}
      </CardContent>
    </Card>
  );
};

export default AcademicInfoSection;
