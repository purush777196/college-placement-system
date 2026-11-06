import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/Card';
import { useTheme } from '../../hooks/useTheme';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const ApplicationStatusChart = ({
  data = {
    labels: ['Applied', 'Under Review', 'Shortlisted', 'Assessment', 'Interview', 'Offered'],
    counts: [1, 1, 1, 1, 1, 1],
  },
  title = 'Application Stage Distribution',
  subtitle = 'Breakdown of your active applications by hiring stage',
}) => {
  const { isDark } = useTheme();
  const textColor = isDark ? '#94A3B8' : '#64748B';

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        data: data.counts,
        backgroundColor: [
          '#3B82F6', // Applied (blue)
          '#8B5CF6', // Under review (purple)
          '#0EA5E9', // Shortlisted (sky)
          '#F59E0B', // Assessment (amber)
          '#6366F1', // Interview (indigo)
          '#10B981', // Offered (emerald)
        ],
        borderWidth: 2,
        borderColor: isDark ? '#1E293B' : '#FFFFFF',
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: textColor,
          boxWidth: 12,
          padding: 12,
          font: { size: 11 },
        },
      },
    },
    cutout: '65%',
  };

  return (
    <Card className="border-slate-200 dark:border-slate-800">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-bold">{title}</CardTitle>
        <CardDescription className="text-xs">{subtitle}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-64 w-full">
          <Doughnut data={chartData} options={options} />
        </div>
      </CardContent>
    </Card>
  );
};

export const MonthlyApplicationActivityChart = ({
  data = {
    labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov'],
    applications: [0, 1, 2, 2, 1],
  },
  title = 'Monthly Application Activity',
  subtitle = 'Number of drive applications submitted per month',
}) => {
  const { isDark } = useTheme();
  const textColor = isDark ? '#94A3B8' : '#64748B';
  const gridColor = isDark ? '#334155' : '#E2E8F0';

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Applications Submitted',
        data: data.applications,
        backgroundColor: '#2563EB',
        borderRadius: 6,
        hoverBackgroundColor: '#1D4ED8',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: isDark ? '#0F172A' : '#1E293B',
        titleFont: { size: 12 },
        bodyFont: { size: 12 },
        padding: 10,
        cornerRadius: 8,
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: textColor, font: { size: 11 } },
      },
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1, color: textColor, font: { size: 11 } },
        grid: { color: gridColor },
      },
    },
  };

  return (
    <Card className="border-slate-200 dark:border-slate-800">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-bold">{title}</CardTitle>
        <CardDescription className="text-xs">{subtitle}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-64 w-full">
          <Bar data={chartData} options={options} />
        </div>
      </CardContent>
    </Card>
  );
};

export const OpportunityDistributionChart = ({
  data = {
    labels: ['Core (10-18 LPA)', 'Dream (18-28 LPA)', 'Super Dream (30+ LPA)'],
    counts: [2, 3, 2],
  },
  title = 'Opportunity Tier Distribution',
  subtitle = 'Available eligible drives categorized by CTC package tier',
}) => {
  const { isDark } = useTheme();
  const textColor = isDark ? '#94A3B8' : '#64748B';

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        data: data.counts,
        backgroundColor: ['#3B82F6', '#8B5CF6', '#10B981'],
        borderWidth: 2,
        borderColor: isDark ? '#1E293B' : '#FFFFFF',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: textColor,
          boxWidth: 12,
          padding: 10,
          font: { size: 11 },
        },
      },
    },
    cutout: '60%',
  };

  return (
    <Card className="border-slate-200 dark:border-slate-800">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-bold">{title}</CardTitle>
        <CardDescription className="text-xs">{subtitle}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-64 w-full">
          <Doughnut data={chartData} options={options} />
        </div>
      </CardContent>
    </Card>
  );
};

export const ApplicationConversionChart = ({
  data = {
    labels: ['Eligible Drives', 'Applications', 'Shortlisted', 'Interviews', 'Offers'],
    counts: [8, 6, 3, 2, 1],
  },
  title = 'Application Conversion Funnel',
  subtitle = 'Progressive conversion from eligible drives to final offers',
}) => {
  const { isDark } = useTheme();
  const textColor = isDark ? '#94A3B8' : '#64748B';
  const gridColor = isDark ? '#334155' : '#E2E8F0';

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Candidates / Stages',
        data: data.counts,
        backgroundColor: [
          '#94A3B8', // Eligible
          '#3B82F6', // Applications
          '#0EA5E9', // Shortlisted
          '#F59E0B', // Interviews
          '#10B981', // Offers
        ],
        borderRadius: 6,
      },
    ],
  };

  const options = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: { stepSize: 2, color: textColor, font: { size: 11 } },
        grid: { color: gridColor },
      },
      y: {
        grid: { display: false },
        ticks: { color: textColor, font: { size: 11 } },
      },
    },
  };

  return (
    <Card className="border-slate-200 dark:border-slate-800">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-bold">{title}</CardTitle>
        <CardDescription className="text-xs">{subtitle}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-64 w-full">
          <Bar data={chartData} options={options} />
        </div>
      </CardContent>
    </Card>
  );
};

