import { render, screen, fireEvent } from '@testing-library/react';
import BackToTop from '@/components/BackToTop';

describe('BackToTop', () => {
  const setScrollY = (value: number) => {
    Object.defineProperty(window, 'scrollY', { value, configurable: true, writable: true });
  };

  const setLayout = ({ scrollHeight, innerHeight }: { scrollHeight: number; innerHeight: number }) => {
    Object.defineProperty(document.documentElement, 'scrollHeight', {
      value: scrollHeight,
      configurable: true,
    });
    Object.defineProperty(window, 'innerHeight', { value: innerHeight, configurable: true, writable: true });
  };

  beforeEach(() => {
    // Tall page, 800px viewport — plenty of room between "past threshold" and "near bottom".
    setLayout({ scrollHeight: 5000, innerHeight: 800 });
  });

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

  it('hides again once the footer is in view at the bottom of the page', () => {
    setScrollY(0);
    render(<BackToTop />);
    const button = screen.getByLabelText('Back to top');

    setScrollY(4300); // 4300 + 800 = 5100, past scrollHeight - 200 (4800)
    fireEvent.scroll(window);

    expect(button.className).toContain('opacity-0');
    expect(button.className).toContain('pointer-events-none');
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
