import { Component } from '@angular/core';

const socials = [
  { href: 'https://github.com/yukopangestu', label: 'GitHub' },
  { href: 'https://www.linkedin.com/in/yukopangestu/', label: 'LinkedIn' },
  { href: 'https://medium.com/@yuko.pangestu', label: 'Medium' },
  { href: 'mailto:yuko.pangestu@gmail.com', label: 'Email' },
];

@Component({
  selector: 'app-contact-section',
  standalone: true,
  templateUrl: './contact-section.component.html',
})
export class ContactSectionComponent {
  socials = socials;
  currentYear = new Date().getFullYear();

  get footerSocials() {
    return this.socials.filter(s => s.label !== 'Email');
  }
}
