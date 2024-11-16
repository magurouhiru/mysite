import { Component } from '@angular/core';

import { RangeSliderEqualizerComponent } from './range-slider-equalizer/range-slider-equalizer.component';

@Component({
  selector: 'app-css-range-slider-examples',
  standalone: true,
  imports: [RangeSliderEqualizerComponent],
  templateUrl: './css-range-slider-examples.component.html',
  styleUrl: './css-range-slider-examples.component.scss',
})
export class CssRangeSliderExamplesComponent {}
