import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { render, screen } from '@testing-library/angular';
import { HeroSectionComponent } from './hero-section.component';

async function renderHero() {
  return render(HeroSectionComponent, {
    providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])],
  });
}

describe('HeroSectionComponent', () => {
  it('renders the name', async () => {
    await renderHero();
    expect(screen.getByText(/Yuko/)).toBeInTheDocument();
    expect(screen.getByText(/Pangestu/)).toBeInTheDocument();
  });

  it('renders the role/location label', async () => {
    await renderHero();
    expect(screen.getAllByText(/senior full stack/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/jakarta/i).length).toBeGreaterThan(0);
  });

  it('renders the hero photo', async () => {
    await renderHero();
    expect(screen.getByAltText('Yuko Pangestu')).toBeInTheDocument();
  });

  it('renders the View Portfolio link pointing to /portfolio', async () => {
    await renderHero();
    const link = screen.getByRole('link', { name: /view \.\/portfolio/i });
    expect(link).toHaveAttribute('href', '/portfolio');
  });

  it('renders the experience link pointing to #experience', async () => {
    await renderHero();
    const link = screen.getByRole('link', { name: /cat experience\.md/i });
    expect(link).toHaveAttribute('href', '#experience');
  });

  it('renders the years of experience metric chip', async () => {
    await renderHero();
    expect(screen.getByText('8+ years')).toBeInTheDocument();
    expect(screen.getByText(/engineering depth/i)).toBeInTheDocument();
  });

  it('has a section with id="home"', async () => {
    await renderHero();
    expect(document.getElementById('home')).toBeInTheDocument();
  });

  it('renders the status badge', async () => {
    await renderHero();
    expect(screen.getByText(/on developing right now/i)).toBeInTheDocument();
  });

  it('mentions currently developing stack', async () => {
    await renderHero();
    expect(screen.getByText(/Currently developing Java, Go, and Angular/i)).toBeInTheDocument();
  });

  it('includes the weather widget', async () => {
    await renderHero();
    expect(document.querySelectorAll('app-weather-widget').length).toBeGreaterThan(0);
  });
});
