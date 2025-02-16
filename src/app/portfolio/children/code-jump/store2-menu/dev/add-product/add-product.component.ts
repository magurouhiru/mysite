import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';

import { ProductService } from '../../service/product.service';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss',
})
export class AddProductComponent {
  service = inject(ProductService);
  fb = inject(NonNullableFormBuilder);

  fg = this.fb.group({
    tostore: this.fb.group({
      title: this.fb.control('プロダクトタイトルプロダクトタイトル'),
      detail1: this.fb.control(
        'テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト',
      ),
      detail2: this.fb.control(
        'テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト',
      ),
      price: this.fb.control(99999),
      size: this.fb.group({
        w: this.fb.control(999),
        d: this.fb.control(999),
        h: this.fb.control(999),
      }),
      color: this.fb.control('テキスト'),
      material: this.fb.control('テキストテキストテキスト'),
      index: this.fb.control(0),
      id: this.fb.control(''),
    }),
    toStorage: this.fb.control<File[]>([]),
  });

  // eslint-disable-next-line
  setImgs(e: any) {
    if (e.target?.files) {
      this.fg.controls.toStorage.setValue(Object.values(e.target?.files));
    }
  }

  submit() {
    const v = this.fg.getRawValue();
    v.toStorage.forEach((img) => {
      const index = Number(img.name.replace('item', '').replace('.jpg', ''));
      this.service.addProduct({ ...v.tostore, index }, [img]);
    });
  }
}
