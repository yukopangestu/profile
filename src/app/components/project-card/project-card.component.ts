import { Component, EventEmitter, Input, Output } from '@angular/core';
import type { PortfolioLang, PortfolioProject } from '../../data/portfolio.data';

@Component({
  selector: 'app-project-card',
  standalone: true,
  templateUrl: './project-card.component.html',
})
export class ProjectCardComponent {
  @Input({ required: true }) project!: PortfolioProject;
  @Input({ required: true }) lang!: PortfolioLang;
  @Input({ required: true }) readMore!: string;
  @Input() delayMs = 0;
  @Output() open = new EventEmitter<void>();
}
