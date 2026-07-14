import { render, screen } from '@testing-library/react';
import HeroSection from '@/components/HeroSection';

describe('HeroSection', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        current: {
          temperature_2m: 30,
          relative_humidity_2m: 70,
          apparent_temperature: 33,
          weather_code: 0,
          wind_speed_10m: 10,
        },
      }),
    }) as jest.Mock;
  });

  it('renders the name', () => {
    render(<HeroSection />);
    expect(screen.getByText(/Yuko/)).toBeInTheDocument();
    expect(screen.getByText(/Pangestu/)).toBeInTheDocument();
  });

  it('renders the role/location label', () => {
    render(<HeroSection />);
    expect(screen.getAllByText(/senior full stack/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/jakarta/i).length).toBeGreaterThan(0);
  });

  it('renders the hero photo', () => {
    render(<HeroSection />);
    const img = screen.getByAltText('Yuko Pangestu');
    expect(img).toBeInTheDocument();
  });

  it('renders the View Portfolio link pointing to #portfolio', () => {
    render(<HeroSection />);
    const link = screen.getByRole('link', { name: /view \.\/portfolio/i });
    expect(link).toHaveAttribute('href', '#portfolio');
  });

  it('renders the experience link pointing to #experience', () => {
    render(<HeroSection />);
    const link = screen.getByRole('link', { name: /cat experience\.md/i });
    expect(link).toHaveAttribute('href', '#experience');
  });

  it('renders the years of experience metric chip', () => {
    render(<HeroSection />);
    expect(screen.getByText('8+ years')).toBeInTheDocument();
    expect(screen.getByText(/engineering depth/i)).toBeInTheDocument();
  });

  it('has a section with id="home"', () => {
    render(<HeroSection />);
    expect(document.getElementById('home')).toBeInTheDocument();
  });

  it('renders the status badge', () => {
    render(<HeroSection />);
    expect(screen.getByText(/on developing right now/i)).toBeInTheDocument();
  });

  it('mentions currently developing stack', () => {
    render(<HeroSection />);
    expect(screen.getByText(/Currently developing Java, Go, and Angular/i)).toBeInTheDocument();
  });

  it('includes the weather widget', () => {
    render(<HeroSection />);
    expect(screen.getAllByText(/weather/i).length).toBeGreaterThan(0);
  });
});
