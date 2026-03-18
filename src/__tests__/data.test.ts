import { portfolioItems, experiences } from '@/data';

describe('portfolioItems', () => {
  it('has at least one item', () => {
    expect(portfolioItems.length).toBeGreaterThan(0);
  });

  it('each item has required fields', () => {
    portfolioItems.forEach(item => {
      expect(item).toHaveProperty('id');
      expect(item).toHaveProperty('category');
      expect(item).toHaveProperty('title');
      expect(item).toHaveProperty('image');
      expect(item).toHaveProperty('description');
    });
  });

  it('each item has non-empty strings', () => {
    portfolioItems.forEach(item => {
      expect(item.category.trim()).not.toBe('');
      expect(item.title.trim()).not.toBe('');
      expect(item.image.trim()).not.toBe('');
      expect(item.description.trim()).not.toBe('');
    });
  });

  it('each item has a unique id', () => {
    const ids = portfolioItems.map(item => item.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });
});

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

  it('most recent role is Technical Lead at Paper.id', () => {
    expect(experiences[0].role).toBe('Technical Lead');
    expect(experiences[0].company).toBe('Paper.id');
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
