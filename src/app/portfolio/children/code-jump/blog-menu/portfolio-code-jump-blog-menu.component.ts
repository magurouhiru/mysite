import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  collection,
  collectionData,
  Firestore,
  QueryDocumentSnapshot,
  FirestoreDataConverter,
} from '@angular/fire/firestore';
import { getDownloadURL, ref, Storage } from '@angular/fire/storage';
import { forkJoin, from } from 'rxjs';

@Component({
  selector: 'app-portfolio-code-jump-blog-menu',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './portfolio-code-jump-blog-menu.component.html',
  styleUrl: './portfolio-code-jump-blog-menu.component.scss',
})
export class PortfolioCodeJumpBlogMenuComponent {
  readonly firestore = inject(Firestore);
  readonly storage = inject(Storage);

  readonly pickup$ = collectionData(
    collection(
      this.firestore,
      'portfolio/code-jump_blog-menu/pickup',
      // ),
    ).withConverter(pickupConverter),
  );
  readonly main$ = collectionData(
    collection(this.firestore, 'portfolio/code-jump_blog-menu/main'),
  );
  readonly author$ = collectionData(
    collection(this.firestore, 'portfolio/code-jump_blog-menu/author'),
  );
  readonly ranking$ = collectionData(
    collection(this.firestore, 'portfolio/code-jump_blog-menu/ranking'),
  );
  readonly #base_url = 'portfolio/code-jump/blog-menu/';
  readonly urls$ = forkJoin({
    pickup1: from(
      getDownloadURL(ref(this.storage, this.#base_url + 'pickup1.jpg')),
    ),
    pickup2: from(
      getDownloadURL(ref(this.storage, this.#base_url + 'pickup2.jpg')),
    ),
    pickup3: from(
      getDownloadURL(ref(this.storage, this.#base_url + 'pickup3.jpg')),
    ),
    main1: from(
      getDownloadURL(ref(this.storage, this.#base_url + 'main1.jpg')),
    ),
    main2: from(
      getDownloadURL(ref(this.storage, this.#base_url + 'main2.jpg')),
    ),
    main3: from(
      getDownloadURL(ref(this.storage, this.#base_url + 'main3.jpg')),
    ),
    author: from(
      getDownloadURL(ref(this.storage, this.#base_url + 'author.jpg')),
    ),
    ranking1: from(
      getDownloadURL(ref(this.storage, this.#base_url + 'ranking1.jpg')),
    ),
    ranking2: from(
      getDownloadURL(ref(this.storage, this.#base_url + 'ranking2.jpg')),
    ),
    ranking3: from(
      getDownloadURL(ref(this.storage, this.#base_url + 'ranking3.jpg')),
    ),
  });
}

class Pickup {
  constructor(readonly title: string) {}
}
// interface Pickup {
//   title: string;
// }
const pickupConverter: FirestoreDataConverter<Pickup, Pickup> = {
  toFirestore(pickup: Pickup) {
    return { title: pickup.title };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot<Pickup, Pickup>) {
    const data = snapshot.data();
    return data;
  },
};
