import { Component, inject } from '@angular/core';
import { Analytics } from '@angular/fire/analytics';
import { RouterLink, RouterOutlet } from '@angular/router';

import { Contents } from './shared/contents';
import { CardModule } from 'primeng/card';

import {
  FIREBASECONFIG_APIKEY,
  FIREBASECONFIG_APPID,
  FIREBASECONFIG_AUTHDOMAIN,
  FIREBASECONFIG_MEASUREMENTID,
  FIREBASECONFIG_MESSAGINGSENDERID,
  FIREBASECONFIG_PROJECTID,
  FIREBASECONFIG_STORAGEBUCKET,
} from '../environments/environment';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CardModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'mysite';
  contents = Contents;
  protected readonly Object = Object;
  a = inject(Analytics);
  constructor() {
    console.log(FIREBASECONFIG_APPID);
    console.log(FIREBASECONFIG_APIKEY);
    console.log(FIREBASECONFIG_AUTHDOMAIN);
    console.log(FIREBASECONFIG_PROJECTID);
    console.log(FIREBASECONFIG_MESSAGINGSENDERID);
    console.log(FIREBASECONFIG_MEASUREMENTID);
    console.log(FIREBASECONFIG_STORAGEBUCKET);
  }
}
