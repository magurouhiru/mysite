import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Analytics, ScreenTrackingService } from '@angular/fire/analytics';
import { Auth, authState } from '@angular/fire/auth';
import { RouterLink, RouterOutlet } from '@angular/router';

import { Contents } from './shared/contents';
import { ConfirmationService } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CardModule, ConfirmDialogModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [ScreenTrackingService, ConfirmationService],
})
export class AppComponent {
  title = 'mysite';
  contents = Contents;
  protected readonly Object = Object;
  s = inject(ScreenTrackingService);
  a = inject(Analytics);

  confirmationService = inject(ConfirmationService);
  auth = inject(Auth);
  readonly #authState = toSignal(authState(this.auth));
  isLogin = computed(() => !!this.#authState());
  loginWithGoogle() {
    this.confirmationService.confirm({
      header: 'お願い！管理者以外はログインしないでください！',
      message: '管理者以外のコンテンツはありません。',
      closeOnEscape: true,
      acceptLabel: 'ログイン',
      accept: () => {
        signInWithPopup(this.auth, new GoogleAuthProvider());
      },
      rejectLabel: '戻る',
    });
  }
  logout() {
    this.auth.signOut();
  }
}
