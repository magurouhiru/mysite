import { AsyncPipe, NgOptimizedImage } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { concat, map, Observable, of } from 'rxjs';

import { Product, ProductService } from '../../service/product.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [NgOptimizedImage, AsyncPipe, RouterLink],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  readonly product = input.required<Product>();

  readonly #service = inject(ProductService);

  readonly card = computed<Observable<Product>>(() => {
    return concat(
      of(this.product()),
      this.#service.getImg(this.product()).pipe(
        map((img_url) => {
          return { ...this.product(), img_url } satisfies Product as Product;
        }),
      ),
    );
  });
}
