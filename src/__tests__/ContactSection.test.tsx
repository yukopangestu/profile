import { render, screen } from '@testing-library/react';
import ContactSection from '@/components/ContactSection';

describe('ContactSection', () => {
  it('has a section with id="contact"', () => {
    render(<ContactSection />);
    expect(document.getElementById('contact')).toBeInTheDocument();
  });

  it('renders the section heading', () => {
    render(<ContactSection />);
    expect(screen.getByText(/Let's Connect/i)).toBeInTheDocument();
  });

  it('renders the email address', () => {
    render(<ContactSection />);
    const emailLinks = screen.getAllByText('yuko.pangestu@gmail.com');
    expect(emailLinks.length).toBeGreaterThan(0);
  });

  it('email links have correct mailto href', () => {
    render(<ContactSection />);
    const emailLinks = screen.getAllByRole('link', { name: /yuko\.pangestu@gmail\.com/i });
    emailLinks.forEach(link => {
      expect(link).toHaveAttribute('href', 'mailto:yuko.pangestu@gmail.com');
    });
  });

  it('renders Jakarta location', () => {
    render(<ContactSection />);
    expect(screen.getByText(/Jakarta, Indonesia/i)).toBeInTheDocument();
  });

  it('renders all social links', () => {
    render(<ContactSection />);
    expect(screen.getAllByText('GitHub').length).toBeGreaterThan(0);
    expect(screen.getAllByText('LinkedIn').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Medium').length).toBeGreaterThan(0);
  });

  it('GitHub link points to correct URL', () => {
    render(<ContactSection />);
    const githubLinks = screen.getAllByRole('link', { name: /github/i });
    const externalGithub = githubLinks.find(l =>
      l.getAttribute('href')?.includes('github.com')
    );
    expect(externalGithub).toHaveAttribute('href', 'https://github.com/yukopangestu');
  });

  it('LinkedIn link points to correct URL', () => {
    render(<ContactSection />);
    const linkedinLinks = screen.getAllByRole('link', { name: /linkedin/i });
    const externalLinkedin = linkedinLinks.find(l =>
      l.getAttribute('href')?.includes('linkedin.com')
    );
    expect(externalLinkedin).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/yukopangestu/'
    );
  });

  it('renders the CTA card with email and LinkedIn buttons', () => {
    render(<ContactSection />);
    expect(screen.getByRole('link', { name: /send an email/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /view linkedin/i })).toBeInTheDocument();
  });

  it('renders footer with copyright', () => {
    render(<ContactSection />);
    expect(screen.getAllByText(/Yuko Pangestu/).length).toBeGreaterThan(0);
    expect(screen.getByText(/All rights reserved/i)).toBeInTheDocument();
  });
});
