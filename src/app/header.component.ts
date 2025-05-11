import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'cms-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Output() selectedFeatureEvent = new EventEmitter<string>();
  
  onSelect(selectedEvent: string) {
    this.selectedFeatureEvent.emit(selectedEvent);
  }
}
