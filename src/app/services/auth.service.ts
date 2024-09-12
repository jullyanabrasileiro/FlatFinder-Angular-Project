import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAdmin(): boolean {
    throw new Error('Method not implemented.');
  }
  getLoggedInUser(): any {
    throw new Error('Method not implemented.');
  }

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post('/api/login', credentials); // HAVE TO Replace with backend API endpoint
  }

  logout() {
    localStorage.removeItem('token');
  }
}

