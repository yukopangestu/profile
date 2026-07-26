import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TerminalChromeComponent } from '../terminal-chrome/terminal-chrome.component';
import { WeatherWidgetComponent } from '../weather-widget/weather-widget.component';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [RouterLink, NgOptimizedImage, TerminalChromeComponent, WeatherWidgetComponent],
  templateUrl: './hero-section.component.html',
})
export class HeroSectionComponent {}
