import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Message } from '../models/message.model';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private apiUrl = 'your-api-endpoint-here'; 

  constructor(private http: HttpClient) {}

  getMessages(flatId: string): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.apiUrl}/flats/${flatId}/messages`);
  }

  sendMessage(flatId: string, message: Message): Observable<Message> {
    return this.http.post<Message>(`${this.apiUrl}/flats/${flatId}/messages`, message);
  }
}
