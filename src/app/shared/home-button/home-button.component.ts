import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ContentName, Contents } from '../contents';

@Component({
  selector: 'app-home-button',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home-button.component.html',
  styleUrl: './home-button.component.scss',
})
export class HomeButtonComponent {
  contentLabel = input.required<ContentName>();
  flexTheme = input<boolean>(true);

  content = computed(() => Contents[this.contentLabel()]);
  styleButton = computed(() => {
    return `background-color: ${this.content().theme.colors.primary_color};
    color: ${this.content().theme.colors.primary_color_text};`;
  });
}
