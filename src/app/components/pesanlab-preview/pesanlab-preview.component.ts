import { Component } from '@angular/core';

/**
 * Static HTML/CSS recreation of the Pesanlab.com hero viewport (from the
 * project screenshot) — not an embed of the live site, just its navbar +
 * hero chrome rebuilt as real markup so it can live inside the portfolio
 * dialog without pulling in a third-party iframe.
 */
@Component({
  selector: 'app-pesanlab-preview',
  standalone: true,
  templateUrl: './pesanlab-preview.component.html',
  styleUrl: './pesanlab-preview.component.css',
})
export class PesanlabPreviewComponent {}
