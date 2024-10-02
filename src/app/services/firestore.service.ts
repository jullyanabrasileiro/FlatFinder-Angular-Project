import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: AngularFirestore) { }

  // Create a new document in a collection
  createDocument(collectionPath: string, data: any, docId?: string): Promise<void> {
    if (docId) {
      return this.firestore.collection(collectionPath).doc(docId).set(data);
    } else {
      return this.firestore.collection(collectionPath).add(data).then(() => {});
    }
  }

  // Get a document by its ID
  getDocumentById<T>(collectionPath: string, docId: string): Observable<T | undefined> {
    return this.firestore.collection<T>(collectionPath).doc(docId).valueChanges();
  }

  // Get all documents in a collection
  getCollection<T>(collectionPath: string): Observable<T[]> {
    return this.firestore.collection<T>(collectionPath).valueChanges();
  }

  // Update a document
  updateDocument(collectionPath: string, docId: string, data: any): Promise<void> {
    return this.firestore.collection(collectionPath).doc(docId).update(data);
  }

  // Delete a document
  deleteDocument(collectionPath: string, docId: string): Promise<void> {
    return this.firestore.collection(collectionPath).doc(docId).delete();
  }
}
