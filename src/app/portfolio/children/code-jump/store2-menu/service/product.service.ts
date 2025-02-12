import { inject, Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  Firestore,
  FirestoreDataConverter,
  limit,
  orderBy,
  query,
  QueryDocumentSnapshot,
  startAt,
  WithFieldValue,
  getCountFromServer,
} from '@angular/fire/firestore';
import {
  getDownloadURL,
  ref,
  Storage,
  uploadBytesResumable,
} from '@angular/fire/storage';
import { from } from 'rxjs';

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

  getCount() {
    return from(
      getCountFromServer(this.#storeRef).then((s) => {
        console.log(s);
        return s.data().count;
      }),
    );
  }
  getProducts(s = 0, l = 8) {
    const q = query(
      this.#storeRef,
      orderBy('index', 'asc'),
      startAt(s),
      limit(l),
    );
    return collectionData<Product>(q);
  }
  getImg(p: Product) {
    const r = ref(this.#storageRef, p.id + `/item${p.index}.jpg`);
    return from(getDownloadURL(r));
  }
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

export interface Product extends ProductDb {
  id: string;
  img_url?: string;
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
