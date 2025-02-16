import { NgTemplateOutlet } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { Analytics, logEvent } from '@angular/fire/analytics';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-a',
  standalone: true,
  imports: [RouterLink, NgTemplateOutlet],
  templateUrl: './a.component.html',
  styleUrl: './a.component.scss',
})
export class AComponent {
  label = input.required<string>();
  link = input<string>();
  href = input<string>();
  class = input<string>();

  analytics = inject(Analytics);
  router = inject(Router);

  eventName = this.router.url;
  onClick() {
    console.log(this.router.url);
    logEvent(this.analytics, this.eventName, { event_label: this.label() });
  }
}
