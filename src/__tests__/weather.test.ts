import {
  fetchJakartaWeather,
  formatTemp,
  formatUpdatedAt,
  formatWind,
  interpretWeatherCode,
  JAKARTA,
  openMeteoUrl,
} from '@/lib/weather';

describe('weather lib', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('exposes Jakarta coordinates', () => {
    expect(JAKARTA.name).toBe('Jakarta');
    expect(JAKARTA.latitude).toBeCloseTo(-6.2088);
    expect(JAKARTA.longitude).toBeCloseTo(106.8456);
  });

  it('builds an open-meteo forecast URL for Jakarta', () => {
    const url = openMeteoUrl();
    expect(url).toContain('api.open-meteo.com/v1/forecast');
    expect(url).toContain('latitude=-6.2088');
    expect(url).toContain('longitude=106.8456');
  });

  it('maps known WMO codes', () => {
    expect(interpretWeatherCode(0)).toEqual({ description: 'clear sky', icon: '☀' });
    expect(interpretWeatherCode(63).description).toBe('rain');
    expect(interpretWeatherCode(95).description).toBe('thunderstorm');
  });

  it('falls back for unknown codes', () => {
    expect(interpretWeatherCode(999)).toEqual({ description: 'unknown', icon: '?' });
  });

  it('formats temperature and wind', () => {
    expect(formatTemp(28.4)).toBe('28°C');
    expect(formatTemp(28.6)).toBe('29°C');
    expect(formatWind(12.4)).toBe('12 km/h');
  });

  it('formats relative update times', () => {
    const now = new Date('2026-07-11T12:00:00.000Z').getTime();
    expect(formatUpdatedAt(new Date(now - 30_000).toISOString(), now)).toBe('just now');
    expect(formatUpdatedAt(new Date(now - 60_000).toISOString(), now)).toBe('1 min ago');
    expect(formatUpdatedAt(new Date(now - 5 * 60_000).toISOString(), now)).toBe('5 min ago');
    expect(formatUpdatedAt(new Date(now - 2 * 60 * 60_000).toISOString(), now)).toBe('2 hr ago');
  });

  it('parses Open-Meteo responses into WeatherData', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        current: {
          temperature_2m: 30.2,
          relative_humidity_2m: 80,
          apparent_temperature: 34,
          weather_code: 0,
          wind_speed_10m: 8,
        },
      }),
    }) as jest.Mock;

    const data = await fetchJakartaWeather();
    expect(data.location).toBe('Jakarta');
    expect(data.temperature).toBe(30.2);
    expect(data.description).toBe('clear sky');
    expect(data.icon).toBe('☀');
  });
});

