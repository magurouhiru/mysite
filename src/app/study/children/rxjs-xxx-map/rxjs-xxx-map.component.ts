import { Component } from '@angular/core';
import {
  concatMap,
  delay,
  exhaustMap,
  interval,
  mergeMap,
  of,
  switchMap,
  take,
  tap,
} from 'rxjs';

import { ButtonDirective } from 'primeng/button';

import { format } from 'date-fns';

@Component({
  selector: 'app-rxjs-xxx-map',
  standalone: true,
  imports: [ButtonDirective],
  templateUrl: './rxjs-xxx-map.component.html',
  styleUrl: './rxjs-xxx-map.component.scss',
})
export class RxjsXxxMapComponent {
  // eslint-disable-next-line
  executeXxxMap(xxxMap: any, reverse: boolean) {
    console.log(xxxMap.toString());
    const cnt = 6;
    const now = Date.now();
    const getTime = () => {
      return format(
        // 関数実行時刻より経過した分:秒.ミリ秒を取得
        Date.now() - now,
        'mm:ss.S',
      );
    };
    const doSomething = (n: number) => {
      return of(n).pipe(
        // 何か重い処理の代わり
        // ログ出力
        tap((n) =>
          console.log(`time: ${getTime()}, input: ${n}, doSomething start`),
        ),
        // n === 0 の場合は待機なし
        // それ以外の場合、
        // reverse === true の時、(cnt - n) * 1.5秒待機
        // reverse === false の時、n * 1.5秒待機
        delay(n === 0 ? 0 : reverse ? (cnt - n) * 1500 : n * 1500),
        // ログ出力
        tap((n) =>
          console.log(`time: ${getTime()}, output: ${n}, doSomething end`),
        ),
      );
    };
    interval(1000)
      .pipe(
        // 1秒毎に値を流す
        // 最初のcnt個だけ値を取得
        take(cnt),
        // ログ出力
        tap((x) => console.log(`time: ${getTime()}, input: ${x}`)),
        // xxxMap処理
        xxxMap((x: number) => {
          console.log(`time: ${getTime()}, input: ${x}, xxxMap start`);
          return doSomething(x);
        }),
        // ログ出力
        tap((x) => console.log(`time: ${getTime()}, output: ${x}`)),
      )
      .subscribe({
        next: (x) => console.log(`time: ${getTime()}, next: ${x}`),
        error: (e) => console.error(e),
        complete: () => console.log('complete'),
      });
  }

  protected readonly mergeMap = mergeMap;
  protected readonly switchMap = switchMap;
  protected readonly exhaustMap = exhaustMap;
  protected readonly concatMap = concatMap;
}
