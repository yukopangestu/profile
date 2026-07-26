import { render, screen } from '@testing-library/angular';
import { ContactSectionComponent } from './contact-section.component';

describe('ContactSectionComponent', () => {
  it('has a section with id="contact"', async () => {
    await render(ContactSectionComponent);
    expect(document.getElementById('contact')).toBeInTheDocument();
  });

  it('renders the section heading', async () => {
    await render(ContactSectionComponent);
    expect(screen.getByText(/Let's Connect/i)).toBeInTheDocument();
  });

  it('renders the email address', async () => {
    await render(ContactSectionComponent);
    const emailLinks = screen.getAllByText('yuko.pangestu@gmail.com');
    expect(emailLinks.length).toBeGreaterThan(0);
  });

  it('email links have correct mailto href', async () => {
    await render(ContactSectionComponent);
    const emailLinks = screen.getAllByRole('link', { name: /yuko\.pangestu@gmail\.com/i });
    emailLinks.forEach(link => {
      expect(link).toHaveAttribute('href', 'mailto:yuko.pangestu@gmail.com');
    });
  });

  it('renders Jakarta location', async () => {
    await render(ContactSectionComponent);
    expect(screen.getByText(/Jakarta, Indonesia/i)).toBeInTheDocument();
  });

  it('renders all social links', async () => {
    await render(ContactSectionComponent);
    expect(screen.getAllByText('GitHub').length).toBeGreaterThan(0);
    expect(screen.getAllByText('LinkedIn').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Medium').length).toBeGreaterThan(0);
  });

  it('GitHub link points to correct URL', async () => {
    await render(ContactSectionComponent);
    const githubLinks = screen.getAllByRole('link', { name: /github/i });
    const externalGithub = githubLinks.find(l => l.getAttribute('href')?.includes('github.com'));
    expect(externalGithub).toHaveAttribute('href', 'https://github.com/yukopangestu');
  });

  it('LinkedIn link points to correct URL', async () => {
    await render(ContactSectionComponent);
    const linkedinLinks = screen.getAllByRole('link', { name: /linkedin/i });
    const externalLinkedin = linkedinLinks.find(l => l.getAttribute('href')?.includes('linkedin.com'));
    expect(externalLinkedin).toHaveAttribute('href', 'https://www.linkedin.com/in/yukopangestu/');
  });

  it('renders the CTA card with email and LinkedIn buttons', async () => {
    await render(ContactSectionComponent);
    expect(screen.getByRole('link', { name: /send an email/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /view linkedin/i })).toBeInTheDocument();
  });

  it('renders footer with copyright', async () => {
    await render(ContactSectionComponent);
    expect(screen.getAllByText(/yuko-pangestu|yuko pangestu/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/all rights reserved/i)).toBeInTheDocument();
  });
});
