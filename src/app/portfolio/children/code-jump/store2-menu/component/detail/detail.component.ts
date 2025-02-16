import { NgOptimizedImage } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { concat, filter, map, of, switchMap } from 'rxjs';

import { Product, ProductService } from '../../service/product.service';
import { AComponent } from '../../shared/a/a.component';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [NgOptimizedImage, RouterLink, AComponent],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss',
})
export class DetailComponent {
  readonly #service = inject(ProductService);
  readonly #route = inject(ActivatedRoute);
  readonly #title = inject(Title);

  readonly product = toSignal<Product>(
    this.#route.params.pipe(
      switchMap((params) => this.#service.getProduct(params['productId'])),
      filter((product) => !!product),
      switchMap((product) => {
        return concat(
          of(product),
          this.#service.getImg(product).pipe(
            map((img_url) => {
              return { ...product, img_url } satisfies Product as Product;
            }),
          ),
        );
      }),
    ),
  );

  constructor() {
    effect(() => {
      const t = this.product()?.title;
      this.#title.setTitle((t ? t + ' | ' : '') + 'Furniture Design');
    });
  }
}
