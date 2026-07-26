import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { openMeteoUrl, toWeatherData, type OpenMeteoResponse, type WeatherData } from '../lib/weather';

@Injectable({ providedIn: 'root' })
export class WeatherService {
  constructor(private http: HttpClient) {}

  getJakartaWeather(): Observable<WeatherData> {
    return this.http
      .get<OpenMeteoResponse>(openMeteoUrl())
      .pipe(map(json => toWeatherData(json)));
  }
}
