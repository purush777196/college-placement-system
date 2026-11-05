import { describe, it, expect } from 'vitest';
import { authMockService } from '../services/mock/auth.mock';
import { studentsMockService } from '../services/mock/students.mock';
import { drivesMockService } from '../services/mock/drives.mock';
import { applicationsMockService } from '../services/mock/applications.mock';
import { analyticsMockService } from '../services/mock/analytics.mock';
import { companiesMockService } from '../services/mock/companies.mock';
import { ROLES } from '../constants/roles';

describe('Mock Services Suite', () => {
  describe('authMockService', () => {
    it('authenticates a demo user successfully', async () => {
      const res = await authMockService.login({
        email: 'test@campus.edu',
        password: 'password123',
        role: ROLES.STUDENT,
      });
      expect(res.success).toBe(true);
      expect(res.token).toBeDefined();
      expect(res.user.role).toBe(ROLES.STUDENT);
    });

    it('rejects login with missing email or password', async () => {
      await expect(authMockService.login({ email: '' })).rejects.toThrow();
    });

    it('simulates password reset request', async () => {
      const res = await authMockService.requestPasswordReset('student@campus.edu');
      expect(res.success).toBe(true);
      expect(res.message).toContain('student@campus.edu');
    });
  });

  describe('studentsMockService', () => {
    it('fetches student list and total count', async () => {
      const res = await studentsMockService.getStudents();
      expect(res.data.length).toBeGreaterThan(0);
      expect(res.total).toBe(res.data.length);
    });

    it('filters students by search query', async () => {
      const res = await studentsMockService.getStudents({ search: 'Aarav' });
      expect(res.data.length).toBe(1);
      expect(res.data[0].name).toBe('Aarav Sharma');
    });

    it('fetches student by id or throws', async () => {
      const student = await studentsMockService.getStudentById('STD-2022-001');
      expect(student.name).toBe('Aarav Sharma');
      await expect(studentsMockService.getStudentById('INVALID-ID')).rejects.toThrow();
    });
  });

  describe('drivesMockService', () => {
    it('fetches active drives list', async () => {
      const res = await drivesMockService.getDrives();
      expect(res.data.length).toBeGreaterThan(0);
    });

    it('validates candidate eligibility correctly based on CGPA', async () => {
      // Google Cloud India requires 8.0 CGPA
      const eligible = await drivesMockService.checkEligibility('DRV-2026-01', 8.5);
      expect(eligible.eligible).toBe(true);

      const ineligible = await drivesMockService.checkEligibility('DRV-2026-01', 7.5);
      expect(ineligible.eligible).toBe(false);
    });
  });

  describe('applicationsMockService', () => {
    it('fetches student applications with timeline stages', async () => {
      const res = await applicationsMockService.getStudentApplications();
      expect(res.data.length).toBeGreaterThan(0);
      expect(res.data[0].timeline).toBeDefined();
      expect(res.data[0].timeline.length).toBeGreaterThan(0);
    });

    it('submits a new application successfully', async () => {
      const res = await applicationsMockService.applyToDrive('DRV-2026-01');
      expect(res.success).toBe(true);
      expect(res.applicationId).toBeDefined();
    });
  });

  describe('analyticsMockService', () => {
    it('returns valid placement KPIs', async () => {
      const kpis = await analyticsMockService.getDashboardKPIs();
      expect(kpis.totalStudents).toBeGreaterThan(0);
      expect(kpis.placementPercentage).toBeGreaterThan(0);
      expect(kpis.averagePackageLPA).toBeGreaterThan(0);
    });

    it('returns yearly trends and package distribution', async () => {
      const trends = await analyticsMockService.getYearlyTrends();
      expect(trends.labels.length).toBeGreaterThan(0);
      const dist = await analyticsMockService.getSalaryDistribution();
      expect(dist.labels.length).toBe(dist.studentCounts.length);
    });
  });

  describe('companiesMockService', () => {
    it('fetches corporate partners list', async () => {
      const res = await companiesMockService.getCompanies();
      expect(res.data.length).toBeGreaterThan(0);
      expect(res.data[0].name).toBeDefined();
    });
  });
});

