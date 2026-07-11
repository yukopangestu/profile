import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import WeatherWidget from '@/components/WeatherWidget';
import type { WeatherResponse } from '@/lib/weather';

const mockWeather: WeatherResponse = {
  ok: true,
  data: {
    location: 'Jakarta',
    temperature: 28.3,
    feelsLike: 31.1,
    humidity: 74,
    windSpeed: 11.2,
    weatherCode: 2,
    description: 'partly cloudy',
    icon: '⛅',
    updatedAt: new Date().toISOString(),
  },
};

describe('WeatherWidget', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it('shows loading then live weather (panel)', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => mockWeather,
    }) as jest.Mock;

    render(<WeatherWidget variant="panel" />);

    expect(screen.getByText(/connecting to open-meteo/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('28°C')).toBeInTheDocument();
    });
    expect(screen.getByText(/partly cloudy/i)).toBeInTheDocument();
    expect(screen.getByText('74%')).toBeInTheDocument();
    expect(screen.getAllByText(/Jakarta/).length).toBeGreaterThan(0);
  });

  it('renders chip variant with compact command prompt', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => mockWeather,
    }) as jest.Mock;

    render(<WeatherWidget variant="chip" />);

    expect(screen.getByText(/\$ weather --jakarta/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText('28°C')).toBeInTheDocument();
    });
  });

  it('shows error state and retries', async () => {
    const user = userEvent.setup();
    global.fetch = jest
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ ok: false, error: 'upstream 500' }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockWeather,
      }) as jest.Mock;

    render(<WeatherWidget variant="panel" />);

    await waitFor(() => {
      expect(screen.getByText(/upstream 500/i)).toBeInTheDocument();
    });

    await user.click(screen.getByRole('button', { name: /retry/i }));

    await waitFor(() => {
      expect(screen.getByText('28°C')).toBeInTheDocument();
    });
  });
});
