import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Mail,
  Lock,
  ArrowRight,
  GraduationCap,
  Building2,
  TrendingUp,
  ShieldCheck,
} from 'lucide-react';
import { loginSchema } from '../../schemas/authSchemas';
import { useAuth } from '../../hooks/useAuth';
import { authMockService } from '../../services/mock/auth.mock';
import { ROLES, ROLE_LABELS } from '../../constants/roles';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';

export const LoginPage = () => {
  const [selectedRole, setSelectedRole] = useState(ROLES.STUDENT);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState(null);
  const { loginAsRole } = useAuth();
  const navigate = useNavigate();

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
      rememberMe: true,
    },
  });

  const handleQuickRoleSelect = (role, email) => {
    setSelectedRole(role);
    setValue('email', email);
    setValue('password', 'DemoPassword123!');
    setAuthError(null);
  };

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      setAuthError(null);
      await authMockService.login({
        email: data.email,
        password: data.password,
        role: selectedRole,
      });
      loginAsRole(selectedRole);
      navigate(`/${selectedRole}/dashboard`);
    } catch (err) {
      setAuthError(err.message || 'Authentication failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="shadow-lg border-slate-200 dark:border-slate-800">
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold">Sign In</CardTitle>
          <Badge variant="primary" className="text-xs">
            Phase 0 Demo
          </Badge>
        </div>
        <CardDescription>
          Select a role or enter your credentials to test dashboard workflows
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Quick Demo Switcher Buttons */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Quick 1-Click Role Login
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleQuickRoleSelect(ROLES.STUDENT, 'aarav.sharma@campus.edu')}
              className={`flex items-center gap-2 p-2 rounded-lg border text-xs font-medium text-left transition-colors cursor-pointer ${
                selectedRole === ROLES.STUDENT
                  ? 'border-blue-600 bg-blue-50/70 text-blue-900 dark:bg-blue-950/40 dark:text-blue-200 dark:border-blue-700'
                  : 'border-slate-200 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/60'
              }`}
            >
              <GraduationCap className="h-4 w-4 text-blue-600 shrink-0" />
              <div className="truncate">
                <p className="font-semibold">Student</p>
                <p className="text-[10px] text-slate-400">Aarav (CSE)</p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => handleQuickRoleSelect(ROLES.TPO, 'tpo.head@campus.edu')}
              className={`flex items-center gap-2 p-2 rounded-lg border text-xs font-medium text-left transition-colors cursor-pointer ${
                selectedRole === ROLES.TPO
                  ? 'border-emerald-600 bg-emerald-50/70 text-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-200 dark:border-emerald-700'
                  : 'border-slate-200 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/60'
              }`}
            >
              <TrendingUp className="h-4 w-4 text-emerald-600 shrink-0" />
              <div className="truncate">
                <p className="font-semibold">TPO Head</p>
                <p className="text-[10px] text-slate-400">Dr. Ramesh</p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => handleQuickRoleSelect(ROLES.RECRUITER, 'priya.s@novatech.io')}
              className={`flex items-center gap-2 p-2 rounded-lg border text-xs font-medium text-left transition-colors cursor-pointer ${
                selectedRole === ROLES.RECRUITER
                  ? 'border-amber-600 bg-amber-50/70 text-amber-900 dark:bg-amber-950/40 dark:text-amber-200 dark:border-amber-700'
                  : 'border-slate-200 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/60'
              }`}
            >
              <Building2 className="h-4 w-4 text-amber-600 shrink-0" />
              <div className="truncate">
                <p className="font-semibold">Recruiter</p>
                <p className="text-[10px] text-slate-400">NovaTech</p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => handleQuickRoleSelect(ROLES.ADMIN, 'admin@campusconnect.internal')}
              className={`flex items-center gap-2 p-2 rounded-lg border text-xs font-medium text-left transition-colors cursor-pointer ${
                selectedRole === ROLES.ADMIN
                  ? 'border-rose-600 bg-rose-50/70 text-rose-900 dark:bg-rose-950/40 dark:text-rose-200 dark:border-rose-700'
                  : 'border-slate-200 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/60'
              }`}
            >
              <ShieldCheck className="h-4 w-4 text-rose-600 shrink-0" />
              <div className="truncate">
                <p className="font-semibold">Administrator</p>
                <p className="text-[10px] text-slate-400">System Admin</p>
              </div>
            </button>
          </div>
        </div>

        {authError && (
          <div className="rounded-lg bg-rose-50 p-3 text-xs text-rose-600 dark:bg-rose-950/40 dark:text-rose-400 border border-rose-200 dark:border-rose-800">
            {authError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Email Address
            </label>
            <Input
              type="email"
              placeholder="name@campus.edu"
              leftIcon={<Mail className="h-4 w-4" />}
              error={errors.email?.message}
              {...register('email')}
            />
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Password
              </label>
              <Link
                to="/auth/forgot-password"
                className="text-xs text-blue-600 hover:underline dark:text-blue-400"
              >
                Forgot password?
              </Link>
            </div>
            <Input
              type="password"
              placeholder="••••••••"
              leftIcon={<Lock className="h-4 w-4" />}
              error={errors.password?.message}
              {...register('password')}
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            isLoading={isSubmitting}
            rightIcon={<ArrowRight className="h-4 w-4" />}
          >
            Sign In as {ROLE_LABELS[selectedRole]}
          </Button>
        </form>
      </CardContent>

      <CardFooter className="flex flex-col space-y-2 border-t border-slate-100 dark:border-slate-800 text-center text-xs text-slate-500">
        <div>
          Don&apos;t have an account?{' '}
          <Link to="/auth/register" className="font-semibold text-blue-600 hover:underline dark:text-blue-400">
            Create an account
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default LoginPage;
