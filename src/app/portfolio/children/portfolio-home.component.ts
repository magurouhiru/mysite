import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-portfolio-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './portfolio-home.component.html',
  styleUrl: './portfolio-home.component.scss',
})
export class PortfolioHomeComponent {
  readonly cards: {
    label: string;
    url: string;
    link: string;
    detail: string;
    specification: string;
  }[] = [
    {
      label:
        'Codejump:【HTML/CSS コーディング練習】中級編：ブログサイト／2カラム',
      url: 'https://code-jump.com/blog-menu/',
      link: '/portfolio/code-jump/blog-menu/',
      detail: '',
      specification: '',
    },
  ];
}
