import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/Card';
import { useTheme } from '../../hooks/useTheme';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const PlacementStatsChart = ({
  data = {
    labels: ['2022', '2023', '2024', '2025', '2026'],
    placementRate: [74, 78, 83, 86, 82],
  },
  title = 'Annual Placement Rate Trend (%)',
  subtitle = 'Placement progression over the last 5 academic cohorts',
}) => {
  const { isDark } = useTheme();

  const textColor = isDark ? '#94A3B8' : '#64748B';
  const gridColor = isDark ? '#334155' : '#E2E8F0';

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Placement Rate (%)',
        data: data.placementRate,
        backgroundColor: '#2563EB',
        borderRadius: 8,
        hoverBackgroundColor: '#1D4ED8',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: isDark ? '#1E293B' : '#FFFFFF',
        titleColor: isDark ? '#F8FAFC' : '#0F172A',
        bodyColor: isDark ? '#CBD5E1' : '#334155',
        borderColor: isDark ? '#334155' : '#E2E8F0',
        borderWidth: 1,
        padding: 10,
        boxPadding: 4,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: textColor,
          font: { family: 'Inter', size: 12 },
        },
      },
      y: {
        min: 0,
        max: 100,
        grid: {
          color: gridColor,
        },
        ticks: {
          color: textColor,
          font: { family: 'Inter', size: 12 },
          callback: (value) => `${value}%`,
        },
      },
    },
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{subtitle}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-64 w-full">
          <Bar data={chartData} options={options} />
        </div>
      </CardContent>
    </Card>
  );
};

export default PlacementStatsChart;
