'use client';

import { useCallback, useEffect, useState } from 'react';
import TerminalChrome from './TerminalChrome';
import {
  formatTemp,
  formatUpdatedAt,
  formatWind,
  type WeatherData,
  type WeatherResponse,
} from '@/lib/weather';

type Status = 'loading' | 'ready' | 'error';

interface WeatherWidgetProps {
  /** Compact floating chip style (hero) vs full terminal panel */
  variant?: 'chip' | 'panel';
  className?: string;
}

export default function WeatherWidget({ variant = 'panel', className = '' }: WeatherWidgetProps) {
  const [status, setStatus] = useState<Status>('loading');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [now, setNow] = useState(() => Date.now());

  const load = useCallback(async (signal?: AbortSignal) => {
    setStatus(prev => (prev === 'ready' ? 'ready' : 'loading'));
    setError(null);
    try {
      const res = await fetch('/api/weather', { signal });
      const json = (await res.json()) as WeatherResponse;
      if (!json.ok) {
        setError(json.error);
        setStatus('error');
        return;
      }
      setWeather(json.data);
      setStatus('ready');
      setNow(Date.now());
    } catch (err) {
      if ((err as Error).name === 'AbortError') return;
      setError('offline');
      setStatus('error');
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    load(controller.signal);
    return () => controller.abort();
  }, [load]);

  // Refresh relative "updated" label every minute
  useEffect(() => {
    if (status !== 'ready') return;
    const id = window.setInterval(() => setNow(Date.now()), 60_000);
    return () => window.clearInterval(id);
  }, [status]);

  if (variant === 'chip') {
    return (
      <div
        className={`bg-terminal-surface border border-term-strong rounded-lg px-4 sm:px-5 py-3 font-mono text-xs shadow-[0_12px_40px_rgba(0,0,0,0.5)] ${className}`}
        aria-live="polite"
        aria-busy={status === 'loading'}
      >
        <div className="text-terminal-faint text-[10px] mb-1">$ weather --jakarta</div>
        {status === 'loading' && (
          <div className="text-terminal-dim animate-pulse">fetching…</div>
        )}
        {status === 'error' && (
          <div className="text-terminal-faint" title={error ?? undefined}>
            weather offline
          </div>
        )}
        {status === 'ready' && weather && (
          <>
            <div className="flex items-baseline gap-2">
              <span className="text-base leading-none" aria-hidden>
                {weather.icon}
              </span>
              <span className="text-terminal-blue font-bold text-sm sm:text-base">
                {formatTemp(weather.temperature)}
              </span>
            </div>
            <div className="text-terminal-faint mt-0.5 capitalize">{weather.description}</div>
          </>
        )}
      </div>
    );
  }

  return (
    <div
      className={`bg-terminal-surface border border-term rounded-[10px] overflow-hidden w-full min-w-0 ${className}`}
      aria-live="polite"
      aria-busy={status === 'loading'}
    >
      <TerminalChrome title="weather --live jakarta" size="sm" />
      <div className="px-4 sm:px-5 py-4 sm:py-5 font-mono text-[12px] sm:text-[13px]">
        <div className="text-terminal-faint text-[11px] mb-3">
          <span className="text-terminal-blue">$</span> curl wttr.in/Jakarta?format=j1
        </div>

        {status === 'loading' && (
          <div className="space-y-2 text-terminal-dim">
            <div className="animate-pulse">connecting to open-meteo…</div>
            <div className="h-8 w-24 rounded bg-terminal-alt animate-pulse" />
          </div>
        )}

        {status === 'error' && (
          <div className="space-y-2">
            <div className="text-terminal-faint">
              <span className="text-terminal-blue">err</span> → {error ?? 'unavailable'}
            </div>
            <button
              type="button"
              onClick={() => load()}
              className="border border-term-mid rounded px-3 py-1.5 text-terminal-soft hover:border-terminal-blue hover:text-white transition-colors text-[12px]"
            >
              retry
            </button>
          </div>
        )}

        {status === 'ready' && weather && (
          <div className="space-y-3">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-2xl sm:text-3xl leading-none" aria-hidden>
                {weather.icon}
              </span>
              <div>
                <div className="text-[28px] sm:text-[32px] font-bold text-terminal-blue leading-none tracking-tight">
                  {formatTemp(weather.temperature)}
                </div>
                <div className="text-terminal-soft capitalize mt-1">{weather.description}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 sm:gap-2.5 text-[11px] sm:text-[12px]">
              <div className="border border-term rounded-md px-3 py-2.5 min-w-0">
                <div className="text-terminal-faint">feels like</div>
                <div className="text-terminal-text mt-0.5">{formatTemp(weather.feelsLike)}</div>
              </div>
              <div className="border border-term rounded-md px-3 py-2.5 min-w-0">
                <div className="text-terminal-faint">humidity</div>
                <div className="text-terminal-text mt-0.5">{weather.humidity}%</div>
              </div>
              <div className="border border-term rounded-md px-3 py-2.5 min-w-0">
                <div className="text-terminal-faint">wind</div>
                <div className="text-terminal-text mt-0.5">{formatWind(weather.windSpeed)}</div>
              </div>
              <div className="border border-term rounded-md px-3 py-2.5 min-w-0">
                <div className="text-terminal-faint">updated</div>
                <div className="text-terminal-text mt-0.5">
                  {formatUpdatedAt(weather.updatedAt, now)}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between gap-2 text-[10.5px] sm:text-[11px] text-terminal-faint pt-1">
              <span>
                location → <span className="text-terminal-soft">{weather.location}</span>
              </span>
              <button
                type="button"
                onClick={() => load()}
                className="text-terminal-blue hover:text-terminal-blue-bright transition-colors"
                aria-label="Refresh weather"
              >
                refresh ↻
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
