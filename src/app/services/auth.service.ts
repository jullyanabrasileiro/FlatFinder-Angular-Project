import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'; 
import { Observable } from 'rxjs';
import firebase from 'firebase/compat/app';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  logout() {
    throw new Error('Method not implemented.');
  }
  getLoggedInUser(): User | null {
    throw new Error('Method not implemented.');
  }
  isAdmin(): boolean {
    throw new Error('Method not implemented.');
  }
isCurrentUser(arg0: User): any {
throw new Error('Method not implemented.');
}
  login(arg0: { email: any; password: any; }) {
    throw new Error('Method not implemented.');
  }
  user$: Observable<firebase.User | null>;

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


