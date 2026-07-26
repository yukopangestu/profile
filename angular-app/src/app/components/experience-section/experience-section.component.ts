import { Component } from '@angular/core';
import { experiences } from '../../data/experience.data';

const overallStats = [
  { value: '8+', label: 'years of experience' },
  { value: '20+', label: 'projects delivered' },
  { value: '10M+', label: 'monthly transactions' },
];

@Component({
  selector: 'app-experience-section',
  standalone: true,
  templateUrl: './experience-section.component.html',
})
export class ExperienceSectionComponent {
  recentRoles = experiences.slice(0, 4);
  earlierRoles = experiences.slice(4);
  overallStats = overallStats;
}
