import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, inject } from '@angular/core';

@Component({
  selector: 'app-dynamic-grid-background-through-range-slider',
  standalone: true,
  imports: [],
  templateUrl: './dynamic-grid-background-through-range-slider.component.html',
  styleUrl: './dynamic-grid-background-through-range-slider.component.scss',
})
export class DynamicGridBackgroundThroughRangeSliderComponent
  implements AfterViewInit
{
  document = inject(DOCUMENT);
  ngAfterViewInit() {
    this.document.getElementById('range')?.addEventListener('change', (e) => {
      const target = e.target as Target;
      this.document
        .getElementById('dgbtrs-root')
        ?.style.setProperty('--grid-size', target.value + 'rem');
    });
  }
}

interface Target extends EventTarget {
  value: number;
}
