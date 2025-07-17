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

  private messagesUrl = 'http://localhost:3000/messages';

  constructor(private http: HttpClient) { }

  getMessages(): void {
    this.http.get<{message: string, messages: Message[]}>(this.messagesUrl).subscribe(
      (responseData) => {
        this.messages = responseData.messages;
        this.maxMessageId = this.getMaxId();
        this.messageChangedEvent.next(this.messages.slice());
      },
      (error: any) => {
        console.error('Error fetching messages:', error);
      }
    )
  }

  getMessage(id: string): Message {
    for (let message of this.messages) {
      if (message.id === id) {
        return message;
      }
    }
    return null;
  }

  getMaxId(): number {
    let maxId = 0;
    for (let msg of this.messages) {
      const currentId = parseInt(msg.id, 10);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  addMessage(message: Message) {
    if (!message) {
      return;
    }

    message.id = '';

    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    
    this.http.post<{ message: string, messageData: Message }>('http://localhost:3000/messages',
      message,
      { headers: headers })
      .subscribe(
        (responseData) => {
          this.messages.push(responseData.messageData);
          this.sortAndSend();
        }
      );
  }

  updateMessage(originalMessage: Message, newMessage: Message) {
    if (!originalMessage || !newMessage) {
      return;
    }

    const pos = this.messages.findIndex(m => m.id === originalMessage.id);
    if (pos < 0) {
      return;
    }

    newMessage.id = originalMessage.id;

    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    
    this.http.put('http://localhost:3000/messages/' + originalMessage.id,
      newMessage, { headers: headers })
      .subscribe(
        (response: Response) => {
          this.messages[pos] = newMessage;
          this.sortAndSend();
        }
      );
  }

  deleteMessage(message: Message) {
    if (!message) {
      return;
    }

    const pos = this.messages.findIndex(m => m.id === message.id);
    if (pos < 0) {
      return;
    }

    this.http.delete('http://localhost:3000/messages/' + message.id)
      .subscribe(
        (response: Response) => {
          this.messages.splice(pos, 1);
          this.sortAndSend();
        }
      );
  }

  sortAndSend() {
    this.messages.sort((a, b) => {
      if (a.subject < b.subject) return -1;
      if (a.subject > b.subject) return 1;
      return 0;
    });
    this.messageChangedEvent.next(this.messages.slice());
  }
}