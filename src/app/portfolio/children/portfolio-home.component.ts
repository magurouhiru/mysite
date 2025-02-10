import { AsyncPipe, NgOptimizedImage } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Auth, authState } from '@angular/fire/auth';
import {
  FieldValue,
  Timestamp,
  serverTimestamp,
  Firestore,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  collection,
  collectionData,
} from '@angular/fire/firestore';
import { getDownloadURL, ref, Storage } from '@angular/fire/storage';
import { RouterLink } from '@angular/router';
import { from, map, Observable } from 'rxjs';

import { MarkdownComponent } from 'ngx-markdown';

@Component({
  selector: 'app-portfolio-home',
  standalone: true,
  imports: [RouterLink, NgOptimizedImage, AsyncPipe, MarkdownComponent],
  templateUrl: './portfolio-home.component.html',
  styleUrl: './portfolio-home.component.scss',
})
export class PortfolioHomeComponent {
  readonly firestore = inject(Firestore);
  readonly storage = inject(Storage);

  readonly #portfolioInfoCollection = collection(
    this.firestore,
    'portfolio/home/portfolio_info',
  ).withConverter(portfolioInfoConverter);
  readonly portfolioInfos = toSignal(
    collectionData<PortfolioInfoApp>(this.#portfolioInfoCollection).pipe(
      map((infos) => {
        infos.forEach((info) => {
          info.thumbnail_url = from(
            getDownloadURL(ref(this.storage, info.thumbnail_path)),
          );
        });
        infos.sort((a, b) => b.created_at.toMillis() - a.created_at.toMillis());
        return infos;
      }),
    ),
  );

  auth = inject(Auth);
  readonly #authState = toSignal(authState(this.auth));
  isLogin = computed(() => !!this.#authState());
}

interface PortfolioInfoBody {
  label: string;
  thumbnail_path: string;
  reference_url: string;
  portfolio_link: string;
  concept: string;
  plan: string;
  specification: string;
  reflection: string;
}

export interface PortfolioInfoApp extends PortfolioInfoBody {
  created_at: Timestamp;
  thumbnail_url?: Observable<string>;
}

interface PortfolioInfoDb extends PortfolioInfoBody {
  created_at: FieldValue;
}

export const portfolioInfoConverter: FirestoreDataConverter<
  PortfolioInfoApp,
  PortfolioInfoDb
> = {
  toFirestore(data) {
    return {
      label: data.label,
      thumbnail_path: data.thumbnail_path,
      reference_url: data.reference_url,
      portfolio_link: data.portfolio_link,
      concept: data.concept,
      plan: data.plan,
      specification: data.specification,
      reflection: data.reflection,
      created_at: serverTimestamp(),
    } as PortfolioInfoDb;
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot<PortfolioInfoApp, PortfolioInfoDb>,
  ) {
    return snapshot.data();
  },
};
