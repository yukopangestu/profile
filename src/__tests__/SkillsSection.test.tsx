import { render, screen } from '@testing-library/react';
import SkillsSection from '@/components/SkillsSection';

describe('SkillsSection', () => {
  it('has a section with id="skills"', () => {
    render(<SkillsSection />);
    expect(document.getElementById('skills')).toBeInTheDocument();
  });

  it('renders the section heading', () => {
    render(<SkillsSection />);
    expect(screen.getByRole('heading', { name: /Technical/i })).toBeInTheDocument();
    expect(screen.getByText('Ecosystem')).toBeInTheDocument();
  });

  it('renders all three skill groups', () => {
    render(<SkillsSection />);
    expect(screen.getByText('Backend Engineering')).toBeInTheDocument();
    expect(screen.getByText('Data & Storage')).toBeInTheDocument();
    expect(screen.getByText('Tech Leadership')).toBeInTheDocument();
  });

  it('renders key technology tags', () => {
    render(<SkillsSection />);
    expect(screen.getByText('Go')).toBeInTheDocument();
    expect(screen.getByText('PHP')).toBeInTheDocument();
    expect(screen.getByText('MySQL')).toBeInTheDocument();
    expect(screen.getByText('CI/CD')).toBeInTheDocument();
  });

  it('renders descriptions for each skill group', () => {
    render(<SkillsSection />);
    expect(screen.getByText(/10M\+ transactions/i)).toBeInTheDocument();
    expect(screen.getByText(/70%/i)).toBeInTheDocument();
    expect(screen.getByText(/15\+ engineers/i)).toBeInTheDocument();
  });
});
