import { AsyncPipe, NgOptimizedImage } from '@angular/common';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  Timestamp,
  Firestore,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  collection,
  collectionData,
} from '@angular/fire/firestore';
import { getDownloadURL, ref, Storage } from '@angular/fire/storage';
import { RouterLink } from '@angular/router';
import { from, map, NEVER, Observable } from 'rxjs';

@Component({
  selector: 'app-portfolio-home',
  standalone: true,
  imports: [RouterLink, NgOptimizedImage, AsyncPipe],
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
    collectionData<PortfolioInfo>(this.#portfolioInfoCollection).pipe(
      map((infos) => {
        infos.forEach((info) => {
          info.setThumbnailUrl(
            from(getDownloadURL(ref(this.storage, info.thumbnail_path))),
          );
          console.log(info.create_at);
        });
        console.log(Timestamp.now());
        return infos.sort(
          (a, b) => b.create_at.toMillis() - a.create_at.toMillis(),
        );
      }),
    ),
  );
}

class PortfolioInfo {
  thumbnail_url: Observable<string> = NEVER;

  constructor(
    readonly label: string,
    readonly thumbnail_path: string,
    readonly reference_url: string,
    readonly portfolio_link: string,
    readonly concept: string,
    readonly plan: string,
    readonly specification: string,
    readonly reflection: string,
    readonly create_at: Timestamp,
  ) {
    this.label = label;
    this.thumbnail_path = thumbnail_path;
    this.reference_url = reference_url;
    this.portfolio_link = portfolio_link;
    this.concept = concept;
    this.plan = plan;
    this.specification = specification;
    this.reflection = reflection;
    this.create_at = create_at;
  }

  setCreateAtNow() {
    // this.create_at = Timestamp.now();
  }
  setThumbnailUrl(thumbnail_url: Observable<string>) {
    this.thumbnail_url = thumbnail_url;
  }
}

const portfolioInfoConverter: FirestoreDataConverter<
  PortfolioInfo,
  PortfolioInfo
> = {
  toFirestore(portfolioInfo: PortfolioInfo) {
    return portfolioInfo;
  },
  fromFirestore(snapshot: QueryDocumentSnapshot<PortfolioInfo, PortfolioInfo>) {
    const data = snapshot.data();
    return new PortfolioInfo(
      data.label,
      data.thumbnail_path,
      data.reference_url,
      data.portfolio_link,
      data.concept,
      data.plan,
      data.specification,
      data.reflection,
      data.create_at,
    );
  },
};
