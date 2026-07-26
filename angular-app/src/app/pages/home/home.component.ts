import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { HeroSectionComponent } from '../../components/hero-section/hero-section.component';
import { SkillsSectionComponent } from '../../components/skills-section/skills-section.component';
import { AboutSectionComponent } from '../../components/about-section/about-section.component';
import { ExperienceSectionComponent } from '../../components/experience-section/experience-section.component';
import { ContactSectionComponent } from '../../components/contact-section/contact-section.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    HeroSectionComponent,
    SkillsSectionComponent,
    AboutSectionComponent,
    ExperienceSectionComponent,
    ContactSectionComponent,
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent {}
