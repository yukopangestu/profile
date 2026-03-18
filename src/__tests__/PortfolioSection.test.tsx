import { render, screen } from '@testing-library/react';
import PortfolioSection from '@/components/PortfolioSection';
import { portfolioItems } from '@/data';

describe('PortfolioSection', () => {
  it('has a section with id="portfolio"', () => {
    render(<PortfolioSection />);
    expect(document.getElementById('portfolio')).toBeInTheDocument();
  });

  it('renders the section heading', () => {
    render(<PortfolioSection />);
    expect(screen.getByText(/Selected Works/i)).toBeInTheDocument();
    expect(screen.getByText(/architectural precision/i)).toBeInTheDocument();
  });

  it('renders the featured project title', () => {
    render(<PortfolioSection />);
    expect(screen.getByText(portfolioItems[0].title)).toBeInTheDocument();
  });

  it('renders all portfolio item titles', () => {
    render(<PortfolioSection />);
    portfolioItems.forEach(item => {
      expect(screen.getByText(item.title)).toBeInTheDocument();
    });
  });

  it('renders all portfolio item categories', () => {
    render(<PortfolioSection />);
    const categories = [...new Set(portfolioItems.map(i => i.category))];
    categories.forEach(cat => {
      expect(screen.getAllByText(cat).length).toBeGreaterThan(0);
    });
  });

  it('renders the Get in Touch CTA link', () => {
    render(<PortfolioSection />);
    const ctaLinks = screen.getAllByRole('link', { name: /get in touch/i });
    expect(ctaLinks.length).toBeGreaterThan(0);
  });
});
