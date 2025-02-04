import { NgOptimizedImage } from '@angular/common';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Firestore } from '@angular/fire/firestore';
import { getDownloadURL, ref, Storage } from '@angular/fire/storage';
import { RouterLink } from '@angular/router';
import { forkJoin, map } from 'rxjs';

@Component({
  selector: 'app-portfolio-home',
  standalone: true,
  imports: [RouterLink, NgOptimizedImage],
  templateUrl: './portfolio-home.component.html',
  styleUrl: './portfolio-home.component.scss',
})
export class PortfolioHomeComponent {
  readonly firestore = inject(Firestore);
  readonly storage = inject(Storage);

  readonly cards = toSignal(
    forkJoin({
      code_jump__store_menu: getDownloadURL(
        ref(this.storage, 'portfolio/code-jump/store-menu/thumbnail.png'),
      ),
      code_jump__blog_menu: getDownloadURL(
        ref(this.storage, 'portfolio/code-jump/blog-menu/thumbnail.png'),
      ),
    }).pipe(
      map(
        (
          res,
        ): {
          label: string;
          thumbnail: string;
          url: string;
          link: string;
          specification: string;
          plan: string;
          reflection: string;
        }[] => {
          return [
            {
              label:
                'Codejump:【HTML/CSS コーディング練習】中級編：ストアサイト（カフェ）／パララックス',
              thumbnail: res.code_jump__store_menu,
              url: 'https://code-jump.com/store-menu/',
              link: '/portfolio/code-jump/store-menu/',
              specification: `<dl>
        <dt>フォント</dt>
<dd>下記の順で指定します。<br>Helvetica Neue、Arial、Hiragino Sans、Hiragino Kaku Gothic ProN、Meiryo、sans-serif</dd>
<dt>コンテンツ幅</dt>
<dd>
  コンテンツの最大幅は1000pxで横のパディングは16pxです。<br>
  メインビジュアルだけ全幅にします。
</dd>
<dt>メインビジュアル</dt>
<dd>
  全画面表示です。<br>高さはブラウザの高さにあわせて可変です。<br>
  右上にグローバルナビゲーションと中央にロゴを配置します。<br>
  メニューとロゴには少し影ができるようにシャドウをかけています。
</dd>
<dt>背景画像</dt>
<dd>MENU、ABOUT、LOCATIONの背景画像は、PC時のみ固定で表示されるように実装します。</dd>
<dt>ABOUT</dt>
<dd>ボタンはホバー時に枠線で囲みます。CSSだけで表現していますが、少し難しいので分からなければデモサイトを参考にしてみてください。<br>ボタンのホバーについては、沢山の種類があるのでこの機会に色々調べて試してみてください。</dd>
<dt>LOCATION</dt>
<dd>
  Googleの地図を埋め込んでいます。<br>
  埋め込んだ後に、グレー表示になるようCSSを設定します。
</dd><dd>      </dd></dl>`,
              plan: `
レイアウトを考える。
→単純にブロックを連ねる。レスポンシブが必要なMENUとABOUTはflex かcolumns を使用する。
見出しtagは次の通り。
→h1:coffee, h2:menu,about,location, h3:coffee,food,other,coffee,our store
メニューを押したら対象の箇所にスクロールする方法を調べる。
 通常なら#を使えばよい認識だが、ハッシュ戦略を使用していてできない懸念がある。
 ブラウザは#が複数あると、1つ目以外は無視するらしい。ただ{ anchorScrolling: 'enabled' }を設定すればいけるとか？ある程度ページができたら試す。
 →[routerLink]="[]" fragment="menu" とやればよい。空文字だとだめ。必ず空リストを設定しなきゃ動かない。
画像とフォントの遅延ロードを実施する。
 画像はngSrcを使えばよさそうな気がする。
 フォントはAngular としては対応していなさそう。
  ただし、documentを直接操作して遅延ロードさせる方法はあるみたい？
  そもそも高いフォントが指定に含まれている。
  一旦無料のやつ雰囲気が近いやつで代替する。
  →前回と同じNoto Sansを使う。
繰り返し要素は@forで書く。
→menuは@forで書く。
`,
              reflection: `
ある程度は前回の反省を生かせた。
あと、アンカースクロールを最初に対応したおかげで、開発がやりやすかった。
これからも、縦長サイトに限らず、最初にアンカースクロールの対応を行いたい。
ただし、アンカースクロールがなめらかでなかった。
また、レイアウトの想定が甘い箇所がありあとから要素を追加することがちらほら。
加えて、配置を決める要素と見せ方を決める要素がごっちゃになった。
次回は以下に気を付けて取り組む。
アンカースクロールをなめらかにする方法を調べて対応する。
それぞれの要素の役割を意識してレイアウトを組む。
`,
            },
            {
              label:
                'Codejump:【HTML/CSS コーディング練習】中級編：ブログサイト／2カラム',
              thumbnail: res.code_jump__blog_menu,
              url: 'https://code-jump.com/blog-menu/',
              link: '/portfolio/code-jump/blog-menu/',
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
              plan: `なし`,
              reflection: `
デザインカンプをよく見て、レイアウトと見出しtagを決めてから作業する。
画像とフォントは遅延ロードするやり方を調べてから作業する。
繰り返し要素は@forを使用する。
`,
            },
          ];
        },
      ),
    ),
    { initialValue: [] },
  );
}
