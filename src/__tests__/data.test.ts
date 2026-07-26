import { experiences } from '@/data';

describe('experiences', () => {
  it('has at least one entry', () => {
    expect(experiences.length).toBeGreaterThan(0);
  });

  it('each entry has required fields', () => {
    experiences.forEach(exp => {
      expect(exp).toHaveProperty('role');
      expect(exp).toHaveProperty('company');
      expect(exp).toHaveProperty('period');
      expect(exp).toHaveProperty('achievements');
    });
  });

  it('each entry has non-empty strings', () => {
    experiences.forEach(exp => {
      expect(exp.role.trim()).not.toBe('');
      expect(exp.company.trim()).not.toBe('');
      expect(exp.period.trim()).not.toBe('');
    });
  });

  it('each entry has at least one achievement', () => {
    experiences.forEach(exp => {
      expect(exp.achievements.length).toBeGreaterThan(0);
      exp.achievements.forEach(a => expect(a.trim()).not.toBe(''));
    });
  });

  it('most recent role is Senior Full Stack Developer at Sobat Bisnis Group', () => {
    expect(experiences[0].role).toBe('Senior Full Stack Developer');
    expect(experiences[0].company).toBe('Sobat Bisnis Group');
  });

  it('periods are in descending chronological order', () => {
    // Extract start years from period strings like "Feb 2023 – Oct 2025"
    const startYears = experiences.map(exp => {
      const match = exp.period.match(/(\d{4})/);
      return match ? parseInt(match[1]) : 0;
    });
    for (let i = 0; i < startYears.length - 1; i++) {
      expect(startYears[i]).toBeGreaterThanOrEqual(startYears[i + 1]);
    }
  });
});
