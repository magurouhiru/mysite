import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-base',
  standalone: true,
  imports: [RouterOutlet, NgOptimizedImage, RouterLink],
  templateUrl: './base.component.html',
  styleUrl: './base.component.scss',
})
export class BaseComponent {}
