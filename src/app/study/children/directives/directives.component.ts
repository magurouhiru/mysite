import { Component } from '@angular/core';

import { HighlightDirective } from './highlight.directive';

@Component({
  selector: 'app-directives',
  standalone: true,
  imports: [HighlightDirective],
  templateUrl: './directives.component.html',
  styleUrl: './directives.component.scss',
})
export class DirectivesComponent {
  color = '';
}
