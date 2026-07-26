import { isPlatformBrowser } from '@angular/common';
import { Component, DestroyRef, effect, inject, Input, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TerminalChromeComponent } from '../terminal-chrome/terminal-chrome.component';
import { formatTemp, formatUpdatedAt, formatWind, type WeatherData } from '../../lib/weather';
import { WeatherService } from '../../services/weather.service';

type Status = 'loading' | 'ready' | 'error';

@Component({
  selector: 'app-weather-widget',
  standalone: true,
  imports: [TerminalChromeComponent],
  templateUrl: './weather-widget.component.html',
})
export class WeatherWidgetComponent implements OnInit {
  @Input() variant: 'chip' | 'panel' = 'panel';
  @Input() className = '';

  private weatherService = inject(WeatherService);
  private destroyRef = inject(DestroyRef);
  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  status = signal<Status>('loading');
  weather = signal<WeatherData | null>(null);
  error = signal<string | null>(null);
  now = signal(Date.now());

  formatTemp = formatTemp;
  formatWind = formatWind;

  constructor() {
    effect(onCleanup => {
      if (!this.isBrowser || this.status() !== 'ready') return;
      const id = window.setInterval(() => this.now.set(Date.now()), 60_000);
      onCleanup(() => window.clearInterval(id));
    });
  }

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.status.set(this.status() === 'ready' ? 'ready' : 'loading');
    this.error.set(null);

    this.weatherService
      .getJakartaWeather()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: data => {
          this.weather.set(data);
          this.status.set('ready');
          this.now.set(Date.now());
        },
        error: (err: Error) => {
          this.error.set(err.message || 'offline');
          this.status.set('error');
        },
      });
  }

  updatedAt(iso: string): string {
    return formatUpdatedAt(iso, this.now());
  }
}
