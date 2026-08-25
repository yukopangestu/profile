import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { SteamGameCard, SteamLibraryResponse, SteamService, SteamTopGame } from '../../services/steam.service';
import { TerminalChromeComponent } from '../../components/terminal-chrome/terminal-chrome.component';

const BAR_WIDTH = 24;

function asciiBar(value: number, max: number): string {
  const filled = max > 0 ? Math.round((value / max) * BAR_WIDTH) : 0;
  return '█'.repeat(Math.max(filled, value > 0 ? 1 : 0)) + '░'.repeat(BAR_WIDTH - Math.max(filled, value > 0 ? 1 : 0));
}

function relativeDaysAgo(unixSeconds: number): string {
  if (!unixSeconds) return 'belum pernah dimainkan';
  const diffMs = Date.now() - unixSeconds * 1000;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays <= 0) return 'hari ini';
  if (diffDays === 1) return 'kemarin';
  if (diffDays < 7) return `${diffDays} hari lalu`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} minggu lalu`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} bulan lalu`;
  return `${Math.floor(diffDays / 365)} tahun lalu`;
}

@Component({
  selector: 'app-hobby',
  standalone: true,
  imports: [TerminalChromeComponent],
  templateUrl: './hobby.component.html',
})
export class HobbyComponent implements OnInit {
  private steamService = inject(SteamService);

  loading = signal(true);
  library = signal<SteamLibraryResponse | null>(null);

  stats = computed(() => this.library()?.stats ?? null);
  nowPlaying = computed(() => this.library()?.nowPlaying ?? null);
  recent = computed(() => this.library()?.recent ?? []);
  topByHours = computed(() => this.library()?.topByHours ?? []);

  recentMaxHours = computed(() => Math.max(1, ...this.recent().map(g => g.hoursTotal)));
  topMaxHours = computed(() => Math.max(1, ...this.topByHours().map(g => g.hoursTotal)));

  showEmptyState = computed(() => !this.loading() && this.library() === null);

  ngOnInit(): void {
    this.steamService.getLibrary().subscribe(res => {
      this.library.set(res);
      this.loading.set(false);
    });
  }

  relativeTime(unixSeconds: number): string {
    return relativeDaysAgo(unixSeconds);
  }

  barFor(game: SteamGameCard): string {
    return asciiBar(game.hoursTotal, this.recentMaxHours());
  }

  topBarFor(game: SteamTopGame): string {
    return asciiBar(game.hoursTotal, this.topMaxHours());
  }

  onCoverError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.style.display = 'none';
    img.nextElementSibling?.classList.remove('hidden');
  }
}
