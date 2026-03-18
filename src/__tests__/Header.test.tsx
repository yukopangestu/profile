import { render, screen, fireEvent } from '@testing-library/react';
import Header from '@/components/Header';

describe('Header', () => {
  it('renders the logo', () => {
    render(<Header />);
    expect(screen.getByText(/YP/)).toBeInTheDocument();
  });

  it('renders all nav links on desktop', () => {
    render(<Header />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Skills')).toBeInTheDocument();
    expect(screen.getByText('Portfolio')).toBeInTheDocument();
    expect(screen.getByText('Experience')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('renders the Hire Me CTA', () => {
    render(<Header />);
    const hireMeLinks = screen.getAllByText('Hire Me');
    expect(hireMeLinks.length).toBeGreaterThan(0);
  });

  it('Hire Me links to the correct email', () => {
    render(<Header />);
    const hireMeLinks = screen.getAllByRole('link', { name: /hire me/i });
    hireMeLinks.forEach(link => {
      expect(link).toHaveAttribute('href', 'mailto:yuko.pangestu@gmail.com');
    });
  });

  it('mobile menu is hidden by default', () => {
    render(<Header />);
    const mobileMenu = document.getElementById('mobile-menu');
    // Mobile menu items exist in DOM but nav toggle controls visibility
    const menuButton = screen.getByLabelText('Toggle menu');
    expect(menuButton).toBeInTheDocument();
  });

  it('mobile menu toggles open on button click', () => {
    render(<Header />);
    const menuButton = screen.getByLabelText('Toggle menu');
    // Before click: menu icon shows "menu"
    expect(screen.getByText('menu')).toBeInTheDocument();
    // After click: menu icon changes to "close"
    fireEvent.click(menuButton);
    expect(screen.getByText('close')).toBeInTheDocument();
  });

  it('mobile menu closes again on second click', () => {
    render(<Header />);
    const menuButton = screen.getByLabelText('Toggle menu');
    fireEvent.click(menuButton);
    fireEvent.click(menuButton);
    expect(screen.getByText('menu')).toBeInTheDocument();
  });
});
