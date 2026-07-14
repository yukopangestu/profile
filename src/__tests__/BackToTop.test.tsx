import { render, screen, fireEvent } from '@testing-library/react';
import BackToTop from '@/components/BackToTop';

describe('BackToTop', () => {
  const setScrollY = (value: number) => {
    Object.defineProperty(window, 'scrollY', { value, configurable: true, writable: true });
  };

  afterEach(() => {
    setScrollY(0);
  });

  it('is hidden when near the top of the page', () => {
    setScrollY(0);
    render(<BackToTop />);
    const button = screen.getByLabelText('Back to top');
    expect(button.className).toContain('opacity-0');
    expect(button.className).toContain('pointer-events-none');
  });

  it('becomes visible after scrolling past the threshold', () => {
    setScrollY(0);
    render(<BackToTop />);
    const button = screen.getByLabelText('Back to top');

    setScrollY(500);
    fireEvent.scroll(window);

    expect(button.className).toContain('opacity-100');
    expect(button.className).toContain('pointer-events-auto');
  });

  it('scrolls to top when clicked', () => {
    setScrollY(500);
    render(<BackToTop />);
    fireEvent.scroll(window);

    const scrollToSpy = jest.fn();
    window.scrollTo = scrollToSpy;

    fireEvent.click(screen.getByLabelText('Back to top'));

    expect(scrollToSpy).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  });
});
