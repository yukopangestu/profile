import { isPlatformBrowser } from '@angular/common';
import { Component, HostListener, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';

@Component({
  selector: 'app-back-to-top',
  standalone: true,
  templateUrl: './back-to-top.component.html',
})
export class BackToTopComponent implements OnInit {
  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  visible = signal(false);

  ngOnInit(): void {
    if (this.isBrowser) this.updateVisibility();
  }

  @HostListener('window:scroll')
  @HostListener('window:resize')
  updateVisibility(): void {
    if (!this.isBrowser) return;
    const pastThreshold = window.scrollY > 400;
    const nearBottom =
      window.scrollY + window.innerHeight > document.documentElement.scrollHeight - 200;
    this.visible.set(pastThreshold && !nearBottom);
  }

  scrollToTop(): void {
    if (!this.isBrowser) return;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
