import { DOCUMENT } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-css-slider-indicator',
  standalone: true,
  imports: [],
  templateUrl: './css-slider-indicator.component.html',
  styleUrl: './css-slider-indicator.component.scss',
})
export class CssSliderIndicatorComponent implements OnInit {
  document = inject(DOCUMENT);
  ngOnInit() {
    const slider = this.document.querySelector('.slider'),
      sliderValue = this.document.querySelector('#slider-value');

    function isSlider(slider: Element | null): slider is Slider {
      return slider !== null;
    }
    function isSliderValue(
      sliderValue: Element | null,
    ): sliderValue is SliderValue {
      return sliderValue !== null;
    }

    console.log(slider);
    console.log(sliderValue);
    console.log(isSlider(slider));
    if (isSlider(slider)) {
      slider.oninput = () => {
        showValue();
      };
    }

    function showValue() {
      console.log('called');
      if (isSlider(slider) && isSliderValue(sliderValue)) {
        sliderValue.innerHTML = String(slider.value);
        const sliderPosition = slider.value / slider.max;

        if (slider.value === slider.min) {
          sliderValue.style.left = sliderPosition * 100 + 2 + '%';
        } else if (slider.value === slider.max) {
          sliderValue.style.left = sliderPosition * 100 - 2 + '%';
        } else {
          sliderValue.style.left = sliderPosition * 100 + '%';
        }
      }
    }
  }
}

interface Slider extends Element {
  oninput?: () => void;
  value: number;
  max: number;
  min?: number;
}

interface SliderValue extends Element {
  style: { left?: string };
}
