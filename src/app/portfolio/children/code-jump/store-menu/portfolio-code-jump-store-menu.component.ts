import { NgOptimizedImage } from '@angular/common';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  collection,
  collectionData,
  Firestore,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
} from '@angular/fire/firestore';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-portfolio-code-jump-store-menu',
  standalone: true,
  imports: [RouterLink, NgOptimizedImage],
  templateUrl: './portfolio-code-jump-store-menu.component.html',
  styleUrl: './portfolio-code-jump-store-menu.component.scss',
})
export class PortfolioCodeJumpStoreMenuComponent {
  readonly #store = inject(Firestore);
  readonly #menuItemCofeeRef = collection(
    this.#store,
    'portfolio/code-jump_store-menu/menu_item_coffee',
  ).withConverter(menuItemConverter);
  readonly menuItemCoffee = toSignal(
    collectionData<MenuItem>(this.#menuItemCofeeRef),
    { initialValue: [] },
  );
  readonly #menuItemFoodRef = collection(
    this.#store,
    'portfolio/code-jump_store-menu/menu_item_food',
  ).withConverter(menuItemConverter);
  readonly menuItemFood = toSignal(
    collectionData<MenuItem>(this.#menuItemFoodRef),
    { initialValue: [] },
  );
  readonly #menuItemOtherRef = collection(
    this.#store,
    'portfolio/code-jump_store-menu/menu_item_other',
  ).withConverter(menuItemConverter);
  readonly menuItemOther = toSignal(
    collectionData<MenuItem>(this.#menuItemOtherRef),
    { initialValue: [] },
  );

  readonly #aboutItemRef = collection(
    this.#store,
    'portfolio/code-jump_store-menu/about_item',
  ).withConverter(aboutItemConverter);
  readonly aboutItem = toSignal(collectionData<AboutItem>(this.#aboutItemRef), {
    initialValue: [],
  });
}
interface MenuItem {
  id: number;
  name: string;
  price: number;
}

const menuItemConverter: FirestoreDataConverter<MenuItem, MenuItem> = {
  toFirestore(menuItem: MenuItem) {
    return menuItem;
  },
  fromFirestore(snapshot: QueryDocumentSnapshot<MenuItem, MenuItem>) {
    return snapshot.data();
  },
};

interface AboutItem {
  id: number;
  text: string;
}

const aboutItemConverter: FirestoreDataConverter<AboutItem, AboutItem> = {
  toFirestore(aboutItem: AboutItem) {
    return aboutItem;
  },
  fromFirestore(snapshot: QueryDocumentSnapshot<AboutItem, AboutItem>) {
    return snapshot.data();
  },
};
