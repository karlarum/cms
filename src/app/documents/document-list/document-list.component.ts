import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Document } from '../document.model';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'cms-document-list',
  standalone: false,
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css'
})
export class DocumentListComponent implements OnInit {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  documents: Document[] = [
    new Document(
      '1',
      'Project Proposal',
      'Initial draft of the 2025 innovation grant proposal.',
      'https://files.example.com/proposal.pdf',
      null
    ),
    new Document(
      '2',
      'Meeting Minutes - April',
      'Summary of decisions and action items from the April team meeting.',
      'https://files.example.com/minutes-april.docx',
      null
    ),
    new Document(
      '3',
      'Budget Overview',
      'Q1 financial breakdown for internal review.',
      'https://files.example.com/budget-q1.xlsx',
      null
    ),
    new Document(
      '4',
      'UX Research Findings',
      'Key insights and data from user experience testing.',
      'https://files.example.com/ux-research.pdf',
      null
    ),
    new Document(
      '5',
      'Marketing Strategy 2025',
      'Outline of planned campaigns and outreach strategies.',
      'https://files.example.com/marketing2025.pptx',
      null
    )
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }
}
