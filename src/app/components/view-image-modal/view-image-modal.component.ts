import { CommonModule } from '@angular/common';
import { Component, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-view-image-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-image-modal.component.html',
  styleUrl: './view-image-modal.component.css',
})
export class ViewImageModalComponent {
  @Input() template!: TemplateRef<any>;
  @Input() displayViewImage!: (display: boolean) => void;
}
