import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  User,
  Mail,
  Phone,
  School,
  FileCode,
  Award,
  Briefcase,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Clock,
  AlertCircle,
  Info,
} from 'lucide-react';
import { toast } from 'sonner';
import { tpoRegisterSchema } from '../../schemas/authSchemas';
import { authMockService } from '../../services/mock/auth.mock';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
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

export const TpoRegisterPage = () => {
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
    resolver: zodResolver(tpoRegisterSchema),
    defaultValues: {
      fullName: '',
      officialEmail: '',
      password: '',
      confirmPassword: '',
      collegeName: '',
      collegeCode: '',
      department: '',
      designation: '',
      contactNumber: '',
      termsAccepted: false,
    },
    mode: 'onBlur',
  });

  const passwordValue = watch('password', '');

  const handleFillDemoData = () => {
    const randomId = Math.floor(100 + Math.random() * 900);
    setValue('fullName', 'Dr. Sunita Deshmukh', { shouldValidate: true });
    setValue('officialEmail', `tpo.officer${randomId}@engg-college.ac.in`, { shouldValidate: true });
    setValue('password', 'DemoTpo123!', { shouldValidate: true });
    setValue('confirmPassword', 'DemoTpo123!', { shouldValidate: true });
    setValue('collegeName', 'National Institute of Engineering & Technology', { shouldValidate: true });
    setValue('collegeCode', `NIET-${randomId}`, { shouldValidate: true });
    setValue('department', 'Training & Placement Directorate', { shouldValidate: true });
    setValue('designation', 'Placement Officer & Assistant Dean', { shouldValidate: true });
    setValue('contactNumber', '+91 98765 88990', { shouldValidate: true });
    setValue('termsAccepted', true, { shouldValidate: true });
    setSubmitError(null);
  };

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      setSubmitError(null);

      await authMockService.registerTpo(data);

      setIsSuccess(true);
      setRegisteredData(data);

      toast.success('Registration Submitted', {
        description: 'TPO account submitted. Approval pending by Institutional Governance.',
      });
    } catch (err) {
      const msg = err.message || 'Registration failed. Please check institution credentials.';
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
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
            <Clock className="h-8 w-8" />
          </div>
          <div className="space-y-1">
            <Badge variant="success" className="text-xs">
              Status: Pending Governance Approval
            </Badge>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 pt-2">
              TPO Registration Under Review
            </h2>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
            Thank you, <strong className="text-slate-900 dark:text-slate-100">{registeredData.fullName}</strong>.
            Your placement office account for{' '}
            <strong className="text-slate-900 dark:text-slate-100">{registeredData.collegeName}</strong> has been
            registered. In live deployment, institutional dean verification is required before administrative drive publishing access is enabled.
          </p>

          <div className="rounded-lg bg-slate-50 dark:bg-slate-900/60 p-3.5 border border-slate-200 dark:border-slate-800 text-xs text-left space-y-1.5 max-w-md mx-auto">
            <p className="font-semibold text-slate-700 dark:text-slate-300">Registered Office Details (Demo):</p>
            <p className="text-slate-600 dark:text-slate-400">College Code: {registeredData.collegeCode}</p>
            <p className="text-slate-600 dark:text-slate-400">Officer: {registeredData.designation}</p>
            <p className="text-slate-600 dark:text-slate-400">Official Email: {registeredData.officialEmail}</p>
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
              onClick={() => navigate('/tpo/dashboard')}
            >
              Explore TPO Dashboard Demo
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
          <Badge variant="success" className="text-xs">
            Institutional Governance
          </Badge>
        </div>
        <CardTitle className="text-2xl font-bold tracking-tight">TPO Registration</CardTitle>
        <CardDescription>
          Register your university placement cell or career development center to coordinate placement drives
        </CardDescription>

        <div className="pt-2 flex justify-end">
          <button
            type="button"
            onClick={handleFillDemoData}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
          >
            <Sparkles className="h-3.5 w-3.5" /> Autofill Demo TPO
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
          {/* Section: Officer Info */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Placement Officer Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label
                  htmlFor="tpo-name"
                  className="text-xs font-semibold text-slate-700 dark:text-slate-300"
                >
                  Full Name *
                </label>
                <Input
                  id="tpo-name"
                  placeholder="e.g., Dr. Sunita Deshmukh"
                  leftIcon={<User className="h-4 w-4" />}
                  error={errors.fullName?.message}
                  {...register('fullName')}
                />
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="tpo-designation"
                  className="text-xs font-semibold text-slate-700 dark:text-slate-300"
                >
                  Designation *
                </label>
                <Input
                  id="tpo-designation"
                  placeholder="e.g., Head of Training & Placements"
                  leftIcon={<Award className="h-4 w-4" />}
                  error={errors.designation?.message}
                  {...register('designation')}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label
                  htmlFor="tpo-email"
                  className="text-xs font-semibold text-slate-700 dark:text-slate-300"
                >
                  Official College Email *
                </label>
                <Input
                  id="tpo-email"
                  type="email"
                  placeholder="tpo@college.ac.in"
                  leftIcon={<Mail className="h-4 w-4" />}
                  error={errors.officialEmail?.message}
                  helperText="Use your institutional domain (.edu, .ac.in)"
                  {...register('officialEmail')}
                />
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="tpo-phone"
                  className="text-xs font-semibold text-slate-700 dark:text-slate-300"
                >
                  Contact Number *
                </label>
                <Input
                  id="tpo-phone"
                  type="tel"
                  placeholder="+91 98765 88990"
                  leftIcon={<Phone className="h-4 w-4" />}
                  error={errors.contactNumber?.message}
                  {...register('contactNumber')}
                />
              </div>
            </div>
          </div>

          {/* Section: Institution Details */}
          <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Institutional Profile
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1 sm:col-span-2">
                <label
                  htmlFor="college-name"
                  className="text-xs font-semibold text-slate-700 dark:text-slate-300"
                >
                  College / University Name *
                </label>
                <Input
                  id="college-name"
                  placeholder="e.g., National Institute of Technology"
                  leftIcon={<School className="h-4 w-4" />}
                  error={errors.collegeName?.message}
                  {...register('collegeName')}
                />
              </div>

              <div className="space-y-1 sm:col-span-1">
                <label
                  htmlFor="college-code"
                  className="text-xs font-semibold text-slate-700 dark:text-slate-300"
                >
                  College Code *
                </label>
                <Input
                  id="college-code"
                  placeholder="e.g., NIT-01"
                  leftIcon={<FileCode className="h-4 w-4" />}
                  error={errors.collegeCode?.message}
                  {...register('collegeCode')}
                />
              </div>
            </div>

            <div className="space-y-1">
              <label
                htmlFor="tpo-department"
                className="text-xs font-semibold text-slate-700 dark:text-slate-300"
              >
                Department / Placement Cell Name *
              </label>
              <Input
                id="tpo-department"
                placeholder="e.g., Central Training & Placement Cell"
                leftIcon={<Briefcase className="h-4 w-4" />}
                error={errors.department?.message}
                {...register('department')}
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
                  htmlFor="tpo-password"
                  className="text-xs font-semibold text-slate-700 dark:text-slate-300"
                >
                  Password *
                </label>
                <PasswordInput
                  id="tpo-password"
                  placeholder="Create secure password"
                  error={errors.password?.message}
                  {...register('password')}
                />
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="tpo-confirm-password"
                  className="text-xs font-semibold text-slate-700 dark:text-slate-300"
                >
                  Confirm Password *
                </label>
                <PasswordInput
                  id="tpo-confirm-password"
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
                id="tpo-terms"
                className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer mt-0.5"
                {...register('termsAccepted')}
              />
              <label
                htmlFor="tpo-terms"
                className="text-xs text-slate-600 dark:text-slate-400 cursor-pointer leading-relaxed"
              >
                I confirm that I am authorized to represent the placement cell and agree that account activation is{' '}
                <span className="font-semibold text-emerald-700 dark:text-emerald-400">subject to governance review</span>.
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
              Note: In this client demonstration, no real institutional check is made. Account status is simulated for demonstration purposes.
            </p>
          </div>

          <Button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
            isLoading={isSubmitting}
            rightIcon={<ArrowRight className="h-4 w-4" />}
          >
            Submit TPO Registration
          </Button>
        </form>
      </CardContent>

      <CardFooter className="flex flex-col space-y-2 border-t border-slate-100 dark:border-slate-800 text-center text-xs text-slate-500">
        <div>
          Already registered?{' '}
          <Link to="/login" className="font-semibold text-blue-600 hover:underline dark:text-blue-400">
            Sign in here
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default TpoRegisterPage;
