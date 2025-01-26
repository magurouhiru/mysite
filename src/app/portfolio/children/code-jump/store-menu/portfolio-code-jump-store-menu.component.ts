import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-portfolio-code-jump-store-menu',
  standalone: true,
  imports: [RouterLink, NgOptimizedImage],
  templateUrl: './portfolio-code-jump-store-menu.component.html',
  styleUrl: './portfolio-code-jump-store-menu.component.scss',
})
export class PortfolioCodeJumpStoreMenuComponent {
  readonly menuItems: {
    coffee: MenuItem[];
    food: MenuItem[];
    other: MenuItem[];
  } = {
    coffee: [
      { id: 0, name: 'XXXXXXXX', price: 500 },
      { id: 1, name: 'XXXXXXXX', price: 500 },
      { id: 2, name: 'XXXXXXXX', price: 500 },
      { id: 3, name: 'XXXXXXXX', price: 500 },
      { id: 4, name: 'XXXXXXXX', price: 500 },
      { id: 5, name: 'XXXXXXXX', price: 500 },
      { id: 6, name: 'XXXXXXXX', price: 500 },
      { id: 7, name: 'XXXXXXXX', price: 500 },
      { id: 8, name: 'XXXXXXXX', price: 500 },
      { id: 9, name: 'XXXXXXXX', price: 500 },
    ],
    food: [
      { id: 0, name: 'XXXXXXXX', price: 500 },
      { id: 1, name: 'XXXXXXXX', price: 500 },
      { id: 2, name: 'XXXXXXXX', price: 500 },
      { id: 3, name: 'XXXXXXXX', price: 500 },
    ],
    other: [
      { id: 0, name: 'XXXXXXXX', price: 500 },
      { id: 1, name: 'XXXXXXXX', price: 500 },
      { id: 2, name: 'XXXXXXXX', price: 500 },
      { id: 3, name: 'XXXXXXXX', price: 500 },
    ],
  };

  readonly aboutItems: { id: number; text: string }[] = [
    {
      id: 0,
      text: 'テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト',
    },
    {
      id: 1,
      text: 'テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト',
    },
    {
      id: 2,
      text: 'テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト',
    },
    {
      id: 3,
      text: 'テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト',
    },
  ];
}
interface MenuItem {
  id: number;
  name: string;
  price: number;
}
