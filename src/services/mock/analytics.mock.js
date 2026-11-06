/**
 * Mock Analytics Service
 * Placement analytics, institutional metrics, and student dashboard charts datasets.
 */

const delay = (ms = 180) => new Promise((resolve) => setTimeout(resolve, ms));

export const MOCK_ANALYTICS = {
  kpis: {
    totalStudents: 1450,
    placedStudents: 1190,
    placementPercentage: 82.1,
    participatingCompanies: 112,
    totalOffers: 1680,
    highestPackageLPA: 54.0,
    averagePackageLPA: 14.8,
    medianPackageLPA: 12.0,
  },
  yearlyTrends: {
    labels: ['2022', '2023', '2024', '2025', '2026 (YTD)'],
    placementRate: [74, 78, 83, 86, 82.1],
    avgPackage: [8.5, 10.2, 12.4, 13.9, 14.8],
  },
  departmentWise: [
    { department: 'Computer Science', total: 420, placed: 395, percentage: 94.0, avgLPA: 18.2 },
    { department: 'Information Technology', total: 240, placed: 218, percentage: 90.8, avgLPA: 16.5 },
    { department: 'Electronics & Comm.', total: 310, placed: 260, percentage: 83.8, avgLPA: 12.4 },
    { department: 'Electrical & Electronics', total: 220, placed: 165, percentage: 75.0, avgLPA: 9.8 },
    { department: 'Mechanical Engineering', total: 260, placed: 152, percentage: 58.5, avgLPA: 8.2 },
  ],
  salaryDistribution: {
    labels: ['< 6 LPA', '6 - 10 LPA', '10 - 18 LPA', '18 - 30 LPA', '30+ LPA'],
    studentCounts: [120, 390, 440, 185, 55],
  },
  studentAnalytics: {
    statusDistribution: {
      labels: ['Applied', 'Under Review', 'Shortlisted', 'Assessment', 'Interview', 'Offered'],
      counts: [1, 1, 1, 1, 1, 1],
      colors: ['#3B82F6', '#8B5CF6', '#0EA5E9', '#F59E0B', '#EAB308', '#10B981'],
    },
    monthlyActivity: {
      labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov'],
      applications: [0, 1, 2, 2, 1],
    },
    opportunityDistribution: {
      labels: ['Core (10-18 LPA)', 'Dream (18-28 LPA)', 'Super Dream (30+ LPA)'],
      counts: [2, 3, 2],
      percentages: [28, 43, 29],
    },
    conversionOverview: {
      labels: ['Eligible Drives', 'Applications', 'Shortlisted', 'Interviews', 'Offers'],
      counts: [8, 6, 3, 2, 1],
    },
  },
};

export const analyticsMockService = {
  async getDashboardKPIs() {
    await delay();
    return MOCK_ANALYTICS.kpis;
  },

  async getYearlyTrends() {
    await delay();
    return MOCK_ANALYTICS.yearlyTrends;
  },

  async getDepartmentStats() {
    await delay();
    return MOCK_ANALYTICS.departmentWise;
  },

  async getSalaryDistribution() {
    await delay();
    return MOCK_ANALYTICS.salaryDistribution;
  },

  /**
   * Analytics datasets for student dashboard visualizations
   */
  async getStudentAnalytics(_studentId = 'std_01') {
    await delay();
    return MOCK_ANALYTICS.studentAnalytics;
  },
};
