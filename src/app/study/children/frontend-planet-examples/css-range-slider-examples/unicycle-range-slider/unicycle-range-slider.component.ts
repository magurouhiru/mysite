import { DOCUMENT } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-unicycle-range-slider',
  standalone: true,
  imports: [],
  templateUrl: './unicycle-range-slider.component.html',
  styleUrl: './unicycle-range-slider.component.scss',
})
export class UnicycleRangeSliderComponent implements OnInit {
  document = inject(DOCUMENT);
  unicycle!: UnicycleRangeSlider;
  ngOnInit() {
    const el = this.document.getElementById('urs-body');
    if (el) {
      this.unicycle = new UnicycleRangeSlider('#unicycle1', el);
    }
  }
}

class UnicycleRangeSlider {
  private wheel: Element | null;
  private marker: Element | null;
  private flag: Element | null;
  // eslint-disable-next-line
  constructor(el: any, document: HTMLElement) {
    this.wheel = document.querySelector(`${el} input[type=range]`);
    this.marker = document.querySelector(`${el} .unicycle__marker`);
    this.flag = document.querySelector(`${el} .unicycle__flag`);

    this.updateBodyPos();
    this.wheel?.addEventListener('input', () => {
      this.updateBodyPos();
    });
  }
  updateBodyPos() {
    if (isWheel(this.wheel) && isMarker(this.marker) && this.flag !== null) {
      const max = this.wheel.max,
        min = this.wheel.min,
        realValue = this.wheel.value,
        ticks = max - min,
        relValue = realValue - min,
        percent = relValue / ticks,
        revs = 1,
        left = percent * 100,
        emAdjust = percent * 1.5,
        pedalRot = percent * (360 * revs),
        period = (1 / (ticks / revs / 2)) * relValue * Math.PI,
        rightLegRot = -22.5 * Math.sin(period + 1.85 * Math.PI) - 22.5,
        rightLowerLegRot = 45 * Math.sin(period + 0 * Math.PI) + 45,
        leftLegRot = -22.5 * Math.sin(period + 2.85 * Math.PI) - 22.5,
        leftLowerLegRot = 45 * Math.sin(period + 1 * Math.PI) + 45,
        cssVars = {
          '--pedalRot': `${pedalRot}deg`,
          '--rightLegRot': `${rightLegRot}deg`,
          '--rightLowerLegRot': `${rightLowerLegRot}deg`,
          '--leftLegRot': `${leftLegRot}deg`,
          '--leftLowerLegRot': `${leftLowerLegRot}deg`,
        } as Record<string, string>;
      // position stick figure and unicycle body
      this.marker.style.left = `calc(${left}% - ${emAdjust}em)`;
      // update the variables in CSS
      for (const v in cssVars) this.marker.style.setProperty(v, cssVars[v]);
      // number in the flag
      this.flag.innerHTML = String(realValue);
    }
  }
}

interface Wheel extends Element {
  max: number;
  min: number;
  value: number;
}
function isWheel(wheel: Element | null): wheel is Wheel {
  return true;
}

interface Marker extends Element {
  style: CSSStyleDeclaration;
}
function isMarker(marker: Element | null): marker is Marker {
  return true;
}
