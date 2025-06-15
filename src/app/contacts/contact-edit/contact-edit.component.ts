import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Contact } from '../contact-list/contact.model';
import { ContactService } from '../contact.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';


@Component({
  selector: 'cms-contact-edit',
  standalone: false,
  templateUrl: './contact-edit.component.html',
  styleUrl: './contact-edit.component.css'
})
export class ContactEditComponent implements OnInit {
  contact: Contact;
  groupContacts: Contact[] = [];
  originalContact: Contact;
  editMode: boolean = false;
  id: string;

  constructor(
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const id = params['id'];

      if (!id) {
        this.editMode = false;
        this.contact = new Contact('', '', '', '', '', null);
        return;
      }

      this.originalContact = this.contactService.getContact(id);

      if (!this.originalContact) {
        return;
      }

      this.editMode = true;
      this.contact = JSON.parse(JSON.stringify(this.originalContact));

      if (this.contact.group) {
        this.groupContacts = JSON.parse(JSON.stringify(this.contact.group));
      }
    });
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    
    if (this.editMode) {
      const newContact = new Contact(
        this.originalContact.id,
        value.name,
        value.email,
        value.phone,
        value.imageUrl,
        this.groupContacts
      );
      this.contactService.updateContact(this.originalContact, newContact);
    } else {
      const newContact = new Contact(
        null,
        value.name,
        value.email,
        value.phone,
        value.imageUrl,
        this.groupContacts
      );
      this.contactService.addContact(newContact);
    }

    this.router.navigate(['/contacts']);
  }

  onCancel() {
    this.router.navigate(['/contacts']);
  }

  addToGroup(event: CdkDragDrop<Contact[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const selectedContact: Contact = event.item.data;
      const invalidGroupContact = this.isInvalidContact(selectedContact);
      if (invalidGroupContact) {
        return;
      }
      this.groupContacts.push(selectedContact);
    }
  }

  isInvalidContact(newContact: Contact): boolean {
    if (!newContact) {
      return true;
    }

    if (this.contact && newContact.id === this.contact.id) {
      return true;
    }

    for (let i = 0; i < this.groupContacts.length; i++) {
      if (newContact.id === this.groupContacts[i].id) {
        return true;
      }
    }

    return false;
  }

  onRemoveItem(index: number) {
    if (index < 0 || index >= this.groupContacts.length) {
      return;
    }
    this.groupContacts.splice(index, 1);
  }
}
