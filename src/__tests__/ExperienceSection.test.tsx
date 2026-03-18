import { render, screen } from '@testing-library/react';
import ExperienceSection from '@/components/ExperienceSection';
import { experiences } from '@/data';

describe('ExperienceSection', () => {
  it('has a section with id="experience"', () => {
    render(<ExperienceSection />);
    expect(document.getElementById('experience')).toBeInTheDocument();
  });

  it('renders the section heading', () => {
    render(<ExperienceSection />);
    expect(screen.getByText(/Precision in Code/i)).toBeInTheDocument();
    expect(screen.getByText(/Leadership/i)).toBeInTheDocument();
  });

  it('renders the most recent four roles', () => {
    render(<ExperienceSection />);
    experiences.slice(0, 4).forEach(exp => {
      expect(screen.getByText(exp.role)).toBeInTheDocument();
    });
  });

  it('renders company names for recent roles', () => {
    render(<ExperienceSection />);
    const companies = [...new Set(experiences.slice(0, 4).map(e => e.company))];
    companies.forEach(company => {
      expect(screen.getAllByText(company).length).toBeGreaterThan(0);
    });
  });

  it('renders earlier roles section', () => {
    render(<ExperienceSection />);
    expect(screen.getByText(/Earlier Roles/i)).toBeInTheDocument();
    experiences.slice(4).forEach(exp => {
      expect(screen.getByText(new RegExp(exp.role))).toBeInTheDocument();
    });
  });

  it('renders achievements for the most recent role', () => {
    render(<ExperienceSection />);
    experiences[0].achievements.forEach(achievement => {
      expect(screen.getByText(achievement)).toBeInTheDocument();
    });
  });

  it('renders stats strip with correct numbers', () => {
    render(<ExperienceSection />);
    expect(screen.getAllByText('8+').length).toBeGreaterThan(0);
    expect(screen.getByText('20+')).toBeInTheDocument();
    expect(screen.getByText('10M+')).toBeInTheDocument();
  });
});
