import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-terminal-chrome',
  standalone: true,
  template: `
    <div class="flex gap-1.5 items-center px-3.5 py-2.5 border-b border-term-dim">
      <span class="term-dot"></span>
      <span class="term-dot"></span>
      <span class="term-dot active"></span>
      <span [class]="labelClass">{{ title }}</span>
    </div>
  `,
})
export class TerminalChromeComponent {
  @Input({ required: true }) title!: string;
  @Input() size: 'sm' | 'md' = 'md';

  get labelClass(): string {
    const fontSize = this.size === 'sm' ? 'text-[10.5px]' : 'text-[11px]';
    return `ml-2 font-mono ${fontSize} text-terminal-faint`;
  }
}
