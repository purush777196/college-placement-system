import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Edit2,
  Save,
  X,
  Lock,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { personalInfoSchema } from '../../../schemas/profileSchemas';
import { toast } from 'sonner';

export const PersonalInfoSection = ({
  profile = {},
  onUpdate,
  onUpdateProfile,
  isUpdating = false,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      fullName: profile.fullName || profile.name || '',
      email: profile.email || '',
      phone: profile.phone || '',
      dob: profile.dob || '',
      gender: profile.gender || '',
      address: profile.address || '',
      city: profile.city || '',
      state: profile.state || '',
      pincode: profile.pincode || '',
      linkedinUrl: profile.linkedinUrl || '',
      githubUrl: profile.githubUrl || '',
      portfolioUrl: profile.portfolioUrl || '',
      bio: profile.bio || '',
    },
  });

  const handleCancel = () => {
    reset({
      fullName: profile.fullName || profile.name || '',
      email: profile.email || '',
      phone: profile.phone || '',
      dob: profile.dob || '',
      gender: profile.gender || '',
      address: profile.address || '',
      city: profile.city || '',
      state: profile.state || '',
      pincode: profile.pincode || '',
      linkedinUrl: profile.linkedinUrl || '',
      githubUrl: profile.githubUrl || '',
      portfolioUrl: profile.portfolioUrl || '',
      bio: profile.bio || '',
    });
    setIsEditing(false);
  };

  const onSubmit = async (formData) => {
    try {
      const updateFn = onUpdate || onUpdateProfile;
      if (updateFn) {
        await updateFn(formData);
      }
      setIsEditing(false);
      toast.success('Personal details saved successfully');
    } catch (err) {
      toast.error(err.message || 'Failed to update personal details');
    }
  };

  return (
    <Card className="border-slate-200 dark:border-slate-800 shadow-xs">
      <CardHeader className="pb-3 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <User className="h-4 w-4" />
            </div>
            <div>
              <CardTitle className="text-base font-bold text-slate-900 dark:text-slate-100">
                Personal Information & Contact Details
              </CardTitle>
              <p className="text-xs text-slate-500">
                Identity, communication coordinates, and online professional footprints.
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
              Edit Personal Info
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
                Save Personal Info
              </Button>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="p-5">
        {!isEditing ? (
          /* View Mode */
          <div className="space-y-6 text-xs">
            {profile.bio && (
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 text-slate-600 dark:text-slate-300 leading-relaxed">
                <span className="font-semibold block text-[10px] uppercase text-slate-400 mb-1">
                  Candidate Professional Bio
                </span>
                {profile.bio}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-3 rounded-lg border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1">
                <span className="text-[10px] font-semibold uppercase text-slate-400 flex items-center gap-1">
                  <User className="h-3 w-3" /> Full Legal Name
                </span>
                <p className="font-bold text-sm text-slate-900 dark:text-slate-100">
                  {profile.fullName || profile.name}
                </p>
              </div>

              <div className="p-3 rounded-lg border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1">
                <span className="text-[10px] font-semibold uppercase text-slate-400 flex items-center gap-1">
                  <Mail className="h-3 w-3" /> Official Email (Verified)
                </span>
                <div className="flex items-center justify-between">
                  <p className="font-bold text-sm text-slate-900 dark:text-slate-100">
                    {profile.email}
                  </p>
                  <Lock className="h-3 w-3 text-slate-400" title="Email is locked to verified college records" />
                </div>
              </div>

              <div className="p-3 rounded-lg border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1">
                <span className="text-[10px] font-semibold uppercase text-slate-400 flex items-center gap-1">
                  <Phone className="h-3 w-3" /> Contact Phone
                </span>
                <p className="font-bold text-sm text-slate-900 dark:text-slate-100">
                  {profile.phone || 'Not provided'}
                </p>
              </div>

              <div className="p-3 rounded-lg border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1">
                <span className="text-[10px] font-semibold uppercase text-slate-400 flex items-center gap-1">
                  <Calendar className="h-3 w-3" /> Date of Birth
                </span>
                <p className="font-bold text-sm text-slate-900 dark:text-slate-100">
                  {profile.dob ? new Date(profile.dob).toLocaleDateString() : 'Not provided'}
                </p>
              </div>

              <div className="p-3 rounded-lg border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1">
                <span className="text-[10px] font-semibold uppercase text-slate-400">Gender</span>
                <p className="font-bold text-sm text-slate-900 dark:text-slate-100">
                  {profile.gender || 'Prefer not to say'}
                </p>
              </div>

              <div className="p-3 rounded-lg border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1">
                <span className="text-[10px] font-semibold uppercase text-slate-400 flex items-center gap-1">
                  <MapPin className="h-3 w-3" /> Location (City, State)
                </span>
                <p className="font-bold text-sm text-slate-900 dark:text-slate-100">
                  {profile.city ? `${profile.city}, ${profile.state} - ${profile.pincode}` : 'Not provided'}
                </p>
              </div>
            </div>

            {profile.address && (
              <div className="p-3 rounded-lg border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1">
                <span className="text-[10px] font-semibold uppercase text-slate-400">Residential Address</span>
                <p className="font-medium text-slate-700 dark:text-slate-300">{profile.address}</p>
              </div>
            )}
          </div>
        ) : (
          /* Edit Form */
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Input
                label="Full Legal Name"
                placeholder="e.g. Aarav Sharma"
                error={errors.fullName?.message}
                {...register('fullName')}
              />

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                  <span>Official Email Address</span>
                  <span className="text-[10px] text-slate-400 font-normal flex items-center gap-1">
                    <Lock className="h-2.5 w-2.5" /> Read-only
                  </span>
                </label>
                <input
                  type="email"
                  readOnly
                  disabled
                  value={profile.email}
                  className="w-full rounded-lg border border-slate-200 bg-slate-100 px-3 py-2 text-sm text-slate-500 cursor-not-allowed dark:border-slate-800 dark:bg-slate-800"
                />
              </div>

              <Input
                label="Contact Phone Number"
                placeholder="e.g. +91 98765 43210"
                error={errors.phone?.message}
                {...register('phone')}
              />

              <Input
                type="date"
                label="Date of Birth"
                error={errors.dob?.message}
                {...register('dob')}
              />

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Gender (Optional)
                </label>
                <select
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                  {...register('gender')}
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Non-binary">Non-binary</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </div>

              <Input
                label="City"
                placeholder="e.g. Bengaluru"
                error={errors.city?.message}
                {...register('city')}
              />

              <Input
                label="State / Province"
                placeholder="e.g. Karnataka"
                error={errors.state?.message}
                {...register('state')}
              />

              <Input
                label="Postal / PIN Code"
                placeholder="e.g. 560103"
                error={errors.pincode?.message}
                {...register('pincode')}
              />

              <Input
                label="LinkedIn Profile URL"
                placeholder="https://linkedin.com/in/username"
                error={errors.linkedinUrl?.message}
                {...register('linkedinUrl')}
              />

              <Input
                label="GitHub Profile URL"
                placeholder="https://github.com/username"
                error={errors.githubUrl?.message}
                {...register('githubUrl')}
              />

              <Input
                label="Portfolio / Website URL"
                placeholder="https://yourportfolio.dev"
                error={errors.portfolioUrl?.message}
                {...register('portfolioUrl')}
              />
            </div>

            <div className="space-y-1">
              <Input
                label="Residential Address"
                placeholder="Street address, apartment or flat number"
                error={errors.address?.message}
                {...register('address')}
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Professional Bio Summary (Max 300 characters)
              </label>
              <textarea
                rows={3}
                placeholder="Summarize your engineering interests, key technical capabilities, and career goals..."
                className="w-full rounded-lg border border-slate-300 bg-white p-3 text-sm text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-hidden focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                {...register('bio')}
              />
              {errors.bio && (
                <p className="text-xs text-rose-600">{errors.bio.message}</p>
              )}
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
              <Button type="button" variant="outline" size="sm" onClick={handleCancel} disabled={isUpdating}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm" isLoading={isUpdating}>
                Save Personal Information
              </Button>
            </div>
          </form>
        )}
      </CardContent>
    </Card>
  );
};

export default PersonalInfoSection;
