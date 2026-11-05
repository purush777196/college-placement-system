import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import {
  Mail,
  User,
  MessageSquare,
  Send,
  Phone,
  MapPin,
  CheckCircle2,
} from 'lucide-react';
import { contactSchema } from '../../../schemas/contactSchema';
import SectionHeading from '../components/SectionHeading';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../../components/ui/Card';
import Input from '../../../components/ui/Input';
import Textarea from '../../../components/ui/Textarea';
import Button from '../../../components/ui/Button';

export const ContactSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullName: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      // Simulate network latency (250ms)
      await new Promise((resolve) => setTimeout(resolve, 250));

      toast.success('Inquiry Submitted Successfully!', {
        description: `Thank you ${data.fullName}. Our university relations team will review your message. (Simulated submission)`,
      });

      setIsSubmitted(true);
      reset();
    } catch {
      toast.error('Submission Failed', {
        description: 'An unexpected error occurred while submitting your message.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-slate-100/50 dark:bg-slate-900/30 border-t border-slate-200/80 dark:border-slate-800/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        <SectionHeading
          badge="Get In Touch"
          title="Connect with Our Campus Relations Team"
          subtitle="Whether you represent a college placement cell seeking platform onboarding or a corporate recruiter looking to hire top student talent."
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Institutional Contact Cards */}
          <div className="space-y-4">
            <Card className="p-5 flex items-start gap-4">
              <div className="p-3 rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400 shrink-0">
                <Mail className="h-5 w-5" />
              </div>
              <div className="space-y-0.5">
                <p className="text-xs font-semibold uppercase text-slate-400">Institutional Desk</p>
                <p className="text-sm font-bold text-slate-800 dark:text-slate-200">partners@campusconnect.edu</p>
                <p className="text-xs text-slate-500">For university registrations & demos</p>
              </div>
            </Card>

            <Card className="p-5 flex items-start gap-4">
              <div className="p-3 rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400 shrink-0">
                <Phone className="h-5 w-5" />
              </div>
              <div className="space-y-0.5">
                <p className="text-xs font-semibold uppercase text-slate-400">TPO Support Helpline</p>
                <p className="text-sm font-bold text-slate-800 dark:text-slate-200">+91 (80) 4122-8900</p>
                <p className="text-xs text-slate-500">Mon - Fri • 9:00 AM - 6:00 PM IST</p>
              </div>
            </Card>

            <Card className="p-5 flex items-start gap-4">
              <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400 shrink-0">
                <MapPin className="h-5 w-5" />
              </div>
              <div className="space-y-0.5">
                <p className="text-xs font-semibold uppercase text-slate-400">Platform Headquarters</p>
                <p className="text-sm font-bold text-slate-800 dark:text-slate-200">Electronic City, Phase 1</p>
                <p className="text-xs text-slate-500">Bengaluru, Karnataka 560100, India</p>
              </div>
            </Card>

            <div className="rounded-2xl bg-blue-50/70 p-4 border border-blue-200/80 dark:bg-blue-950/30 dark:border-blue-900/40 text-xs text-blue-800 dark:text-blue-300">
              <p className="font-semibold mb-1">Demonstration Notice:</p>
              <p>This contact module operates in client-only simulation mode. Submissions trigger verified in-app toast feedback without external email dispatch.</p>
            </div>
          </div>

          {/* Validated Contact Form */}
          <Card className="lg:col-span-2 p-6 sm:p-8">
            <CardHeader className="p-0 mb-6">
              <CardTitle className="text-xl sm:text-2xl font-bold">
                Send an Inquiry or Book a College Demo
              </CardTitle>
              <CardDescription>
                Complete the fields below and our university partnerships desk will follow up.
              </CardDescription>
            </CardHeader>

            <CardContent className="p-0">
              {isSubmitted && (
                <div className="mb-6 flex items-center gap-3 p-4 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800 text-xs font-medium">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
                  <div>
                    <p className="font-semibold text-sm">Message Received (Demo Mode)</p>
                    <p className="mt-0.5">Your inquiry was validated and captured in local application state.</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <Input
                      placeholder="e.g. Dr. Anand Verma"
                      leftIcon={<User className="h-4 w-4" />}
                      error={errors.fullName?.message}
                      {...register('fullName')}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Work / Institutional Email <span className="text-rose-500">*</span>
                    </label>
                    <Input
                      type="email"
                      placeholder="name@college.edu"
                      leftIcon={<Mail className="h-4 w-4" />}
                      error={errors.email?.message}
                      {...register('email')}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Subject / Topic <span className="text-rose-500">*</span>
                  </label>
                  <Input
                    placeholder="e.g. Campus Onboarding Inquiry for 2026 Batch"
                    leftIcon={<MessageSquare className="h-4 w-4" />}
                    error={errors.subject?.message}
                    {...register('subject')}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Message Details <span className="text-rose-500">*</span>
                  </label>
                  <Textarea
                    rows={4}
                    placeholder="Describe your college placement requirements, student cohort size, or recruiting goals..."
                    error={errors.message?.message}
                    {...register('message')}
                  />
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    className="w-full sm:w-auto px-8"
                    isLoading={isSubmitting}
                    rightIcon={<Send className="h-4 w-4" />}
                  >
                    Submit Inquiry
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
