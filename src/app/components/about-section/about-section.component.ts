import { Component } from '@angular/core';
import { TerminalChromeComponent } from '../terminal-chrome/terminal-chrome.component';

const metrics = [
  { value: '$2M+', label: 'daily transactions' },
  { value: '10M+', label: 'monthly transactions' },
  { value: '40%', label: 'faster deployments' },
  { value: '35%', label: 'fewer bugs' },
];

const stats = [
  { value: '20+', label: 'projects delivered' },
  { value: '15+', label: 'engineers led' },
  { value: '99.9%', label: 'uptime goal' },
];

@Component({
  selector: 'app-about-section',
  standalone: true,
  imports: [TerminalChromeComponent],
  templateUrl: './about-section.component.html',
})
export class AboutSectionComponent {
  metrics = metrics;
  stats = stats;
}
