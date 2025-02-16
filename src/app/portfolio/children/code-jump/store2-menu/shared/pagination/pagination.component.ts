import { Component, computed, input, output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent {
  total = input.required<number>();
  startAt = input.required<number>();
  limit = input.required<number>();

  changePage = output<ChangePage>();

  totalPage = computed(() => {
    return (
      Math.floor(this.total() / this.limit()) +
      (this.total() % this.limit() === 0 ? 0 : 1)
    );
  });
  pages = computed(() =>
    Array.from({ length: this.totalPage() }, (_, i) => i + 1),
  );
  currentPage = computed(() => Math.floor(this.startAt() / this.limit()) + 1);

  selectPage(i: number) {
    this.changePage.emit({
      startAt: this.limit() * (i - 1) + 1,
      limit: this.limit(),
    });
  }
}

export interface ChangePage {
  startAt: number;
  limit: number;
}
