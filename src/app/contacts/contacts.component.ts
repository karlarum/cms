import { Component, OnInit } from '@angular/core';
import { Contact } from './contact-list/contact.model';

@Component({
  selector: 'cms-contacts',
  standalone: false,
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css'
})
export class ContactsComponent {
  selectedContact: Contact;

  constructor() { }

  ngOnInit(): void {
  }
}
