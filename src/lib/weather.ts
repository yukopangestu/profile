/** Open-Meteo (browser-direct, CORS-friendly, no API key) */

export const JAKARTA = {
  name: 'Jakarta',
  latitude: -6.2088,
  longitude: 106.8456,
  timezone: 'Asia/Jakarta',
} as const;

export interface WeatherData {
  location: string;
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  weatherCode: number;
  description: string;
  icon: string;
  updatedAt: string;
}

interface OpenMeteoCurrent {
  temperature_2m: number;
  relative_humidity_2m: number;
  apparent_temperature: number;
  weather_code: number;
  wind_speed_10m: number;
}

interface OpenMeteoResponse {
  current?: OpenMeteoCurrent;
  error?: boolean;
  reason?: string;
}

const WMO: Record<number, { description: string; icon: string }> = {
  0: { description: 'clear sky', icon: '☀' },
  1: { description: 'mainly clear', icon: '☀' },
  2: { description: 'partly cloudy', icon: '⛅' },
  3: { description: 'overcast', icon: '☁' },
  45: { description: 'fog', icon: '〰' },
  48: { description: 'rime fog', icon: '〰' },
  51: { description: 'light drizzle', icon: '🌦' },
  53: { description: 'drizzle', icon: '🌦' },
  55: { description: 'heavy drizzle', icon: '🌧' },
  56: { description: 'freezing drizzle', icon: '🌧' },
  57: { description: 'heavy freezing drizzle', icon: '🌧' },
  61: { description: 'light rain', icon: '🌧' },
  63: { description: 'rain', icon: '🌧' },
  65: { description: 'heavy rain', icon: '⛈' },
  66: { description: 'freezing rain', icon: '🌧' },
  67: { description: 'heavy freezing rain', icon: '⛈' },
  71: { description: 'light snow', icon: '❄' },
  73: { description: 'snow', icon: '❄' },
  75: { description: 'heavy snow', icon: '❄' },
  77: { description: 'snow grains', icon: '❄' },
  80: { description: 'light showers', icon: '🌦' },
  81: { description: 'showers', icon: '🌧' },
  82: { description: 'heavy showers', icon: '⛈' },
  85: { description: 'light snow showers', icon: '❄' },
  86: { description: 'heavy snow showers', icon: '❄' },
  95: { description: 'thunderstorm', icon: '⚡' },
  96: { description: 'thunderstorm + hail', icon: '⚡' },
  99: { description: 'heavy thunderstorm + hail', icon: '⚡' },
};

export function interpretWeatherCode(code: number): { description: string; icon: string } {
  return WMO[code] ?? { description: 'unknown', icon: '?' };
}

export function formatTemp(celsius: number): string {
  return `${Math.round(celsius)}°C`;
}

export function formatWind(kmh: number): string {
  return `${Math.round(kmh)} km/h`;
}

/** Relative time label for last update (client-side friendly). */
export function formatUpdatedAt(iso: string, now = Date.now()): string {
  const diffMs = now - new Date(iso).getTime();
  if (Number.isNaN(diffMs) || diffMs < 0) return 'just now';
  const mins = Math.floor(diffMs / 60_000);
  if (mins < 1) return 'just now';
  if (mins === 1) return '1 min ago';
  if (mins < 60) return `${mins} min ago`;
  const hours = Math.floor(mins / 60);
  if (hours === 1) return '1 hr ago';
  if (hours < 24) return `${hours} hr ago`;
  return new Date(iso).toLocaleString('en-GB', {
    timeZone: JAKARTA.timezone,
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function openMeteoUrl(): string {
  const params = new URLSearchParams({
    latitude: String(JAKARTA.latitude),
    longitude: String(JAKARTA.longitude),
    current: [
      'temperature_2m',
      'relative_humidity_2m',
      'apparent_temperature',
      'weather_code',
      'wind_speed_10m',
    ].join(','),
    timezone: JAKARTA.timezone,
    wind_speed_unit: 'kmh',
  });
  return `https://api.open-meteo.com/v1/forecast?${params}`;
}

/** Fetch Jakarta weather directly from Open-Meteo (no backend). */
export async function fetchJakartaWeather(signal?: AbortSignal): Promise<WeatherData> {
  const res = await fetch(openMeteoUrl(), {
    signal,
    headers: { Accept: 'application/json' },
  });

  if (!res.ok) {
    throw new Error(`open-meteo ${res.status}`);
  }

  const json = (await res.json()) as OpenMeteoResponse;

  if (json.error || !json.current) {
    throw new Error(json.reason ?? 'no current weather data');
  }

  const { current } = json;
  const { description, icon } = interpretWeatherCode(current.weather_code);

  return {
    location: JAKARTA.name,
    temperature: current.temperature_2m,
    feelsLike: current.apparent_temperature,
    humidity: current.relative_humidity_2m,
    windSpeed: current.wind_speed_10m,
    weatherCode: current.weather_code,
    description,
    icon,
    updatedAt: new Date().toISOString(),
  };
}
