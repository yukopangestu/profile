import { render, screen } from '@testing-library/angular';
import { SkillsSectionComponent } from './skills-section.component';

describe('SkillsSectionComponent', () => {
  it('has a section with id="skills"', async () => {
    await render(SkillsSectionComponent);
    expect(document.getElementById('skills')).toBeInTheDocument();
  });

  it('renders the section heading', async () => {
    await render(SkillsSectionComponent);
    expect(screen.getByRole('heading', { name: /Technical Ecosystem/i })).toBeInTheDocument();
  });

  it('renders all three skill groups', async () => {
    await render(SkillsSectionComponent);
    expect(screen.getByText('Backend Engineering')).toBeInTheDocument();
    expect(screen.getByText('Data & Storage')).toBeInTheDocument();
    expect(screen.getByText('Tech Leadership')).toBeInTheDocument();
  });

  it('renders key technology tags', async () => {
    await render(SkillsSectionComponent);
    expect(screen.getByText('Go')).toBeInTheDocument();
    expect(screen.getByText('PHP')).toBeInTheDocument();
    expect(screen.getByText('MySQL')).toBeInTheDocument();
    expect(screen.getByText('CI/CD')).toBeInTheDocument();
  });

  it('renders descriptions for each skill group', async () => {
    await render(SkillsSectionComponent);
    expect(screen.getByText(/10M\+ transactions/i)).toBeInTheDocument();
    expect(screen.getByText(/70%/i)).toBeInTheDocument();
    expect(screen.getByText(/15\+ engineers/i)).toBeInTheDocument();
  });

  it('renders terminal file titles', async () => {
    await render(SkillsSectionComponent);
    expect(screen.getByText('backend.go')).toBeInTheDocument();
    expect(screen.getByText('storage.sql')).toBeInTheDocument();
    expect(screen.getByText('lead.yaml')).toBeInTheDocument();
  });
});
