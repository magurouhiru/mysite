import { Component } from '@angular/core';

import { CssSliderIndicatorComponent } from './css-slider-indicator/css-slider-indicator.component';
import { CustomizedRangeSliderComponent } from './customized-range-slider/customized-range-slider.component';
import { DynamicGridBackgroundThroughRangeSliderComponent } from './dynamic-grid-background-through-range-slider/dynamic-grid-background-through-range-slider.component';
import { KnobShapedRangeSliderComponent } from './knob-shaped-range-slider/knob-shaped-range-slider.component';
import { NeumorphicPureCssRangeSliderDesignComponent } from './neumorphic-pure-css-range-slider-design/neumorphic-pure-css-range-slider-design.component';
import { RangeSliderEqualizerComponent } from './range-slider-equalizer/range-slider-equalizer.component';
import { UnicycleRangeSliderComponent } from './unicycle-range-slider/unicycle-range-slider.component';

@Component({
  selector: 'app-css-range-slider-examples',
  standalone: true,
  imports: [
    RangeSliderEqualizerComponent,
    NeumorphicPureCssRangeSliderDesignComponent,
    CustomizedRangeSliderComponent,
    DynamicGridBackgroundThroughRangeSliderComponent,
    CssSliderIndicatorComponent,
    KnobShapedRangeSliderComponent,
    UnicycleRangeSliderComponent,
  ],
  templateUrl: './css-range-slider-examples.component.html',
  styleUrl: './css-range-slider-examples.component.scss',
})
export class CssRangeSliderExamplesComponent {}
