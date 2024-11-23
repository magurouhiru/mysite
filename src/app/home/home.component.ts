import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { CardModule } from 'primeng/card';

import { HomeButtonComponent } from '../shared/home-button/home-button.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CardModule, HomeButtonComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
