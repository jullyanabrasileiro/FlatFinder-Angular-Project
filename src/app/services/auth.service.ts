import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from '../models/user.model'; 

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser: User | null = null;

  constructor(private http: HttpClient) {
    this.loadCurrentUser();
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post('/api/login', credentials); 
  }

  logout() {
    localStorage.removeItem('token');
    this.currentUser = null;
  }

  getLoggedInUser(): User | null {
    return this.currentUser; 
  }

  isAdmin(): boolean {
    return this.currentUser?.isAdmin ?? false; 
  }

  isCurrentUser(user: User): boolean {
    return this.currentUser?.email === user.email; 
  }

  private loadCurrentUser() {
    const token = localStorage.getItem('token');
    if (token) {
      this.currentUser = {
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
        birthDate: new Date('1990-01-01'),
        flatsCounter: 5,
        isAdmin: true
      };
    }
  }
}
