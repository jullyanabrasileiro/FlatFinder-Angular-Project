import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from '../../services/message.service';
import { Message } from '../../models/message.model';

@Component({
  selector: 'app-flat-view-messages',
  templateUrl: './flat-view-messages.component.html',
  styleUrls: ['./flat-view-messages.component.css'],
})
export class FlatViewMessagesComponent implements OnInit {
  messages: Message[] = [];
  flatId: string = '';
  newMessage: string = '';
isOwner: any;

  constructor(
    private messageService: MessageService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.flatId = this.route.snapshot.paramMap.get('id') || '';  
    this.getMessages();
  }

  getMessages(): void {
    this.messageService.getMessages(this.flatId).subscribe((data) => {
      this.messages = data;
    });
  }

  sendMessage(): void {
    const message: Message = {
      creationTime: new Date(),
      senderName: 'User Name',  
      senderEmail: 'User Email', 
      content: this.newMessage,
    };

    this.messageService.sendMessage(this.flatId, message).subscribe(() => {
      this.getMessages(); 
      this.newMessage = '';
    });
  }
}
