import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Document } from '../document.model';
import { DatePipe } from '@angular/common';
import { DocumentService } from '../document.service';


@Component({
  selector: 'cms-document-list',
  standalone: false,
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css'
})

export class DocumentListComponent implements OnInit, OnDestroy {
  documents: Document[] = [];
  private igChangeSub: Subscription;

  constructor(private documentService: DocumentService) { }

  ngOnInit(): void {
    this.documents = this.documentService.getDocuments();

    this.igChangeSub = this.documentService.documentListChangedEvent.subscribe(
      (documents: Document[]) => {
        this.documents = documents;
      }
    );
  }
  ngOnDestroy(): void {
    this.igChangeSub.unsubscribe();
  }
}
