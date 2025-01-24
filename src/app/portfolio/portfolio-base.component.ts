import { Component } from '@angular/core';
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-portfolio-base',
  standalone: true,
  imports: [
    RouterOutlet
  ],
  templateUrl: './portfolio-base.component.html',
  styleUrl: './portfolio-base.component.scss',
})
export class PortfolioBaseComponent {}
