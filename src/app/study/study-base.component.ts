import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-study-base',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './study-base.component.html',
  styleUrl: './study-base.component.scss',
})
export class StudyBaseComponent {}
