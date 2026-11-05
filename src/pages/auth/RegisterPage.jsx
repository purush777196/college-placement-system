import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { User, Mail, Lock, ArrowRight, CheckCircle2 } from 'lucide-react';
import { registerSchema } from '../../schemas/authSchemas';
import { authMockService } from '../../services/mock/auth.mock';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../../components/ui/Card';

export const RegisterPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const { loginAsRole } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: '',
      email: '',
      role: 'student',
      password: '',
      confirmPassword: '',
      termsAccepted: false,
    },
  });

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      const res = await authMockService.register(data);
      setSuccessMessage(res.message);
      loginAsRole(data.role);
      setTimeout(() => {
        navigate(`/${data.role}/dashboard`);
      }, 1000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="shadow-lg border-slate-200 dark:border-slate-800">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
        <CardDescription>
          Register to access placement drives, manage campus talent, or post openings
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {successMessage && (
          <div className="flex items-center gap-2 rounded-lg bg-emerald-50 p-3 text-xs text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            <span>{successMessage} Redirecting to your dashboard...</span>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Full Name
            </label>
            <Input
              placeholder="e.g. Aarav Sharma"
              leftIcon={<User className="h-4 w-4" />}
              error={errors.fullName?.message}
              {...register('fullName')}
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Institutional Email
            </label>
            <Input
              type="email"
              placeholder="name@college.edu"
              leftIcon={<Mail className="h-4 w-4" />}
              error={errors.email?.message}
              {...register('email')}
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Account Role
            </label>
            <Select
              options={[
                { value: 'student', label: 'Student (Candidate)' },
                { value: 'tpo', label: 'Placement Officer (TPO)' },
                { value: 'recruiter', label: 'Corporate Recruiter' },
                { value: 'admin', label: 'System Administrator' },
              ]}
              error={errors.role?.message}
              {...register('role')}
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Password
            </label>
            <Input
              type="password"
              placeholder="At least 8 chars, 1 uppercase & 1 number"
              leftIcon={<Lock className="h-4 w-4" />}
              error={errors.password?.message}
              {...register('password')}
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Confirm Password
            </label>
            <Input
              type="password"
              placeholder="Re-enter password"
              leftIcon={<Lock className="h-4 w-4" />}
              error={errors.confirmPassword?.message}
              {...register('confirmPassword')}
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="terms"
              className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
              {...register('termsAccepted')}
            />
            <label htmlFor="terms" className="text-xs text-slate-500 cursor-pointer">
              I accept the placement cell terms and honor code
            </label>
          </div>
          {errors.termsAccepted && (
            <p className="text-xs text-rose-600 font-medium">{errors.termsAccepted.message}</p>
          )}

          <Button
            type="submit"
            className="w-full"
            isLoading={isSubmitting}
            rightIcon={<ArrowRight className="h-4 w-4" />}
          >
            Complete Registration
          </Button>
        </form>
      </CardContent>

      <CardFooter className="border-t border-slate-100 dark:border-slate-800 text-center text-xs text-slate-500 justify-center">
        Already registered?{' '}
        <Link to="/auth/login" className="font-semibold text-blue-600 hover:underline dark:text-blue-400 ml-1">
          Sign In
        </Link>
      </CardFooter>
    </Card>
  );
};

export default RegisterPage;
