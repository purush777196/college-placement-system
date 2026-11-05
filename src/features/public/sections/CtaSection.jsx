import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import Button from '../../../components/ui/Button';

export const CtaSection = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-[#172554] via-blue-900 to-[#172554] text-white relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/20 px-3.5 py-1 text-xs font-semibold text-blue-200 border border-blue-400/30">
          <Sparkles className="h-3.5 w-3.5 text-blue-300" />
          <span>Experience the Future of College Recruiting</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
          Ready to Modernize Your Campus Placement Operations?
        </h2>

        <p className="text-sm sm:text-base text-blue-100 max-w-2xl mx-auto leading-relaxed">
          Join universities and recruiters who simplify eligibility verification, track applications in real time, and accelerate hiring velocity.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link to="/auth/register">
            <Button
              size="lg"
              className="w-full sm:w-auto px-8 bg-white text-blue-900 hover:bg-slate-100 font-bold shadow-lg"
              rightIcon={<ArrowRight className="h-4 w-4 text-blue-900" />}
            >
              Get Started Now
            </Button>
          </Link>
          <Link to="/auth/login">
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto px-8 border-blue-400 text-white hover:bg-white/10"
            >
              Access Demo Dashboards
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
