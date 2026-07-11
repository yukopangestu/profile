import { render, screen, fireEvent } from '@testing-library/react';
import Header from '@/components/Header';

describe('Header', () => {
  it('renders the logo', () => {
    render(<Header />);
    expect(screen.getByText('~/yuko-pangestu')).toBeInTheDocument();
  });

  it('renders all nav links on desktop', () => {
    render(<Header />);
    expect(screen.getByText('./home')).toBeInTheDocument();
    expect(screen.getByText('./skills')).toBeInTheDocument();
    expect(screen.getByText('./portfolio')).toBeInTheDocument();
    expect(screen.getByText('./experience')).toBeInTheDocument();
    expect(screen.getByText('./contact')).toBeInTheDocument();
  });

  it('renders the hire --me CTA', () => {
    render(<Header />);
    const hireMeLinks = screen.getAllByText('hire --me');
    expect(hireMeLinks.length).toBeGreaterThan(0);
  });

  it('hire --me links to the correct email', () => {
    render(<Header />);
    const hireMeLinks = screen.getAllByRole('link', { name: /hire --me/i });
    hireMeLinks.forEach(link => {
      expect(link).toHaveAttribute('href', 'mailto:yuko.pangestu@gmail.com');
    });
  });

  it('mobile menu is hidden by default', () => {
    render(<Header />);
    const menuButton = screen.getByLabelText('Toggle menu');
    expect(menuButton).toBeInTheDocument();
  });

  it('mobile menu toggles open on button click', () => {
    render(<Header />);
    const menuButton = screen.getByLabelText('Toggle menu');
    expect(screen.getByText('menu')).toBeInTheDocument();
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
