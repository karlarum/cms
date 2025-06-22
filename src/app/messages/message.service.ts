import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Message } from './message.model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: Message[] = [];
  messageChangedEvent = new EventEmitter<Message[]>();
  maxMessageId: number;

  private messagesUrl = 'https://cmsproject25-1de72-default-rtdb.firebaseio.com/messages.json';

  constructor(private http: HttpClient) { }

  getMessages(): void {
    this.http.get<Message[]>(this.messagesUrl).subscribe(
      (messages: Message[]) => {
        this.messages = messages;
        this.maxMessageId = this.getMaxId();

        this.messageChangedEvent.next(this.messages.slice());
      },
      (error: any) => {
        console.error('Error fetching messages:', error);
      }
    )
  }

  getMessage(id:string): Message {
    for (let message of this.messages) {
      if (message.id === id) {
        return message;
      }
    }
    return null;
  }

  getMaxId(): number {
    let maxId= 0;
    for (let doc of this.messages) {
    const currentId = parseInt(doc.id, 10);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  addMessage(message: Message) {
  this.messages.push(message);
  this.storeMessages();
  }

  storeMessages() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const messagesJson = JSON.stringify(this.messages);

    this.http.put(
      'https://cmsproject25-1de72-default-rtdb.firebaseio.com/messages.json',
      messagesJson,
      { headers: headers }
    ).subscribe(() => {
      this.messageChangedEvent.next(this.messages.slice());
    });
  }
}
