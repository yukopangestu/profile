import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';

export interface SteamGameCard {
  appid: number;
  name: string;
  hoursTotal: number;
  lastPlayedAt: number;
  headerUrl: string;
  status: string;
  tags: string[];
}

export interface SteamNowPlaying extends SteamGameCard {
  hours2Weeks: number;
  hasTwoWeekActivity: boolean;
  achievementPercent: number | null;
  note: string | null;
}

export interface SteamTopGame {
  appid: number;
  name: string;
  hoursTotal: number;
}

export interface SteamStats {
  totalGames: number;
  totalHours: number;
  yearsEquivalent: number;
  neverPlayedCount: number;
}

export interface SteamLibraryResponse {
  generatedAt: number;
  stats: SteamStats;
  nowPlaying: SteamNowPlaying | null;
  recent: SteamGameCard[];
  topByHours: SteamTopGame[];
}

@Injectable({ providedIn: 'root' })
export class SteamService {
  constructor(private http: HttpClient) {}

  getLibrary(): Observable<SteamLibraryResponse | null> {
    return this.http
      .get<SteamLibraryResponse>('/api/steam-games')
      .pipe(catchError(() => of(null)));
  }
}
