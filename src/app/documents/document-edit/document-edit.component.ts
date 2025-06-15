import { Component, OnInit } from '@angular/core';
import { Document } from '../document.model';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-document-edit',
  standalone: false,
  templateUrl: './document-edit.component.html',
  styleUrl: './document-edit.component.css'
})
export class DocumentEditComponent implements OnInit {
  originalDocument: Document;
  document: Document;
  editMode: boolean = false;

  constructor(
    private documentService: DocumentService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const id = params['id'];

      if (!id) {
        this.editMode = false;
        this.document = new Document('', '', '', '', null);
        return;
      }

      this.originalDocument = this.documentService.getDocument(id);

      if (!this.originalDocument) {
        return;
      }

      this.editMode = true;

      this.document = JSON.parse(JSON.stringify(this.originalDocument));
    });
  }

  onSubmit(form: NgForm) {
    const value = form.value;

    if (this.editMode) {
      const newDocument = new Document(
      this.originalDocument.id,
      value.name,
      value.description,
      value.url,
      null
    );
    this.documentService.updateDocument(this.originalDocument, newDocument);
    } else {
      const newDocument = new Document(
      null,
      value.name,
      value.description,
      value.url,
      null
      );
      this.documentService.addDocument(newDocument);
    }

    this.router.navigate(['/documents']);
  }

  onCancel() {
    this.router.navigate(['/documents']);
  }
}
