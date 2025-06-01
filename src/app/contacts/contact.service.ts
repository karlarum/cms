import { Injectable, EventEmitter } from '@angular/core';
import { Contact } from './contact-list/contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contacts: Contact[] = [];
  contactSelectedEvent = new EventEmitter<Contact>();

  contactChangedEvent = new EventEmitter<Contact[]>();

  constructor() {
      this.contacts = MOCKCONTACTS;
   }

   getContacts(): Contact[] {
    return this.contacts.slice();
   }

   getContact(id:string): Contact {
    for (let contact of this.contacts) {
      if (contact.id === id) {
        return contact;
      }
    }
    return null;
   }

   deleteContact(contact: Contact) {
     const index = this.contacts.findIndex(c => c.id === contact.id);
     if (index !== -1) {
       this.contacts.splice(index, 1);
       this.contactChangedEvent.emit(this.contacts.slice());
     }
    }
}
