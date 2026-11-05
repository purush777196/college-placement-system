/**
 * Mock Companies Service
 * Illustrative partner companies dataset and operations.
 */
const delay = (ms = 180) => new Promise((resolve) => setTimeout(resolve, ms));

export const MOCK_COMPANIES = [
  {
    id: 'CMP-001',
    name: 'Google Cloud India',
    industry: 'Cloud & Enterprise Tech',
    tier: 'Tier 1 / Super Dream',
    website: 'https://cloud.google.com',
    location: 'Bengaluru / Hyderabad',
    activeDrives: 2,
    hiredCount: 14,
    avgPackage: 32.5,
    logo: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=80',
    status: 'Active Partner',
  },
  {
    id: 'CMP-002',
    name: 'Microsoft IDC',
    industry: 'Software & Cloud Services',
    tier: 'Tier 1 / Super Dream',
    website: 'https://microsoft.com',
    location: 'Hyderabad / Noida',
    activeDrives: 1,
    hiredCount: 18,
    avgPackage: 28.0,
    logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=80',
    status: 'Active Partner',
  },
  {
    id: 'CMP-003',
    name: 'Amazon Web Services',
    industry: 'E-commerce & Cloud Computing',
    tier: 'Tier 1 / Super Dream',
    website: 'https://aws.amazon.com',
    location: 'Bengaluru / Chennai',
    activeDrives: 2,
    hiredCount: 22,
    avgPackage: 30.0,
    logo: 'https://images.unsplash.com/photo-1523474255658-4af61b1684c4?w=80',
    status: 'Active Partner',
  },
  {
    id: 'CMP-004',
    name: 'NovaTech Global Inc.',
    industry: 'FinTech & AI Systems',
    tier: 'Tier 2 / Dream',
    website: 'https://novatech.io',
    location: 'Pune / Remote',
    activeDrives: 1,
    hiredCount: 9,
    avgPackage: 18.5,
    logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=80',
    status: 'Active Partner',
  },
  {
    id: 'CMP-005',
    name: 'Tata Consultancy Services (Digital)',
    industry: 'Consulting & Digital Engineering',
    tier: 'Core / IT Services',
    website: 'https://tcs.com',
    location: 'Pan India',
    activeDrives: 1,
    hiredCount: 85,
    avgPackage: 7.5,
    logo: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=80',
    status: 'Active Partner',
  },
];

export const companiesMockService = {
  async getCompanies(filters = {}) {
    await delay();
    let result = [...MOCK_COMPANIES];

    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.industry.toLowerCase().includes(q) ||
          c.tier.toLowerCase().includes(q)
      );
    }

    return {
      data: result,
      total: result.length,
    };
  },

  async getCompanyById(id) {
    await delay();
    const company = MOCK_COMPANIES.find((c) => c.id === id);
    if (!company) throw new Error(`Company with ID ${id} not found`);
    return company;
  },
};
