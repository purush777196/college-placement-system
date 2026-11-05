import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/Card';
import { useTheme } from '../../hooks/useTheme';

ChartJS.register(ArcElement, Tooltip, Legend);

export const PackageDistributionChart = ({
  data = {
    labels: ['< 6 LPA', '6 - 10 LPA', '10 - 18 LPA', '18 - 30 LPA', '30+ LPA'],
    studentCounts: [120, 390, 440, 185, 55],
  },
  title = 'Package Range Distribution',
  subtitle = 'Distribution of secured compensation packages across batch',
}) => {
  const { isDark } = useTheme();

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        data: data.studentCounts,
        backgroundColor: [
          '#64748B', // slate
          '#0284C7', // sky
          '#2563EB', // primary blue
          '#10B981', // emerald
          '#F59E0B', // amber
        ],
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
          color: isDark ? '#94A3B8' : '#64748B',
          font: { family: 'Inter', size: 11 },
          padding: 12,
          boxWidth: 10,
        },
      },
      tooltip: {
        backgroundColor: isDark ? '#1E293B' : '#FFFFFF',
        titleColor: isDark ? '#F8FAFC' : '#0F172A',
        bodyColor: isDark ? '#CBD5E1' : '#334155',
        borderColor: isDark ? '#334155' : '#E2E8F0',
        borderWidth: 1,
        padding: 10,
      },
    },
    cutout: '68%',
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{subtitle}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-64 w-full">
          <Doughnut data={chartData} options={options} />
        </div>
      </CardContent>
    </Card>
  );
};

export default PackageDistributionChart;

