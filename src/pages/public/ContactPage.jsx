import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Textarea } from '../../components/ui/Textarea';
import Button from '../../components/ui/Button';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export const ContactPage = () => {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 space-y-10">
      <div className="text-center space-y-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100">
          Contact Support & Institutional Onboarding
        </h1>
        <p className="text-sm sm:text-base text-slate-500 max-w-xl mx-auto">
          Need assistance or want to onboard your college onto CampusConnect? Reach out to our university relations desk.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="space-y-4">
          <Card className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-600">
              <Mail className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-slate-400">Institutional Inquiries</p>
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">partners@campusconnect.edu</p>
            </div>
          </Card>

          <Card className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-600">
              <Phone className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-slate-400">TPO Helpline</p>
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">+91 (80) 4122-8900</p>
            </div>
          </Card>

          <Card className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-950 text-indigo-600">
              <MapPin className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-slate-400">Headquarters</p>
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">Tech Park, Bengaluru, India</p>
            </div>
          </Card>
        </div>

        <Card className="md:col-span-2 p-6">
          <CardHeader className="p-0 mb-4">
            <CardTitle>Send an Inquiry</CardTitle>
          </CardHeader>
          <CardContent className="p-0 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <Input placeholder="Your Full Name" />
              <Input placeholder="Email Address" type="email" />
            </div>
            <Input placeholder="Institution / Company Name" />
            <Textarea placeholder="How can our placement technology help you?" rows={4} />
            <Button rightIcon={<Send className="h-4 w-4" />}>
              Submit Message
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ContactPage;

