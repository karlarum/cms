import { Component, OnInit } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-list',
  standalone: false,
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.css'
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [
    new Message(
      '1',
      'Letter',
      'Please read this letter.',
      'John Jackson'
    ),
    new Message(
      '2',
      'Assignment',
      'When is the assignment due date?',
      'Stacy Smith'
    ),
    new Message(
      '3',
      'Semester',
      'When does the semester start?',
      'Morgan Meyer'
    )
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onAddMessage(message: Message) {
    this.messages.push(message);
  }
}
