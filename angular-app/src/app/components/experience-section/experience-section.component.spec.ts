import { render, screen } from '@testing-library/angular';
import { ExperienceSectionComponent } from './experience-section.component';
import { experiences } from '../../data/experience.data';

describe('ExperienceSectionComponent', () => {
  it('has a section with id="experience"', async () => {
    await render(ExperienceSectionComponent);
    expect(document.getElementById('experience')).toBeInTheDocument();
  });

  it('renders the section heading', async () => {
    await render(ExperienceSectionComponent);
    expect(screen.getByText(/Precision in Code/i)).toBeInTheDocument();
    expect(screen.getByText(/Leadership/i)).toBeInTheDocument();
  });

  it('renders the most recent four roles', async () => {
    await render(ExperienceSectionComponent);
    experiences.slice(0, 4).forEach(exp => {
      expect(screen.getByText(exp.role)).toBeInTheDocument();
    });
  });

  it('renders company names for recent roles', async () => {
    await render(ExperienceSectionComponent);
    const companies = [...new Set(experiences.slice(0, 4).map(e => e.company))];
    companies.forEach(company => {
      expect(screen.getAllByText(new RegExp(company)).length).toBeGreaterThan(0);
    });
  });

  it('renders earlier roles section', async () => {
    await render(ExperienceSectionComponent);
    expect(screen.getByText(/earlier roles/i)).toBeInTheDocument();
    experiences.slice(4).forEach(exp => {
      expect(screen.getByText(exp.role)).toBeInTheDocument();
    });
  });

  it('renders achievements for the most recent role', async () => {
    await render(ExperienceSectionComponent);
    experiences[0].achievements.forEach(achievement => {
      expect(screen.getByText(achievement)).toBeInTheDocument();
    });
  });

  it('renders stats strip with correct numbers', async () => {
    await render(ExperienceSectionComponent);
    expect(screen.getAllByText('8+').length).toBeGreaterThan(0);
    expect(screen.getByText('20+')).toBeInTheDocument();
    expect(screen.getByText('10M+')).toBeInTheDocument();
  });
});
