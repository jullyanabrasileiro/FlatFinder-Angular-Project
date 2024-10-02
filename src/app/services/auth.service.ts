import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'; // Correct import for AngularFire
import { Observable } from 'rxjs';
import firebase from 'firebase/compat/app'; // Import firebase for compatibility

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User | null>;  // firebase.User for type

  constructor(private afAuth: AngularFireAuth) {
    this.user$ = afAuth.authState;
  }

  async signIn(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return await this.afAuth.signInWithEmailAndPassword(email, password);
  }
  
  async signOut(): Promise<void> {
    return await this.afAuth.signOut();
  }
}


