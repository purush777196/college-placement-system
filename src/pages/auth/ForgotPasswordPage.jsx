import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, ArrowLeft, ArrowRight, CheckCircle2, AlertCircle, Info, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { forgotPasswordSchema } from '../../schemas/authSchemas';
import { authMockService } from '../../services/mock/auth.mock';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '../../components/ui/Card';

export const ForgotPasswordPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [submittedEmail, setSubmittedEmail] = useState(null);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
    mode: 'onBlur',
  });

  const handleFillDemoEmail = () => {
    setValue('email', 'aarav.sharma@campus.edu', { shouldValidate: true });
    setErrorMessage(null);
  };

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      setErrorMessage(null);

      const res = await authMockService.requestPasswordReset(data.email);

      setSubmittedEmail(data.email);
      toast.success('Recovery Request Simulated', {
        description: res.message,
      });
    } catch (err) {
      const msg = err.message || 'Unable to process recovery request.';
      setErrorMessage(msg);
      toast.error('Request Failed', { description: msg });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="shadow-lg border-slate-200 dark:border-slate-800 max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold tracking-tight">Recover Password</CardTitle>
        <CardDescription>
          Enter your registered institutional or work email to simulate password recovery instructions
        </CardDescription>

        {!submittedEmail && (
          <div className="pt-2 flex justify-end">
            <button
              type="button"
              onClick={handleFillDemoEmail}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
            >
              <Sparkles className="h-3.5 w-3.5" /> Use Demo Email
            </button>
          </div>
        )}
      </CardHeader>

      <CardContent className="space-y-4">
        {errorMessage && (
          <div
            role="alert"
            className="flex items-start gap-2.5 rounded-lg bg-rose-50 dark:bg-rose-950/40 p-3 text-xs text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800"
          >
            <AlertCircle className="h-4 w-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {submittedEmail ? (
          <div className="space-y-4">
            <div className="flex items-start gap-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 p-4 text-xs text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
              <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <div className="space-y-1 leading-relaxed">
                <p className="font-semibold text-emerald-900 dark:text-emerald-200">
                  Password recovery instructions simulated!
                </p>
                <p>
                  A simulated password recovery dispatch was triggered for{' '}
                  <strong>{submittedEmail}</strong>.
                </p>
              </div>
            </div>

            <div className="rounded-lg bg-blue-50/70 dark:bg-blue-950/30 p-3 text-xs text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-900/40 space-y-2">
              <div className="flex items-start gap-2">
                <Info className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <strong>Frontend Demonstration Mode:</strong> Because no real emails are sent, you
                  can proceed directly to test the Reset Password demonstration page.
                </p>
              </div>
            </div>

            <Button
              className="w-full"
              onClick={() => navigate('/reset-password', { state: { email: submittedEmail } })}
              rightIcon={<ArrowRight className="h-4 w-4" />}
            >
              Proceed to Reset Password Demo
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
            <div className="space-y-1.5">
              <label
                htmlFor="forgot-email"
                className="text-xs font-semibold text-slate-700 dark:text-slate-300"
              >
                Registered Email Address
              </label>
              <Input
                id="forgot-email"
                type="email"
                placeholder="name@campus.edu"
                leftIcon={<Mail className="h-4 w-4" />}
                error={errors.email?.message}
                {...register('email')}
              />
            </div>

            <Button type="submit" className="w-full" isLoading={isSubmitting}>
              Send Recovery Instructions
            </Button>
          </form>
        )}
      </CardContent>

      <CardFooter className="border-t border-slate-100 dark:border-slate-800 text-center text-xs text-slate-500 justify-center">
        <Link
          to="/login"
          className="inline-flex items-center gap-1.5 font-semibold text-blue-600 hover:underline dark:text-blue-400"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Return to Sign In
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ForgotPasswordPage;
