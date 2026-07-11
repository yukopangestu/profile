import { NextResponse } from 'next/server';
import {
  JAKARTA,
  interpretWeatherCode,
  type WeatherData,
  type WeatherResponse,
} from '@/lib/weather';

export const dynamic = 'force-dynamic';
export const revalidate = 900; // 15 minutes

interface OpenMeteoCurrent {
  temperature_2m: number;
  relative_humidity_2m: number;
  apparent_temperature: number;
  weather_code: number;
  wind_speed_10m: number;
  time: string;
}

interface OpenMeteoResponse {
  current?: OpenMeteoCurrent;
  error?: boolean;
  reason?: string;
}

export async function GET() {
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

  try {
    const res = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`, {
      next: { revalidate: 900 },
      headers: { Accept: 'application/json' },
    });

    if (!res.ok) {
      const body: WeatherResponse = {
        ok: false,
        error: `upstream ${res.status}`,
      };
      return NextResponse.json(body, { status: 502 });
    }

    const json = (await res.json()) as OpenMeteoResponse;

    if (json.error || !json.current) {
      const body: WeatherResponse = {
        ok: false,
        error: json.reason ?? 'no current weather data',
      };
      return NextResponse.json(body, { status: 502 });
    }

    const { current } = json;
    const { description, icon } = interpretWeatherCode(current.weather_code);

    const data: WeatherData = {
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

    const body: WeatherResponse = { ok: true, data };
    return NextResponse.json(body, {
      headers: {
        'Cache-Control': 'public, s-maxage=900, stale-while-revalidate=1800',
      },
    });
  } catch {
    const body: WeatherResponse = {
      ok: false,
      error: 'failed to fetch weather',
    };
    return NextResponse.json(body, { status: 502 });
  }
}
