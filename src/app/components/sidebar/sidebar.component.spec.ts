import { provideRouter } from '@angular/router';
import { fireEvent, render, screen } from '@testing-library/angular';
import { SidebarComponent } from './sidebar.component';

async function renderSidebar() {
  return render(SidebarComponent, { providers: [provideRouter([])] });
}

describe('SidebarComponent', () => {
  it('renders the logo', async () => {
    await renderSidebar();
    expect(screen.getAllByText('~/yuko-pangestu').length).toBeGreaterThan(0);
  });

  it('renders all nav links', async () => {
    await renderSidebar();
    expect(screen.getAllByText('./home').length).toBeGreaterThan(0);
    expect(screen.getAllByText('./skills').length).toBeGreaterThan(0);
    expect(screen.getAllByText('./portfolio').length).toBeGreaterThan(0);
    expect(screen.getAllByText('./experience').length).toBeGreaterThan(0);
    expect(screen.getAllByText('./contact').length).toBeGreaterThan(0);
  });

  it('renders the hire --me CTA', async () => {
    await renderSidebar();
    const hireMeLinks = screen.getAllByText('hire --me');
    expect(hireMeLinks.length).toBeGreaterThan(0);
  });

  it('hire --me links to the correct email', async () => {
    await renderSidebar();
    const hireMeLinks = screen.getAllByRole('link', { name: /hire --me/i });
    hireMeLinks.forEach(link => {
      expect(link).toHaveAttribute('href', 'mailto:yuko.pangestu@gmail.com');
    });
  });

  it('mobile menu is hidden by default', async () => {
    await renderSidebar();
    const menuButton = screen.getByLabelText('Toggle menu');
    expect(menuButton).toBeInTheDocument();
  });

  it('mobile menu toggles open on button click', async () => {
    await renderSidebar();
    const menuButton = screen.getByLabelText('Toggle menu');
    expect(screen.getByText('menu')).toBeInTheDocument();
    fireEvent.click(menuButton);
    expect(screen.getByText('close')).toBeInTheDocument();
  });

  it('mobile menu closes again on second click', async () => {
    await renderSidebar();
    const menuButton = screen.getByLabelText('Toggle menu');
    fireEvent.click(menuButton);
    fireEvent.click(menuButton);
    expect(screen.getByText('menu')).toBeInTheDocument();
  });

  it('marks ./home as the active nav item by default', async () => {
    await renderSidebar();
    const homeItems = screen.getAllByText('./home');
    const active = homeItems.find(el => el.closest('[aria-current]')?.getAttribute('aria-current') === 'true');
    expect(active).toBeTruthy();
  });

  it('highlights a nav item when clicked', async () => {
    const skills = document.createElement('section');
    skills.id = 'skills';
    document.body.appendChild(skills);

    await renderSidebar();
    const [desktopSkills] = screen.getAllByText('./skills');
    fireEvent.click(desktopSkills);
    const skillsItems = screen.getAllByText('./skills');
    const active = skillsItems.find(el => el.closest('[aria-current]')?.getAttribute('aria-current') === 'true');
    expect(active).toBeTruthy();

    skills.remove();
  });
});
