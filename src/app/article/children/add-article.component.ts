import { Component, inject } from '@angular/core';
import {
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';

import { AccordionModule } from 'primeng/accordion';
import { Button } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MarkdownComponent } from 'ngx-markdown';

import { ArticleApp } from '../article';
import { ArticleService } from '../article.service';

import { parse } from 'date-fns';
import { Timestamp } from 'firebase/firestore';

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
    Button,
  ],
  templateUrl: './add-article.component.html',
  styleUrl: './add-article.component.scss',
})
export class AddArticleComponent {
  service = inject(ArticleService);
  fb = inject(NonNullableFormBuilder);
  router = inject(Router);
  input = this.fb.control('');
  toFirebase = this.fb.group({
    meta: this.fb.group({
      author: this.fb.control(''),
      date: this.fb.control<Date>(null as unknown as Date),
      tags: this.fb.control<string[]>([]),
    }),
    title: this.fb.control(''),
    body: this.fb.control(''),
    imgs: this.fb.control<File[]>([]),
  });

  setToFirebase() {
    const raws = this.input.getRawValue().split(/\r?\n/);
    const rawMeta = JSON.parse(raws.shift() ?? '');
    const rawTitle = raws.shift() ?? '';
    const date = parse(rawMeta.date, 'yyyy/MM/dd', new Date());
    const meta = this.toFirebase.controls.meta.controls;
    meta.author.setValue(rawMeta.author);
    meta.date.setValue(date);
    meta.tags.setValue(rawMeta.tags as string[]);
    this.toFirebase.controls.title.setValue(
      rawTitle.replaceAll('#', '').trim(),
    );
    this.toFirebase.controls.body.setValue(raws.join('\n'));
  }

  // eslint-disable-next-line
  setImgs(e: any) {
    if (e.target?.files) {
      this.toFirebase.controls.imgs.setValue(Object.values(e.target?.files));
    }
  }

  submit() {
    const v = this.toFirebase.getRawValue();
    const a = {
      meta: {
        author: v.meta.author,
        date: Timestamp.fromDate(v.meta.date),
        tags: v.meta.tags,
      },
      title: v.title,
      body: v.body,
    } as ArticleApp;
    this.service.addArticle(a, v.imgs);
    this.router.navigate(['article']);
  }
}
