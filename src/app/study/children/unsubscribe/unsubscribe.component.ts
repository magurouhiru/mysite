import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { interval, map, Observable, Subscription, tap } from 'rxjs';

import { ButtonDirective } from 'primeng/button';

@Component({
  selector: 'app-unsubscribe',
  standalone: true,
  imports: [ButtonDirective, AsyncPipe],
  templateUrl: './unsubscribe.component.html',
  styleUrl: './unsubscribe.component.scss',
})
export class UnsubscribeComponent {
  l = '@let';
  i = '@if';
  oa = '{{ observable | async }}';
  // 準備
  ObValue = `interface ObValue {
    id?: string;
    type: string;
    cnt: number;
  }`;
  cnt = 0;
  getId() {
    this.cnt++;
    return String(this.cnt).padStart(3, '0');
  }
  coldObservable = interval(1000);
  coldObservable_str = 'interval(1000);';
  getColdObservable(observable?: Observable<number>) {
    if (!observable) {
      observable = this.coldObservable;
    }
    const id = this.getId();
    return observable.pipe(
      map((cnt) => {
        return { id, cnt, type: 'cold' } satisfies ObValue;
      }),
      tap((v) => console.log(`log: ${this.toPrint(v)}`)),
    );
  }
  toPrint(v: ObValue) {
    return (v.id ? `id: ${v.id}, ` : '') + `cnt: ${v.cnt}, type: ${v.type}`;
  }

  // 単純なunsubscribe
  simpleSubscription!: Subscription;
  doSubscribe(observable?: Observable<ObValue>) {
    if (!observable) {
      observable = this.getColdObservable();
    }
    return observable.subscribe({
      next: (v) => console.log(`next: ${this.toPrint(v)}`),
      error: console.error,
      complete: () => console.log('complete'),
    });
  }
  doSimpleUnsubscribe() {
    this.simpleSubscription.unsubscribe();
  }

  // Subscription.add()を使用したunsubscribe
  subscription!: Subscription;
  newSubscription() {
    this.subscription = new Subscription();
  }
  doSubscriptionAdd() {
    this.subscription.add(this.doSubscribe());
  }
  doSubscriptionUnsubscribe() {
    this.subscription.unsubscribe();
  }

  // AsyncPipe(Angular)を使用したunsubscribe
  observable!: Observable<ObValue>;
  setObservable() {
    this.observable = this.getColdObservable();
  }

  // takeUntilDestroyed(Angular)を使用したunsubscribe
  takeUntilDestroyed = this.coldObservable.pipe(takeUntilDestroyed());
  takeUntilDestroyed_str =
    'this.getColdObservable().pipe(takeUntilDestroyed());';
  doTakeUntilDestroyed() {
    this.doSubscribe(this.getColdObservable(this.takeUntilDestroyed));
  }
}

interface ObValue {
  id?: string;
  type: string;
  cnt: number;
}
