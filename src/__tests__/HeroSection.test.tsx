import { render, screen } from '@testing-library/react';
import HeroSection from '@/components/HeroSection';

describe('HeroSection', () => {
  it('renders the name', () => {
    render(<HeroSection />);
    expect(screen.getByText('Yuko')).toBeInTheDocument();
    expect(screen.getByText(/Pangestu/)).toBeInTheDocument();
  });

  it('renders the role/location label', () => {
    render(<HeroSection />);
    expect(screen.getByText(/Technical Lead/i)).toBeInTheDocument();
    expect(screen.getByText(/Paper\.id/i)).toBeInTheDocument();
    expect(screen.getByText(/Jakarta/i)).toBeInTheDocument();
  });

  it('renders the hero photo', () => {
    render(<HeroSection />);
    const img = screen.getByAltText('Yuko Pangestu');
    expect(img).toBeInTheDocument();
  });

  it('renders the View Portfolio link pointing to #portfolio', () => {
    render(<HeroSection />);
    const link = screen.getByRole('link', { name: /view portfolio/i });
    expect(link).toHaveAttribute('href', '#portfolio');
  });

  it('renders the My Experience link pointing to #experience', () => {
    render(<HeroSection />);
    const link = screen.getByRole('link', { name: /my experience/i });
    expect(link).toHaveAttribute('href', '#experience');
  });

  it('renders the years of experience metric chip', () => {
    render(<HeroSection />);
    expect(screen.getByText('8+ Years')).toBeInTheDocument();
    expect(screen.getByText(/Engineering Depth/i)).toBeInTheDocument();
  });

  it('has a section with id="home"', () => {
    render(<HeroSection />);
    expect(document.getElementById('home')).toBeInTheDocument();
  });
});
