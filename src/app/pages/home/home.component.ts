import { isPlatformBrowser } from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { injectSpeedInsights } from '@vercel/speed-insights';
import { HeroSectionComponent } from '../../components/hero-section/hero-section.component';
import { SkillsSectionComponent } from '../../components/skills-section/skills-section.component';
import { AboutSectionComponent } from '../../components/about-section/about-section.component';
import { ExperienceSectionComponent } from '../../components/experience-section/experience-section.component';
import { ContactSectionComponent } from '../../components/contact-section/contact-section.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroSectionComponent,
    SkillsSectionComponent,
    AboutSectionComponent,
    ExperienceSectionComponent,
    ContactSectionComponent,
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  ngOnInit(): void {
    if (!this.isBrowser) return;
    injectSpeedInsights();
  }
}
