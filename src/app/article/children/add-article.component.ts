import { Component, inject } from '@angular/core';
import {
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';

import { AccordionModule } from 'primeng/accordion';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MarkdownComponent } from 'ngx-markdown';

import { parse } from 'date-fns';

@Component({
  selector: 'app-add-article',
  standalone: true,
  imports: [
    CardModule,
    AccordionModule,
    InputTextModule,
    ReactiveFormsModule,
    FormsModule,
    InputTextareaModule,
    MarkdownComponent,
  ],
  templateUrl: './add-article.component.html',
  styleUrl: './add-article.component.scss',
})
export class AddArticleComponent {
  fb = inject(NonNullableFormBuilder);
  input = this.fb.control('');
  toFirebase = this.fb.group({
    meta: this.fb.group({
      title: this.fb.control(''),
      author: this.fb.control(''),
      date: this.fb.control<Date | null>(null),
      tags: this.fb.control<string[]>([]),
    }),
    body: this.fb.control(''),
  });

  setToFirebase() {
    const raws = this.input.getRawValue().split(/\r?\n/);
    const rawMeta = JSON.parse(raws.shift() ?? '');
    const rawTitle = raws.shift() ?? '';
    const date = parse(rawMeta.date, 'yyyy/MM/dd', new Date());
    const meta = this.toFirebase.controls.meta.controls;
    meta.title.setValue(rawTitle.replaceAll('#', '').trim());
    meta.author.setValue(rawMeta.author);
    meta.date.setValue(date);
    meta.tags.setValue(rawMeta.tags as string[]);
    this.toFirebase.controls.body.setValue(raws.join('\n'));
  }
}
