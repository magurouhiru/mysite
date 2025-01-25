import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-portfolio-home',
  standalone: true,
  imports: [RouterLink, NgOptimizedImage],
  templateUrl: './portfolio-home.component.html',
  styleUrl: './portfolio-home.component.scss',
})
export class PortfolioHomeComponent {
  readonly cards: {
    label: string;
    thumbnail: string;
    url: string;
    link: string;
    detail: string;
    specification: string;
  }[] = [
    {
      label:
        'Codejump:【HTML/CSS コーディング練習】中級編：ブログサイト／2カラム',
      thumbnail: '/portfolio/code-jump/blog-menu/thumbnail.png',
      url: 'https://code-jump.com/blog-menu/',
      link: '/portfolio/code-jump/blog-menu/',
      detail: '',
      specification:
        '<dl>\n' +
        '        <dt>フォント</dt>\n' +
        '<dd>Google Fonts の「Noto Sans」と「Noto Sans JP」を使用します。</dd>\n' +
        '<dt>コンテンツ幅</dt>\n' +
        '<dd>\n' +
        '  コンテンツの最大幅は1200pxで横のパディングは16pxです。<br>\n' +
        '  グローバルナビゲーションとフッター背景だけ全幅にします。\n' +
        '</dd>\n' +
        '<dt>ヘッダー</dt>\n' +
        '<dd>\n' +
        '  PC、スマホ時ともに固定します。<br>\n' +
        '  ロゴの下に全幅のグローバルナビゲーションを配置します。<br>\n' +
        '  グローバルナビゲーションのメニューは1200pxの中におさめます。\n' +
        '</dd>\n' +
        '<dt>ピックアップエリア</dt>\n' +
        '<dd>ピックアップ記事3つを横並びに配置します。<br>リンクはホバー時に下線が消えます。</dd>\n' +
        '<dt>メインエリア、サイドバー</dt>\n' +
        '<dd>\n' +
        '  メインエリアとサイドバーを横並びに配置します。<br>\n' +
        '  それぞれのコンテンツの横幅は、レスポンシブ時に可変になるところがポイントです。<br>\n' +
        '  メインエリア、サイドバーともに記事の抜粋が多いので、articleタグを使う練習をしてみましょう。\n' +
        '</dd>\n' +
        '<dt>フッター</dt>\n' +
        '<dd>\n' +
        '  About、Menu、Twitterの3つのブロックを横並びに配置します。<br>\n' +
        '  Twitterエリアには、Twitterの埋め込みを行います。\n' +
        '</dd>      </dl>',
    },
  ];
}
