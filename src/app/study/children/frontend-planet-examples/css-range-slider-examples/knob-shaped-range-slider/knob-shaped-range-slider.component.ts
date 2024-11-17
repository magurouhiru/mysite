import { DOCUMENT } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-knob-shaped-range-slider',
  standalone: true,
  imports: [],
  templateUrl: './knob-shaped-range-slider.component.html',
  styleUrl: './knob-shaped-range-slider.component.scss',
})
export class KnobShapedRangeSliderComponent implements OnInit {
  document = inject(DOCUMENT);
  ngOnInit() {
    const input =
      this.document
        .getElementById('ksrs-html')
        ?.querySelector("input[type='range']") ?? null;
    for (const event of ['input', 'change']) {
      if (input) {
        input.addEventListener(event, (e) => update(e.target));
      }
    }
    // eslint-disable-next-line
    function update(input: any) {
      for (const data of ['min', 'max', 'value'])
        if (input[data]) input.style.setProperty(`--${data}`, input[data]);
    }

    update(input);
  }
}
