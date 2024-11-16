import { Component } from '@angular/core';

import { CustomizedRangeSliderComponent } from './customized-range-slider/customized-range-slider.component';
import { DynamicGridBackgroundThroughRangeSliderComponent } from './dynamic-grid-background-through-range-slider/dynamic-grid-background-through-range-slider.component';
import { NeumorphicPureCssRangeSliderDesignComponent } from './neumorphic-pure-css-range-slider-design/neumorphic-pure-css-range-slider-design.component';
import { RangeSliderEqualizerComponent } from './range-slider-equalizer/range-slider-equalizer.component';

@Component({
  selector: 'app-css-range-slider-examples',
  standalone: true,
  imports: [
    RangeSliderEqualizerComponent,
    NeumorphicPureCssRangeSliderDesignComponent,
    CustomizedRangeSliderComponent,
    DynamicGridBackgroundThroughRangeSliderComponent,
  ],
  templateUrl: './css-range-slider-examples.component.html',
  styleUrl: './css-range-slider-examples.component.scss',
})
export class CssRangeSliderExamplesComponent {}
