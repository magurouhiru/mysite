import { inject, Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  Firestore,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  WithFieldValue,
} from '@angular/fire/firestore';
import { ref, Storage, uploadBytesResumable } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  readonly #store = inject(Firestore);
  readonly #storage = inject(Storage);

  readonly #storeRef = collection(
    this.#store,
    '/portfolio/code-jump_store2-menu/products',
  ).withConverter(productConverter);
  readonly #storageRef = ref(
    this.#storage,
    '/portfolio/code-jump_store2-menu/products',
  );
  addProduct(p: Product, imgs: File[]) {
    addDoc(this.#storeRef, p).then((docRef) => {
      imgs.forEach((img) => {
        uploadBytesResumable(
          ref(this.#storageRef, docRef.id + '/' + img.name),
          img,
        );
      });
    });
  }
}

interface ProductDb {
  title: string;
  detail1: string;
  detail2: string;
  price: number;
  size: {
    w: number;
    d: number;
    h: number;
  };
  color: string;
  material: string;
  index: number;
}

interface Product extends ProductDb {
  id: string;
}

const productConverter: FirestoreDataConverter<Product, ProductDb> = {
  toFirestore(modelObject: WithFieldValue<Product>): WithFieldValue<ProductDb> {
    return {
      title: modelObject.title,
      detail1: modelObject.detail1,
      detail2: modelObject.detail2,
      price: modelObject.price,
      size: modelObject.size,
      color: modelObject.color,
      material: modelObject.material,
      index: modelObject.index,
    };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot<Product, ProductDb>): Product {
    return { ...snapshot.data(), id: snapshot.id };
  },
};
