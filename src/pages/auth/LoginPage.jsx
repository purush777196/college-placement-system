import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Mail,
  ArrowRight,
  GraduationCap,
  Building2,
  TrendingUp,
  ShieldCheck,
  AlertCircle,
  KeyRound,
  Info,
} from 'lucide-react';
import { toast } from 'sonner';
import { loginSchema } from '../../schemas/authSchemas';
import { useAuth } from '../../hooks/useAuth';
import { ROLES, ROLE_LABELS } from '../../constants/roles';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import PasswordInput from '../../features/auth/components/PasswordInput';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';

export const LoginPage = () => {
  const [selectedDemoRole, setSelectedDemoRole] = useState(ROLES.STUDENT);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || null;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'aarav.sharma@campus.edu',
      password: 'DemoPassword123!',
      rememberMe: false,
    },
  });

  const handleQuickDemoSelect = (role, email) => {
    setSelectedDemoRole(role);
    setValue('email', email, { shouldValidate: true });
    setValue('password', 'DemoPassword123!', { shouldValidate: true });
    setErrorMessage(null);
  };

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      setErrorMessage(null);

      const result = await login({
        email: data.email,
        password: data.password,
        role: selectedDemoRole,
        rememberMe: data.rememberMe,
      });

      const userRole = result.user?.role || selectedDemoRole;
      toast.success(`Welcome back, ${result.user?.name || 'User'}!`, {
        description: `Authenticated as ${ROLE_LABELS[userRole] || userRole} (Demo Session)`,
      });

      // If user came from a protected route and has appropriate role, redirect back
      if (from && (from.startsWith(`/${userRole}`) || userRole === ROLES.ADMIN)) {
        navigate(from, { replace: true });
      } else {
        navigate(`/${userRole}/dashboard`, { replace: true });
      }
    } catch (err) {
      const displayError =
        err.message || 'Invalid credentials. Please verify your email and password.';
      setErrorMessage(displayError);
      toast.error('Authentication Failed', {
        description: displayError,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="shadow-lg border-slate-200 dark:border-slate-800">
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold tracking-tight">Sign In</CardTitle>
          <Badge variant="primary" className="text-xs">
            Phase 2 Demo
          </Badge>
        </div>
        <CardDescription>
          Enter your demo credentials or select a quick-access persona below
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Quick Demo Persona Switcher Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <KeyRound className="h-3.5 w-3.5" />
              Demo Persona Accounts
            </span>
            <span className="text-[11px] text-blue-600 dark:text-blue-400 font-medium">
              Click to autofill
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2" role="group" aria-label="Demo role selector">
            <button
              type="button"
              onClick={() => handleQuickDemoSelect(ROLES.STUDENT, 'aarav.sharma@campus.edu')}
              className={`flex items-center gap-2 p-2.5 rounded-lg border text-xs font-medium text-left transition-colors cursor-pointer ${
                selectedDemoRole === ROLES.STUDENT
                  ? 'border-blue-600 bg-blue-50/70 text-blue-900 dark:bg-blue-950/40 dark:text-blue-200 dark:border-blue-700 ring-1 ring-blue-500'
                  : 'border-slate-200 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/60'
              }`}
            >
              <GraduationCap className="h-4 w-4 text-blue-600 shrink-0" />
              <div className="truncate">
                <p className="font-semibold">Student</p>
                <p className="text-[10px] text-slate-400">aarav.sharma@campus.edu</p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => handleQuickDemoSelect(ROLES.RECRUITER, 'priya.s@novatech.io')}
              className={`flex items-center gap-2 p-2.5 rounded-lg border text-xs font-medium text-left transition-colors cursor-pointer ${
                selectedDemoRole === ROLES.RECRUITER
                  ? 'border-amber-600 bg-amber-50/70 text-amber-900 dark:bg-amber-950/40 dark:text-amber-200 dark:border-amber-700 ring-1 ring-amber-500'
                  : 'border-slate-200 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/60'
              }`}
            >
              <Building2 className="h-4 w-4 text-amber-600 shrink-0" />
              <div className="truncate">
                <p className="font-semibold">Recruiter</p>
                <p className="text-[10px] text-slate-400">priya.s@novatech.io</p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => handleQuickDemoSelect(ROLES.TPO, 'tpo.head@campus.edu')}
              className={`flex items-center gap-2 p-2.5 rounded-lg border text-xs font-medium text-left transition-colors cursor-pointer ${
                selectedDemoRole === ROLES.TPO
                  ? 'border-emerald-600 bg-emerald-50/70 text-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-200 dark:border-emerald-700 ring-1 ring-emerald-500'
                  : 'border-slate-200 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/60'
              }`}
            >
              <TrendingUp className="h-4 w-4 text-emerald-600 shrink-0" />
              <div className="truncate">
                <p className="font-semibold">TPO Head</p>
                <p className="text-[10px] text-slate-400">tpo.head@campus.edu</p>
              </div>
            </button>

            <button
              type="button"
              onClick={() =>
                handleQuickDemoSelect(ROLES.ADMIN, 'admin@campusconnect.internal')
              }
              className={`flex items-center gap-2 p-2.5 rounded-lg border text-xs font-medium text-left transition-colors cursor-pointer ${
                selectedDemoRole === ROLES.ADMIN
                  ? 'border-rose-600 bg-rose-50/70 text-rose-900 dark:bg-rose-950/40 dark:text-rose-200 dark:border-rose-700 ring-1 ring-rose-500'
                  : 'border-slate-200 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/60'
              }`}
            >
              <ShieldCheck className="h-4 w-4 text-rose-600 shrink-0" />
              <div className="truncate">
                <p className="font-semibold">Admin (Demo)</p>
                <p className="text-[10px] text-slate-400">admin@campusconnect.internal</p>
              </div>
            </button>
          </div>
        </div>

        {/* Inline Error Notice */}
        {errorMessage && (
          <div
            role="alert"
            className="flex items-start gap-2.5 rounded-lg bg-rose-50 dark:bg-rose-950/40 p-3 text-xs text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800"
          >
            <AlertCircle className="h-4 w-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <div className="space-y-1.5">
            <label
              htmlFor="login-email"
              className="text-xs font-semibold text-slate-700 dark:text-slate-300"
            >
              Email Address
            </label>
            <Input
              id="login-email"
              type="email"
              placeholder="name@campus.edu"
              autoComplete="email"
              leftIcon={<Mail className="h-4 w-4" />}
              error={errors.email?.message}
              {...register('email')}
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label
                htmlFor="login-password"
                className="text-xs font-semibold text-slate-700 dark:text-slate-300"
              >
                Password
              </label>
              <Link
                to="/forgot-password"
                className="text-xs text-blue-600 hover:underline dark:text-blue-400"
              >
                Forgot password?
              </Link>
            </div>
            <PasswordInput
              id="login-password"
              placeholder="••••••••"
              autoComplete="current-password"
              error={errors.password?.message}
              {...register('password')}
            />
          </div>

          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-600 dark:text-slate-400">
              <input
                type="checkbox"
                id="rememberMe"
                className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                {...register('rememberMe')}
              />
              <span>Remember me for 30 days</span>
            </label>
          </div>

          <Button
            type="submit"
            className="w-full"
            isLoading={isSubmitting}
            rightIcon={<ArrowRight className="h-4 w-4" />}
          >
            Sign In as {ROLE_LABELS[selectedDemoRole] || 'User'}
          </Button>
        </form>

        {/* Demo Security Disclaimer Notice */}
        <div className="flex items-start gap-2 rounded-lg bg-blue-50/60 dark:bg-blue-950/30 p-2.5 text-[11px] text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-900/40">
          <Info className="h-4 w-4 shrink-0 mt-0.5 text-blue-500" />
          <p>
            <strong>Frontend Demo Notice:</strong> Passwords are never saved in permanent browser
            storage. Administrator accounts are restricted to demo evaluation only.
          </p>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col space-y-2 border-t border-slate-100 dark:border-slate-800 text-center text-xs text-slate-500">
        <div>
          Don&apos;t have an account?{' '}
          <Link
            to="/register"
            className="font-semibold text-blue-600 hover:underline dark:text-blue-400"
          >
            Select your role to register
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default LoginPage;
