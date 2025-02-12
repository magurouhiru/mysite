import { Component, inject, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { combineLatest, switchMap } from 'rxjs';

import { ProductService } from '../../service/product.service';
import {
  ChangePage,
  PaginationComponent,
} from '../../shared/pagination/pagination.component';
import { ProductCardComponent } from '../../shared/product-card/product-card.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductCardComponent, RouterLink, PaginationComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  readonly #service = inject(ProductService);
  readonly total = toSignal(this.#service.getCount(), { initialValue: 0 });
  readonly startAt = signal(1);
  readonly limit = signal(12);
  readonly products = toSignal(
    combineLatest([toObservable(this.startAt), toObservable(this.limit)]).pipe(
      switchMap(([startAt, limit]) =>
        this.#service.getProducts(startAt, limit),
      ),
    ),
  );

  changePage(e: ChangePage) {
    console.log(e);
    this.startAt.set(e.startAt);
    this.limit.set(e.limit);
  }
}
