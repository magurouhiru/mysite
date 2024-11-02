import { Component } from '@angular/core';
import {
  concat,
  zip,
  combineLatest,
  merge,
  forkJoin,
  race,
  Subject,
  tap,
} from 'rxjs';

import { Button } from 'primeng/button';

@Component({
  selector: 'app-observable-n-to-1',
  standalone: true,
  imports: [Button],
  templateUrl: './observable-n-to-1.component.html',
  styleUrl: './observable-n-to-1.component.scss',
})
export class ObservableNTo1Component {
  getSub() {
    return new Subject<ObValue>();
  }
  sub1 = this.getSub();
  sub1Cnt = 0;
  nextSub1() {
    this.sub1Cnt++;
    this.sub1.next({ sub1: this.sub1Cnt } satisfies ObValue);
  }
  completeSub1() {
    this.sub1.complete();
  }
  errorSub1() {
    this.sub1.error('error: sub1');
  }
  resetSub1() {
    this.sub1.complete();
    this.sub1 = this.getSub();
    this.sub1Cnt = 0;
  }
  sub2 = this.getSub();
  sub2Cnt = 0;
  nextSub2() {
    this.sub2Cnt++;
    this.sub2.next({ sub2: this.sub2Cnt } satisfies ObValue);
  }
  completeSub2() {
    this.sub2.complete();
  }
  errorSub2() {
    this.sub2.error('error: sub2');
  }
  resetSub2() {
    this.sub2.complete();
    this.sub2 = this.getSub();
    this.sub2Cnt = 0;
  }
  // eslint-disable-next-line
  executeSubscribe(f: any) {
    const subs = [
      this.sub1.pipe(
        tap((v) => console.log(`tap: sub1: ${JSON.stringify(v)}`)),
      ),
      this.sub2.pipe(
        tap((v) => console.log(`tap: sub2: ${JSON.stringify(v)}`)),
      ),
    ];
    f(...subs).subscribe({
      // eslint-disable-next-line
      next: (v: any) => console.log(`next: ${JSON.stringify(v)}`),
      error: console.error,
      complete: () => console.log(`complete`),
    });
  }

  race = race;
  forkJoin = forkJoin;
  merge = merge;
  combineLatest = combineLatest;
  zip = zip;
  concat = concat;
}

interface ObValue {
  sub1?: number;
  sub2?: number;
}
