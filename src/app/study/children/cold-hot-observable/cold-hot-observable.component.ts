import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  interval,
  map,
  Observable,
  share,
  shareReplay,
  Subscription,
  take,
  tap,
} from 'rxjs';

import { Button, ButtonDirective } from 'primeng/button';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-cold-hot-observable',
  standalone: true,
  imports: [AsyncPipe, ButtonDirective, TableModule, Button],
  templateUrl: './cold-hot-observable.component.html',
  styleUrl: './cold-hot-observable.component.scss',
})
export class ColdHotObservableComponent {
  // 準備
  ObValue = `interface ObValue {
    id_stream?: string;
    type: string;
    cnt: number;
    cnt_stream?: number;
  }`;
  ObInfo = `interface ObInfo {
    id_stream: string;
    cnt_stream?: number;
    observable: Observable<ObValue>;
  }`;

  cnt_stream = 0;
  getIdStream() {
    this.cnt_stream++;
    return String(this.cnt_stream).padStart(2, '0');
  }
  cnt_subscription = 0;
  getIdSubscription() {
    this.cnt_subscription++;
    return String(this.cnt_subscription).padStart(3, '0');
  }
  addInfo(observable: Observable<number>, type: string) {
    const id_stream = this.getIdStream();
    this.subscriptionMap.set(id_stream, new Map());
    return {
      id_stream,
      observable: observable.pipe(
        map((cnt) => {
          return { id_stream, cnt, type } satisfies ObValue;
        }),
        tap((v) => console.log(`log: ${this.toPrint(v)}`)),
      ),
    } satisfies ObInfo;
  }
  toPrint(v: ObValue, id_subscription?: string) {
    return (
      (v.id_stream ? `id_stream: ${v.id_stream}, ` : '') +
      (id_subscription ? `id_subscription: ${id_subscription}, ` : '') +
      (v.cnt_stream !== undefined ? `cnt_stream: ${v.cnt_stream}, ` : '') +
      `cnt: ${v.cnt}, type: ${v.type}`
    );
  }
  subscriptionMap = new Map<string, Map<string, Subscription | undefined>>();
  doSubscribe(obInfo: ObInfo) {
    const id_subscription = this.getIdSubscription();
    const subscription = obInfo.observable?.subscribe({
      next: (v) => console.log(`next: ${this.toPrint(v, id_subscription)}`),
      error: console.error,
      complete: () =>
        console.log(
          `complete: id_stream: ${obInfo.id_stream}, id_subscription: ${id_subscription}`,
        ),
    });
    this.subscriptionMap
      .get(obInfo.id_stream)
      ?.set(id_subscription, subscription);
  }
  doUnsubscribe(id_stream: string, id_subscription: string) {
    const map = this.subscriptionMap.get(id_stream);
    if (map) {
      map.get(id_subscription)?.unsubscribe();
      if (map.delete(id_subscription)) {
        console.log(
          `unsubscribe: id_stream: ${id_stream}, id_subscription: ${id_subscription}`,
        );
        this.subscriptionMap.set(id_stream, map);
      }
    }
  }
  doUnsubscribeAll() {
    this.subscriptionMap.forEach((v) => v.forEach((vv) => vv?.unsubscribe()));
    this.subscriptionMap.clear();
  }
  tmp: { id_stream: string; id_subscription: string }[] = [];
  toValue() {
    const value: { id_stream: string; id_subscription: string }[] = [];
    this.subscriptionMap.forEach((v, k) => {
      v.forEach((_, kk) => {
        value.push({
          id_stream: k,
          id_subscription: kk,
        });
      });
    });
    const diff = (
      a: { id_stream: string; id_subscription: string }[],
      b: { id_stream: string; id_subscription: string }[],
    ) => {
      let f = false;
      if (a.length === b.length) {
        a.forEach((_, i) => {
          if (a[i].id_stream !== b[i].id_stream) f = true;
          if (a[i].id_subscription !== b[i].id_subscription) f = true;
        });
      } else {
        f = true;
      }
      return f;
    };
    if (diff(value, this.tmp)) {
      this.tmp = value;
    }
    return this.tmp;
  }

  // cold
  cold!: ObInfo;
  getCold(create: boolean) {
    const tmp = interval(1000).pipe(take(5));
    let cold;
    if (create) {
      cold = this.addInfo(tmp, 'cold');
    } else {
      if (!this.cold) {
        this.cold = this.addInfo(tmp, 'cold');
      }
      cold = this.cold;
    }
    return cold;
  }

  // hot_1
  hot_1!: ObInfo;
  getHot_1(create: boolean) {
    const tmp = interval(1000).pipe(take(10));
    let hot;
    if (create) {
      hot = this.addInfo(tmp, 'hot_1');
      hot.observable = hot.observable.pipe(share());
    } else {
      if (!this.hot_1) {
        this.hot_1 = this.addInfo(tmp, 'hot_1');
        this.hot_1.observable = this.hot_1.observable.pipe(share());
      }
      hot = this.hot_1;
    }
    return hot;
  }
  // hot_2
  hot_2!: ObInfo;
  getHot_2(create: boolean) {
    const tmp = interval(1000).pipe(take(10));
    let hot;
    if (create) {
      hot = this.addInfo(tmp, 'hot_2');
      hot.observable = hot.observable.pipe(shareReplay());
    } else {
      if (!this.hot_2) {
        this.hot_2 = this.addInfo(tmp, 'hot_2');
        this.hot_2.observable = this.hot_2.observable.pipe(shareReplay());
      }
      hot = this.hot_2;
    }
    return hot;
  }

  // 補足(Angular での使用方法)
  hot_1_2!: ObInfo;
  getHot_1_2() {
    const tmp = interval(1000);
    if (!this.hot_1_2) {
      this.hot_1_2 = this.addInfo(tmp, 'hot_1_2');
      this.hot_1_2.observable = this.hot_1_2.observable.pipe(
        shareReplay({ bufferSize: 1, refCount: true }),
      );
    }
    return this.hot_1_2;
  }
  hot_2_2!: ObInfo;
  getHot_2_2() {
    const tmp = interval(1000);
    if (!this.hot_2_2) {
      this.hot_2_2 = this.addInfo(tmp, 'hot_2_2');
      this.hot_2_2.observable = this.hot_2_2.observable.pipe(shareReplay(1));
    }
    return this.hot_2_2;
  }
  hots: ObInfo[] = [];
  pushHots(ob: ObInfo) {
    const cnt_stream = this.hots.length;
    ob.cnt_stream = cnt_stream;
    this.hots.push({
      id_stream: ob.id_stream,
      cnt_stream,
      observable: ob.observable.pipe(
        map((v) => {
          return { ...v, cnt_stream };
        }),
        tap((v) => console.log(`log2: ${this.toPrint(v)}`)),
      ),
    });
  }
  hot_2_3 = this.addSimpleInfo('hot_2_3').pipe(
    takeUntilDestroyed(),
    shareReplay(1),
  );
  hot_2_3_str = `this.addSimpleInfo('hot_2_3').pipe(
    takeUntilDestroyed(),
    shareReplay(1),
  );`;
  hot_2_4 = this.addSimpleInfo('hot_2_4').pipe(
    shareReplay(1),
    takeUntilDestroyed(),
  );
  hot_2_4_str = `this.addSimpleInfo('hot_2_4').pipe(
    shareReplay(1),
    takeUntilDestroyed(),
  );`;
  addSimpleInfo(type: string) {
    return interval(1000).pipe(
      map((cnt) => {
        return { cnt, type };
      }),
      tap((v) => console.log(`log: cnt: ${v.cnt}, type: ${v.type}`)),
    );
  }
  doSimpleSubscribe(observable: Observable<ObValue>) {
    const id_subscription = this.getIdSubscription();
    observable.subscribe({
      next: (v) => console.log(`next: ${this.toPrint(v, id_subscription)}`),
      error: console.error,
      complete: () =>
        console.log(`complete: id_stream: id_subscription: ${id_subscription}`),
    });
  }
}

interface ObValue {
  id_stream?: string;
  type: string;
  cnt: number;
  cnt_stream?: number;
}

interface ObInfo {
  id_stream: string;
  cnt_stream?: number;
  observable: Observable<ObValue>;
}
