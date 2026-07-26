import { render, screen } from '@testing-library/angular';
import { AboutSectionComponent } from './about-section.component';

describe('AboutSectionComponent', () => {
  it('has a section with id="about"', async () => {
    await render(AboutSectionComponent);
    expect(document.getElementById('about')).toBeInTheDocument();
  });

  it('renders the section heading', async () => {
    await render(AboutSectionComponent);
    expect(screen.getByText(/Precision in Code/i)).toBeInTheDocument();
    expect(screen.getByText(/Vision in Strategy/i)).toBeInTheDocument();
  });

  it('renders bio paragraphs', async () => {
    await render(AboutSectionComponent);
    expect(screen.getAllByText(/Technical Lead/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/microservices/i)).toBeInTheDocument();
  });

  it('renders all key stats', async () => {
    await render(AboutSectionComponent);
    expect(screen.getByText('20+')).toBeInTheDocument();
    expect(screen.getByText('15+')).toBeInTheDocument();
    expect(screen.getByText('99.9%')).toBeInTheDocument();
  });

  it('renders current status metrics card', async () => {
    await render(AboutSectionComponent);
    expect(screen.getByText('Sobat Bisnis Group')).toBeInTheDocument();
    expect(screen.getByText(/senior full stack developer/i)).toBeInTheDocument();
    expect(screen.getByText('$2M+')).toBeInTheDocument();
    expect(screen.getByText('10M+')).toBeInTheDocument();
    expect(screen.getByText('40%')).toBeInTheDocument();
    expect(screen.getByText('35%')).toBeInTheDocument();
  });
});
