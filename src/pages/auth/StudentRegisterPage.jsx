import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  User,
  Mail,
  Phone,
  FileBadge,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { toast } from 'sonner';
import { studentRegisterSchema } from '../../schemas/authSchemas';
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

const DEPARTMENT_OPTIONS = [
  { value: '', label: 'Select Academic Department' },
  { value: 'Computer Science & Engineering', label: 'Computer Science & Engineering' },
  { value: 'Information Technology', label: 'Information Technology' },
  { value: 'Electronics & Communication', label: 'Electronics & Communication' },
  { value: 'Electrical & Electronics', label: 'Electrical & Electronics' },
  { value: 'Mechanical Engineering', label: 'Mechanical Engineering' },
  { value: 'Civil Engineering', label: 'Civil Engineering' },
  { value: 'Data Science & AI', label: 'Data Science & AI' },
];

const DEGREE_OPTIONS = [
  { value: '', label: 'Select Degree / Program' },
  { value: 'B.Tech / B.E.', label: 'Bachelor of Technology (B.Tech / B.E.)' },
  { value: 'M.Tech / M.E.', label: 'Master of Technology (M.Tech / M.E.)' },
  { value: 'MCA', label: 'Master of Computer Applications (MCA)' },
  { value: 'B.Sc / BCA', label: 'Bachelor of Science / BCA' },
  { value: 'Dual Degree (B.Tech + M.Tech)', label: 'Dual Degree (Integrated)' },
];

const GRAD_YEAR_OPTIONS = [
  { value: '', label: 'Select Graduation Year' },
  { value: '2025', label: '2025 (Outgoing Cohort)' },
  { value: '2026', label: '2026 (Current Pre-Final)' },
  { value: '2027', label: '2027 (Junior Cohort)' },
  { value: '2028', label: '2028 (Freshman Cohort)' },
];

export const StudentRegisterPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [registeredName, setRegisteredName] = useState('');

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(studentRegisterSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
      collegeId: '',
      department: '',
      degree: '',
      graduationYear: '',
      cgpa: '',
      termsAccepted: false,
    },
    mode: 'onBlur',
  });

  const passwordValue = watch('password', '');

  const handleFillDemoData = () => {
    const randomId = Math.floor(100 + Math.random() * 900);
    setValue('fullName', 'Rohan Gupta', { shouldValidate: true });
    setValue('email', `rohan.gupta${randomId}@campus.edu`, { shouldValidate: true });
    setValue('password', 'DemoStudent123!', { shouldValidate: true });
    setValue('confirmPassword', 'DemoStudent123!', { shouldValidate: true });
    setValue('phone', '+91 98765 43210', { shouldValidate: true });
    setValue('collegeId', `CC-2022-CSE-${randomId}`, { shouldValidate: true });
    setValue('department', 'Computer Science & Engineering', { shouldValidate: true });
    setValue('degree', 'B.Tech / B.E.', { shouldValidate: true });
    setValue('graduationYear', '2026', { shouldValidate: true });
    setValue('cgpa', 8.75, { shouldValidate: true });
    setValue('termsAccepted', true, { shouldValidate: true });
    setSubmitError(null);
  };

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      setSubmitError(null);

      await authMockService.registerStudent(data);

      setIsSuccess(true);
      setRegisteredName(data.fullName);

      toast.success('Registration Successful!', {
        description: `Student account created for ${data.fullName}.`,
      });

      // After simulated success, user can redirect
      setTimeout(() => {
        navigate('/login', {
          state: {
            registeredEmail: data.email,
            message: 'Registration successful! You may now sign in with your credentials.',
          },
        });
      }, 2500);
    } catch (err) {
      const msg = err.message || 'Registration failed. Please check your information.';
      setSubmitError(msg);
      toast.error('Registration Failed', {
        description: msg,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <Card className="shadow-lg border-slate-200 dark:border-slate-800 text-center">
        <CardContent className="pt-8 pb-8 space-y-4">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Account Created Successfully!
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
            Welcome to CampusConnect, <strong className="text-slate-900 dark:text-slate-100">{registeredName}</strong>.
            Your simulated student profile is registered. Redirecting you to the sign in page...
          </p>
          <div className="pt-2">
            <Link to="/login">
              <Button variant="primary">Proceed to Sign In</Button>
            </Link>
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
          <Badge variant="primary" className="text-xs">
            Student Portal
          </Badge>
        </div>
        <CardTitle className="text-2xl font-bold tracking-tight">Student Registration</CardTitle>
        <CardDescription>
          Create your verified candidate profile to participate in upcoming campus placement drives
        </CardDescription>

        <div className="pt-2 flex justify-end">
          <button
            type="button"
            onClick={handleFillDemoData}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
          >
            <Sparkles className="h-3.5 w-3.5" /> Autofill Demo Student
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
          {/* Section: Personal Info */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Personal & Contact Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label
                  htmlFor="student-name"
                  className="text-xs font-semibold text-slate-700 dark:text-slate-300"
                >
                  Full Name *
                </label>
                <Input
                  id="student-name"
                  placeholder="e.g., Rohan Gupta"
                  leftIcon={<User className="h-4 w-4" />}
                  error={errors.fullName?.message}
                  {...register('fullName')}
                />
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="student-phone"
                  className="text-xs font-semibold text-slate-700 dark:text-slate-300"
                >
                  Phone Number *
                </label>
                <Input
                  id="student-phone"
                  type="tel"
                  placeholder="+91 98765 43210"
                  leftIcon={<Phone className="h-4 w-4" />}
                  error={errors.phone?.message}
                  {...register('phone')}
                />
              </div>
            </div>

            <div className="space-y-1">
              <label
                htmlFor="student-email"
                className="text-xs font-semibold text-slate-700 dark:text-slate-300"
              >
                Institutional / Student Email *
              </label>
              <Input
                id="student-email"
                type="email"
                placeholder="name@campus.edu"
                leftIcon={<Mail className="h-4 w-4" />}
                error={errors.email?.message}
                helperText="Use your college-issued email address"
                {...register('email')}
              />
            </div>
          </div>

          {/* Section: Academic Details */}
          <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Academic Credentials
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label
                  htmlFor="student-college-id"
                  className="text-xs font-semibold text-slate-700 dark:text-slate-300"
                >
                  College Registration No. *
                </label>
                <Input
                  id="student-college-id"
                  placeholder="e.g., CC-2022-CSE-042"
                  leftIcon={<FileBadge className="h-4 w-4" />}
                  error={errors.collegeId?.message}
                  {...register('collegeId')}
                />
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="student-cgpa"
                  className="text-xs font-semibold text-slate-700 dark:text-slate-300"
                >
                  Current CGPA (0.0 - 10.0) *
                </label>
                <Input
                  id="student-cgpa"
                  type="number"
                  step="0.01"
                  min="0"
                  max="10"
                  placeholder="e.g., 8.75"
                  error={errors.cgpa?.message}
                  {...register('cgpa')}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1 sm:col-span-1">
                <label
                  htmlFor="student-degree"
                  className="text-xs font-semibold text-slate-700 dark:text-slate-300"
                >
                  Degree *
                </label>
                <Select
                  id="student-degree"
                  options={DEGREE_OPTIONS}
                  error={errors.degree?.message}
                  {...register('degree')}
                />
              </div>

              <div className="space-y-1 sm:col-span-1">
                <label
                  htmlFor="student-dept"
                  className="text-xs font-semibold text-slate-700 dark:text-slate-300"
                >
                  Department *
                </label>
                <Select
                  id="student-dept"
                  options={DEPARTMENT_OPTIONS}
                  error={errors.department?.message}
                  {...register('department')}
                />
              </div>

              <div className="space-y-1 sm:col-span-1">
                <label
                  htmlFor="student-year"
                  className="text-xs font-semibold text-slate-700 dark:text-slate-300"
                >
                  Graduation Year *
                </label>
                <Select
                  id="student-year"
                  options={GRAD_YEAR_OPTIONS}
                  error={errors.graduationYear?.message}
                  {...register('graduationYear')}
                />
              </div>
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
                  htmlFor="student-password"
                  className="text-xs font-semibold text-slate-700 dark:text-slate-300"
                >
                  Password *
                </label>
                <PasswordInput
                  id="student-password"
                  placeholder="Create secure password"
                  error={errors.password?.message}
                  {...register('password')}
                />
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="student-confirm-password"
                  className="text-xs font-semibold text-slate-700 dark:text-slate-300"
                >
                  Confirm Password *
                </label>
                <PasswordInput
                  id="student-confirm-password"
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
                id="terms"
                className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer mt-0.5"
                {...register('termsAccepted')}
              />
              <label htmlFor="terms" className="text-xs text-slate-600 dark:text-slate-400 cursor-pointer leading-relaxed">
                I agree to the{' '}
                <Link to="/terms" className="text-blue-600 hover:underline dark:text-blue-400">
                  Placement Cell Terms of Participation
                </Link>{' '}
                and verify that all academic credentials submitted above are accurate.
              </label>
            </div>
            {errors.termsAccepted && (
              <p className="text-xs text-rose-600 dark:text-rose-400 font-medium">
                {errors.termsAccepted.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full"
            isLoading={isSubmitting}
            rightIcon={<ArrowRight className="h-4 w-4" />}
          >
            Complete Student Registration
          </Button>
        </form>
      </CardContent>

      <CardFooter className="flex flex-col space-y-2 border-t border-slate-100 dark:border-slate-800 text-center text-xs text-slate-500">
        <div>
          Already registered?{' '}
          <Link to="/login" className="font-semibold text-blue-600 hover:underline dark:text-blue-400">
            Sign in to candidate dashboard
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default StudentRegisterPage;
