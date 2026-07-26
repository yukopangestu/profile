import { provideRouter } from '@angular/router';
import { fireEvent, render, screen } from '@testing-library/angular';
import { HeaderComponent } from './header.component';

async function renderHeader() {
  return render(HeaderComponent, { providers: [provideRouter([])] });
}

describe('HeaderComponent', () => {
  it('renders the logo', async () => {
    await renderHeader();
    expect(screen.getByText('~/yuko-pangestu')).toBeInTheDocument();
  });

  it('renders all nav links', async () => {
    await renderHeader();
    expect(screen.getByText('./home')).toBeInTheDocument();
    expect(screen.getByText('./skills')).toBeInTheDocument();
    expect(screen.getByText('./portfolio')).toBeInTheDocument();
    expect(screen.getByText('./experience')).toBeInTheDocument();
    expect(screen.getByText('./contact')).toBeInTheDocument();
  });

  it('renders the hire --me CTA', async () => {
    await renderHeader();
    const hireMeLinks = screen.getAllByText('hire --me');
    expect(hireMeLinks.length).toBeGreaterThan(0);
  });

  it('hire --me links to the correct email', async () => {
    await renderHeader();
    const hireMeLinks = screen.getAllByRole('link', { name: /hire --me/i });
    hireMeLinks.forEach(link => {
      expect(link).toHaveAttribute('href', 'mailto:yuko.pangestu@gmail.com');
    });
  });

  it('mobile menu is hidden by default', async () => {
    await renderHeader();
    const menuButton = screen.getByLabelText('Toggle menu');
    expect(menuButton).toBeInTheDocument();
  });

  it('mobile menu toggles open on button click', async () => {
    await renderHeader();
    const menuButton = screen.getByLabelText('Toggle menu');
    expect(screen.getByText('menu')).toBeInTheDocument();
    fireEvent.click(menuButton);
    expect(screen.getByText('close')).toBeInTheDocument();
  });

  it('mobile menu closes again on second click', async () => {
    await renderHeader();
    const menuButton = screen.getByLabelText('Toggle menu');
    fireEvent.click(menuButton);
    fireEvent.click(menuButton);
    expect(screen.getByText('menu')).toBeInTheDocument();
  });

  it('marks ./home as the active nav item by default', async () => {
    await renderHeader();
    const home = screen.getByText('./home');
    expect(home).toHaveAttribute('aria-current', 'true');
  });

  it('highlights a nav item when clicked', async () => {
    const skills = document.createElement('section');
    skills.id = 'skills';
    document.body.appendChild(skills);

    await renderHeader();
    fireEvent.click(screen.getByText('./skills'));
    expect(screen.getByText('./skills')).toHaveAttribute('aria-current', 'true');
    expect(screen.getByText('./home')).not.toHaveAttribute('aria-current');

    skills.remove();
  });
});
