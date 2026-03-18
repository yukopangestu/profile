import { render, screen } from '@testing-library/react';
import AboutSection from '@/components/AboutSection';

describe('AboutSection', () => {
  it('has a section with id="about"', () => {
    render(<AboutSection />);
    expect(document.getElementById('about')).toBeInTheDocument();
  });

  it('renders the section heading', () => {
    render(<AboutSection />);
    expect(screen.getByText(/Precision in Code/i)).toBeInTheDocument();
    expect(screen.getByText(/Vision in Strategy/i)).toBeInTheDocument();
  });

  it('renders bio paragraphs', () => {
    render(<AboutSection />);
    expect(screen.getByText(/Technical Lead at Paper\.id/i)).toBeInTheDocument();
    expect(screen.getByText(/microservices/i)).toBeInTheDocument();
  });

  it('renders all key stats', () => {
    render(<AboutSection />);
    expect(screen.getByText('20+')).toBeInTheDocument();
    expect(screen.getByText('15+')).toBeInTheDocument();
    expect(screen.getByText('99.9%')).toBeInTheDocument();
  });

  it('renders Paper.id metrics card', () => {
    render(<AboutSection />);
    expect(screen.getByText('Paper.id')).toBeInTheDocument();
    expect(screen.getByText('$2M+')).toBeInTheDocument();
    expect(screen.getByText('10M+')).toBeInTheDocument();
    expect(screen.getByText('40%')).toBeInTheDocument();
    expect(screen.getByText('35%')).toBeInTheDocument();
  });
});
