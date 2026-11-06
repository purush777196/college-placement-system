import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  User,
  Mail,
  Phone,
  Building2,
  Globe,
  Briefcase,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Clock,
  AlertCircle,
  Info,
} from 'lucide-react';
import { toast } from 'sonner';
import { recruiterRegisterSchema } from '../../schemas/authSchemas';
import { authMockService } from '../../services/mock/auth.mock';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import PasswordInput from '../../features/auth/components/PasswordInput';
import PasswordStrengthMeter from '../../features/auth/components/PasswordStrengthMeter';
import PasswordRequirements from '../../features/auth/components/PasswordRequirements';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';

const INDUSTRY_OPTIONS = [
  { value: '', label: 'Select Company Industry' },
  { value: 'Software & IT Services', label: 'Software & IT Services' },
  { value: 'Financial Services & FinTech', label: 'Financial Services & FinTech' },
  { value: 'E-Commerce & Digital Retail', label: 'E-Commerce & Digital Retail' },
  { value: 'Management Consulting & Analytics', label: 'Management Consulting & Analytics' },
  { value: 'Core Engineering & Manufacturing', label: 'Core Engineering & Manufacturing' },
  { value: 'Healthcare & Biotechnology', label: 'Healthcare & Biotechnology' },
  { value: 'Telecommunications & Cloud Networking', label: 'Telecommunications & Cloud' },
  { value: 'Automotive & Clean Energy', label: 'Automotive & Clean Energy' },
];

export const RecruiterRegisterPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [registeredData, setRegisteredData] = useState(null);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(recruiterRegisterSchema),
    defaultValues: {
      fullName: '',
      officialEmail: '',
      password: '',
      confirmPassword: '',
      companyName: '',
      companyWebsite: '',
      designation: '',
      contactNumber: '',
      companyIndustry: '',
      termsAccepted: false,
    },
    mode: 'onBlur',
  });

  const passwordValue = watch('password', '');

  const handleFillDemoData = () => {
    const randomId = Math.floor(100 + Math.random() * 900);
    setValue('fullName', 'Vikram Malhotra', { shouldValidate: true });
    setValue('officialEmail', `vikram.m${randomId}@apexsystems.io`, { shouldValidate: true });
    setValue('password', 'DemoRecruiter123!', { shouldValidate: true });
    setValue('confirmPassword', 'DemoRecruiter123!', { shouldValidate: true });
    setValue('companyName', 'Apex Systems Ltd.', { shouldValidate: true });
    setValue('companyWebsite', 'https://apexsystems.io', { shouldValidate: true });
    setValue('designation', 'Senior University Talent Partner', { shouldValidate: true });
    setValue('contactNumber', '+91 98765 22334', { shouldValidate: true });
    setValue('companyIndustry', 'Software & IT Services', { shouldValidate: true });
    setValue('termsAccepted', true, { shouldValidate: true });
    setSubmitError(null);
  };

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      setSubmitError(null);

      await authMockService.registerRecruiter(data);

      setIsSuccess(true);
      setRegisteredData(data);

      toast.success('Registration Submitted', {
        description: 'Recruiter account created. Status: Pending Verification.',
      });
    } catch (err) {
      const msg = err.message || 'Registration failed. Please check company details.';
      setSubmitError(msg);
      toast.error('Registration Failed', {
        description: msg,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess && registeredData) {
    return (
      <Card className="shadow-lg border-slate-200 dark:border-slate-800 text-center max-w-xl mx-auto">
        <CardContent className="pt-8 pb-8 space-y-4">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-amber-100 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400">
            <Clock className="h-8 w-8" />
          </div>
          <div className="space-y-1">
            <Badge variant="warning" className="text-xs">
              Status: Pending Verification
            </Badge>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 pt-2">
              Registration Under Institutional Review
            </h2>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
            Thank you, <strong className="text-slate-900 dark:text-slate-100">{registeredData.fullName}</strong>.
            Your corporate account for{' '}
            <strong className="text-slate-900 dark:text-slate-100">{registeredData.companyName}</strong> has been
            registered in the demo environment. In production, college placement cells verify company credentials
            before granting live drive publishing privileges.
          </p>

          <div className="rounded-lg bg-slate-50 dark:bg-slate-900/60 p-3.5 border border-slate-200 dark:border-slate-800 text-xs text-left space-y-1.5 max-w-md mx-auto">
            <p className="font-semibold text-slate-700 dark:text-slate-300">Registered Details (Demo):</p>
            <p className="text-slate-600 dark:text-slate-400">Email: {registeredData.officialEmail}</p>
            <p className="text-slate-600 dark:text-slate-400">Designation: {registeredData.designation}</p>
            <p className="text-slate-600 dark:text-slate-400">Industry: {registeredData.companyIndustry}</p>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              variant="outline"
              onClick={() => navigate('/login')}
            >
              Back to Sign In
            </Button>
            <Button
              variant="primary"
              onClick={() => navigate('/recruiter/dashboard')}
            >
              Preview Recruiter Portal Demo
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg border-slate-200 dark:border-slate-800 max-w-xl mx-auto">
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-between">
          <Link
            to="/register"
            className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 dark:hover:text-slate-200"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Role Selection
          </Link>
          <Badge variant="warning" className="text-xs">
            Employer Portal
          </Badge>
        </div>
        <CardTitle className="text-2xl font-bold tracking-tight">Recruiter Registration</CardTitle>
        <CardDescription>
          Register your organization to discover pre-screened campus talent and organize placement drives
        </CardDescription>

        <div className="pt-2 flex justify-end">
          <button
            type="button"
            onClick={handleFillDemoData}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline cursor-pointer"
          >
            <Sparkles className="h-3.5 w-3.5" /> Autofill Demo Recruiter
          </button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {submitError && (
          <div
            role="alert"
            className="flex items-start gap-2.5 rounded-lg bg-rose-50 dark:bg-rose-950/40 p-3 text-xs text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800"
          >
            <AlertCircle className="h-4 w-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
            <span>{submitError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          {/* Section: Contact Person */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Recruiter Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label
                  htmlFor="recruiter-name"
                  className="text-xs font-semibold text-slate-700 dark:text-slate-300"
                >
                  Recruiter Full Name *
                </label>
                <Input
                  id="recruiter-name"
                  placeholder="e.g., Vikram Malhotra"
                  leftIcon={<User className="h-4 w-4" />}
                  error={errors.fullName?.message}
                  {...register('fullName')}
                />
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="recruiter-designation"
                  className="text-xs font-semibold text-slate-700 dark:text-slate-300"
                >
                  Designation / Title *
                </label>
                <Input
                  id="recruiter-designation"
                  placeholder="e.g., Lead University Recruiter"
                  leftIcon={<Briefcase className="h-4 w-4" />}
                  error={errors.designation?.message}
                  {...register('designation')}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label
                  htmlFor="recruiter-email"
                  className="text-xs font-semibold text-slate-700 dark:text-slate-300"
                >
                  Official Corporate Email *
                </label>
                <Input
                  id="recruiter-email"
                  type="email"
                  placeholder="name@company.com"
                  leftIcon={<Mail className="h-4 w-4" />}
                  error={errors.officialEmail?.message}
                  helperText="Please use your corporate email domain"
                  {...register('officialEmail')}
                />
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="recruiter-phone"
                  className="text-xs font-semibold text-slate-700 dark:text-slate-300"
                >
                  Contact Number *
                </label>
                <Input
                  id="recruiter-phone"
                  type="tel"
                  placeholder="+91 98765 22334"
                  leftIcon={<Phone className="h-4 w-4" />}
                  error={errors.contactNumber?.message}
                  {...register('contactNumber')}
                />
              </div>
            </div>
          </div>

          {/* Section: Company Profile */}
          <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Company Credentials
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label
                  htmlFor="company-name"
                  className="text-xs font-semibold text-slate-700 dark:text-slate-300"
                >
                  Company Name *
                </label>
                <Input
                  id="company-name"
                  placeholder="e.g., Apex Systems Ltd."
                  leftIcon={<Building2 className="h-4 w-4" />}
                  error={errors.companyName?.message}
                  {...register('companyName')}
                />
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="company-website"
                  className="text-xs font-semibold text-slate-700 dark:text-slate-300"
                >
                  Company Website *
                </label>
                <Input
                  id="company-website"
                  placeholder="https://company.com"
                  leftIcon={<Globe className="h-4 w-4" />}
                  error={errors.companyWebsite?.message}
                  {...register('companyWebsite')}
                />
              </div>
            </div>

            <div className="space-y-1">
              <label
                htmlFor="company-industry"
                className="text-xs font-semibold text-slate-700 dark:text-slate-300"
              >
                Industry Sector *
              </label>
              <Select
                id="company-industry"
                options={INDUSTRY_OPTIONS}
                error={errors.companyIndustry?.message}
                {...register('companyIndustry')}
              />
            </div>
          </div>

          {/* Section: Password Security */}
          <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Account Security
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label
                  htmlFor="recruiter-password"
                  className="text-xs font-semibold text-slate-700 dark:text-slate-300"
                >
                  Password *
                </label>
                <PasswordInput
                  id="recruiter-password"
                  placeholder="Create secure password"
                  error={errors.password?.message}
                  {...register('password')}
                />
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="recruiter-confirm-password"
                  className="text-xs font-semibold text-slate-700 dark:text-slate-300"
                >
                  Confirm Password *
                </label>
                <PasswordInput
                  id="recruiter-confirm-password"
                  placeholder="Re-enter password"
                  error={errors.confirmPassword?.message}
                  {...register('confirmPassword')}
                />
              </div>
            </div>

            {passwordValue && (
              <div className="space-y-2">
                <PasswordStrengthMeter password={passwordValue} />
                <PasswordRequirements password={passwordValue} />
              </div>
            )}
          </div>

          {/* Section: Terms acceptance */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2">
            <div className="flex items-start gap-2.5">
              <input
                type="checkbox"
                id="recruiter-terms"
                className="h-4 w-4 rounded border-slate-300 text-amber-600 focus:ring-amber-500 cursor-pointer mt-0.5"
                {...register('termsAccepted')}
              />
              <label
                htmlFor="recruiter-terms"
                className="text-xs text-slate-600 dark:text-slate-400 cursor-pointer leading-relaxed"
              >
                I agree to the Employer Recruitment Guidelines, campus recruitment ethics code, and understand that account status remains{' '}
                <span className="font-semibold text-amber-700 dark:text-amber-400">Pending Verification</span> until reviewed.
              </label>
            </div>
            {errors.termsAccepted && (
              <p className="text-xs text-rose-600 dark:text-rose-400 font-medium">
                {errors.termsAccepted.message}
              </p>
            )}
          </div>

          <div className="rounded-lg bg-slate-50 dark:bg-slate-900/60 p-2.5 border border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 flex items-start gap-2">
            <Info className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
            <p>
              Note: This is an architectural frontend demonstration. Submitting does not perform external domain checks or corporate verification.
            </p>
          </div>

          <Button
            type="submit"
            className="w-full bg-amber-600 hover:bg-amber-700 text-white"
            isLoading={isSubmitting}
            rightIcon={<ArrowRight className="h-4 w-4" />}
          >
            Submit Recruiter Registration
          </Button>
        </form>
      </CardContent>

      <CardFooter className="flex flex-col space-y-2 border-t border-slate-100 dark:border-slate-800 text-center text-xs text-slate-500">
        <div>
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-blue-600 hover:underline dark:text-blue-400">
            Sign in here
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default RecruiterRegisterPage;
