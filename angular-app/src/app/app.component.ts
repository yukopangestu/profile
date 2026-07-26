import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SkillsSectionComponent } from './components/skills-section/skills-section.component';
import { AboutSectionComponent } from './components/about-section/about-section.component';
import { ExperienceSectionComponent } from './components/experience-section/experience-section.component';
import { ContactSectionComponent } from './components/contact-section/contact-section.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    SkillsSectionComponent,
    AboutSectionComponent,
    ExperienceSectionComponent,
    ContactSectionComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'angular-app';
}
