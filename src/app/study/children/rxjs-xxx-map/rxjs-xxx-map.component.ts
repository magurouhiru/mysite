import { Component } from '@angular/core';
import {
  concatMap,
  delay,
  exhaustMap,
  interval,
  map,
  mergeMap,
  of,
  Subject,
  switchMap,
  take,
  tap,
} from 'rxjs';

import { Button, ButtonDirective } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';

import { format } from 'date-fns';

@Component({
  selector: 'app-rxjs-xxx-map',
  standalone: true,
  imports: [ButtonDirective, TabViewModule, TableModule, Button],
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

  // 追記分
  sub1 = new Subject<ObValue>();
  sub1_cnt = 0;
  createSub1() {
    this.sub1 = new Subject<ObValue>();
  }
  nextSub1() {
    this.sub1_cnt++;
    this.sub1.next({ sub1: this.sub1_cnt });
  }
  errorSub1() {
    this.sub1.error('error: sub1');
  }
  completeSub1() {
    this.sub1.complete();
  }
  sub2s: Sub2[] = [];
  sub2_id = 0;
  sub2_cnt = 0;
  createSub2() {
    this.sub2_id++;
    const sub2 = {
      id: this.sub2_id,
      sub: new Subject<ObValue>(),
    } satisfies Sub2;
    this.sub2s.push(sub2);
    return sub2.sub;
  }
  nextSub2(sub2: Sub2) {
    this.sub2_cnt++;
    sub2.sub.next({
      sub2: {
        id: sub2.id,
        cnt: this.sub2_cnt,
      },
    });
  }
  errorSub2(sub2: Sub2) {
    sub2.sub.error(`error: sub2: id: ${sub2.id}`);
  }
  completeSub2(sub2: Sub2) {
    sub2.sub.complete();
    this.sub2s = this.sub2s.filter((s) => s.id !== sub2.id);
  }
  // eslint-disable-next-line
  executeXxxMap2(xxxMap: any) {
    console.log(xxxMap);
    this.sub1
      .pipe(
        tap((v) => console.log(`tap: sub1: id: ${v.sub1}`)),
        xxxMap((v: ObValue) => {
          return this.createSub2().pipe(
            tap((v) =>
              console.log(`tap: sub2: id: ${v.sub2?.id}, cnt: ${v.sub2?.cnt}`),
            ),
            map((vv) => {
              return { ...v, ...vv };
            }),
          );
        }),
      )
      .subscribe({
        // eslint-disable-next-line
        next: (v: any) =>
          console.log(
            `next: sub1: ${v.sub1}, sub2: id: ${v.sub2?.id}, cnt: ${v.sub2?.cnt}`,
          ),
        error: console.error,
        complete: () => console.log('complete'),
      });
  }
}

interface ObValue {
  sub1?: number;
  sub2?: {
    id: number;
    cnt: number;
  };
}

interface Sub2 {
  id: number;
  sub: Subject<ObValue>;
}
