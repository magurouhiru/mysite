import { Component, inject, signal } from '@angular/core';
import {
  WithFieldValue,
  Firestore,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  collection,
  doc,
  deleteDoc,
  setDoc,
  updateDoc,
  getDoc,
} from '@angular/fire/firestore';

import { Button } from 'primeng/button';

@Component({
  selector: 'app-angularfire-firestore',
  standalone: true,
  imports: [Button],
  templateUrl: './angularfire-firestore.component.html',
  styleUrl: './angularfire-firestore.component.scss',
})
export class AngularfireFirestoreComponent {
  store = inject(Firestore);

  // sample1 ref
  sample1Collection = collection(
    this.store,
    '/study/angularfire-firestore/sample_collection_1',
  ).withConverter(sample1Converter);
  sample1Doc = doc(this.sample1Collection, 'sample_doc');

  // doc
  sample1DocData = signal<Sample1 | undefined>(undefined);
  getSample1Doc() {
    getDoc(this.sample1Doc).then((doc) => this.sample1DocData.set(doc.data()));
  }
  setSample1Doc1_1() {
    setDoc(this.sample1Doc, { data1: 'setSampleDoc1_1' });
  }
  setSample1Doc1_2() {
    setDoc(this.sample1Doc, {
      data1: 'setSampleDoc1_2',
      data2: 'setSampleDoc1_2',
    });
  }
  setSample1Doc2_1() {
    setDoc(this.sample1Doc, { data1: 'setSampleDoc2_1' }, { merge: true });
  }
  setSample1Doc2_2() {
    setDoc(this.sample1Doc, { data1: 'setSampleDoc2_2' }, { merge: false });
  }
  setSample1Doc3_1() {
    setDoc(
      this.sample1Doc,
      { data1: 'setSampleDoc3_1', data2: 'setSampleDoc3_1' },
      { mergeFields: ['data1'] },
    );
  }
  updateSample1Doc() {
    updateDoc(this.sample1Doc, { data1: 'updateSampleDoc' });
  }
  deleteSample1Doc() {
    deleteDoc(this.sample1Doc);
  }
  protected readonly JSON = JSON;
}

interface Sample1 {
  data1: string;
  data2?: string;
}

const sample1Converter: FirestoreDataConverter<Sample1, Sample1> = {
  toFirestore(modelObject: WithFieldValue<Sample1>): WithFieldValue<Sample1> {
    return modelObject;
  },
  fromFirestore(snapshot: QueryDocumentSnapshot<Sample1, Sample1>): Sample1 {
    return snapshot.data();
  },
};
