import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Info,
  Sparkles,
} from 'lucide-react';
import { toast } from 'sonner';
import { resetPasswordSchema } from '../../schemas/authSchemas';
import { authMockService } from '../../services/mock/auth.mock';
import Button from '../../components/ui/Button';
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

export const ResetPasswordPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const emailFromRecovery = location.state?.email || 'aarav.sharma@campus.edu';

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
    mode: 'onBlur',
  });

  const passwordValue = watch('password', '');

  const handleFillDemoPassword = () => {
    setValue('password', 'NewSecurePass2026!', { shouldValidate: true });
    setValue('confirmPassword', 'NewSecurePass2026!', { shouldValidate: true });
    setErrorMessage(null);
  };

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      setErrorMessage(null);

      const res = await authMockService.resetPassword({
        email: emailFromRecovery,
        newPassword: data.password,
      });

      setIsSuccess(true);
      toast.success('Password Updated (Demo)', {
        description: res.message,
      });

      setTimeout(() => {
        navigate('/login', {
          state: {
            message: 'Password successfully reset! Please sign in with your new credentials.',
          },
        });
      }, 2000);
    } catch (err) {
      const msg = err.message || 'Failed to update password.';
      setErrorMessage(msg);
      toast.error('Reset Failed', { description: msg });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <Card className="shadow-lg border-slate-200 dark:border-slate-800 text-center max-w-md mx-auto">
        <CardContent className="pt-8 pb-8 space-y-4">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Password Reset Complete
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
            Your demo account password has been updated. Redirecting you to sign in...
          </p>
          <div className="pt-2">
            <Link to="/login">
              <Button variant="primary">Go to Sign In</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg border-slate-200 dark:border-slate-800 max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold tracking-tight">Create New Password</CardTitle>
        <CardDescription>
          Choose a strong, unique password for your demo account
        </CardDescription>

        <div className="pt-2 flex justify-end">
          <button
            type="button"
            onClick={handleFillDemoPassword}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
          >
            <Sparkles className="h-3.5 w-3.5" /> Suggest Strong Password
          </button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Banner explaining simulated workflow */}
        <div className="flex items-start gap-2 rounded-lg bg-blue-50/70 dark:bg-blue-950/30 p-3 text-xs text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-900/40">
          <Info className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Demonstration Workflow:</strong> This page simulates password update behavior.
            Real cryptographic token validation will be enforced server-side via Django in subsequent phases.
          </p>
        </div>

        {errorMessage && (
          <div
            role="alert"
            className="flex items-start gap-2.5 rounded-lg bg-rose-50 dark:bg-rose-950/40 p-3 text-xs text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800"
          >
            <AlertCircle className="h-4 w-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <div className="space-y-1.5">
            <label
              htmlFor="reset-password"
              className="text-xs font-semibold text-slate-700 dark:text-slate-300"
            >
              New Password *
            </label>
            <PasswordInput
              id="reset-password"
              placeholder="••••••••"
              error={errors.password?.message}
              {...register('password')}
            />
          </div>

          {passwordValue && (
            <div className="space-y-2">
              <PasswordStrengthMeter password={passwordValue} />
              <PasswordRequirements password={passwordValue} />
            </div>
          )}

          <div className="space-y-1.5">
            <label
              htmlFor="reset-confirm-password"
              className="text-xs font-semibold text-slate-700 dark:text-slate-300"
            >
              Confirm New Password *
            </label>
            <PasswordInput
              id="reset-confirm-password"
              placeholder="••••••••"
              error={errors.confirmPassword?.message}
              {...register('confirmPassword')}
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            isLoading={isSubmitting}
            rightIcon={<ArrowRight className="h-4 w-4" />}
          >
            Reset Password
          </Button>
        </form>
      </CardContent>

      <CardFooter className="border-t border-slate-100 dark:border-slate-800 text-center text-xs text-slate-500 justify-center">
        <Link
          to="/login"
          className="inline-flex items-center gap-1.5 font-semibold text-blue-600 hover:underline dark:text-blue-400"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Sign In
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ResetPasswordPage;
