import { Component, inject } from '@angular/core';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { portfolioInfoConverter } from './portfolio-home.component';
import { Button } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';

@Component({
  selector: 'app-add-card',
  standalone: true,
  imports: [ReactiveFormsModule, InputTextModule, InputTextareaModule, Button],
  templateUrl: './add-card.component.html',
  styleUrl: './add-card.component.scss',
})
export class AddCardComponent {
  router = inject(Router);
  fb = inject(NonNullableFormBuilder);
  store = inject(Firestore);
  ref = collection(this.store, '/portfolio/home/portfolio_info').withConverter(
    portfolioInfoConverter,
  );

  fg = this.fb.group({
    label: this.fb.control(''),
    thumbnail_path: this.fb.control(''),
    reference_url: this.fb.control(''),
    portfolio_link: this.fb.control(''),
    concept: this.fb.control(''),
    plan: this.fb.control(''),
    specification: this.fb.control(''),
    reflection: this.fb.control(''),
  });

  submit() {
    addDoc(this.ref, this.fg.getRawValue());
    this.router.navigate(['portfolio']);
  }
}
