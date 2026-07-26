import { Component } from '@angular/core';
import { TerminalChromeComponent } from '../terminal-chrome/terminal-chrome.component';

interface SkillGroup {
  file: string;
  title: string;
  description: string;
  tags: string[];
}

const skillGroups: SkillGroup[] = [
  {
    file: 'backend.go',
    title: 'Backend Engineering',
    description:
      'Designing high-throughput APIs and microservices. Built systems processing 10M+ transactions monthly.',
    tags: ['Go', 'PHP', 'RabbitMQ', 'REST'],
  },
  {
    file: 'storage.sql',
    title: 'Data & Storage',
    description:
      'Advanced query optimization and caching strategies. Reduced DB load by 70% through smart indexing.',
    tags: ['MySQL', 'NoSQL', 'Redis', 'Query Tuning'],
  },
  {
    file: 'lead.yaml',
    title: 'Tech Leadership',
    description:
      'Leading cross-functional teams of 15+ engineers. Hiring, mentoring, and setting technical direction.',
    tags: ['Architecture', 'CI/CD', 'Vue.js', 'Agile'],
  },
];

@Component({
  selector: 'app-skills-section',
  standalone: true,
  imports: [TerminalChromeComponent],
  templateUrl: './skills-section.component.html',
})
export class SkillsSectionComponent {
  skillGroups = skillGroups;
}
