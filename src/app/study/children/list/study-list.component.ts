import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-study-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './study-list.component.html',
  styleUrl: './study-list.component.scss',
})
export class StudyListComponent {}
