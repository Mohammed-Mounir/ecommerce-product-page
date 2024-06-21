import { Component, Input } from '@angular/core';
import { IProduct } from '../../models/product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-image',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-image.component.html',
  styleUrl: './view-image.component.css',
})
export class ViewImageComponent {
  @Input() product!: IProduct;
  @Input() currentImage!: string;
  @Input() displayViewImage?: () => void;
  @Input() displayImage!: (idx: number) => void;

  openImageViewer(event: any) {
    event.stopPropagation();
    this.displayViewImage?.();
  }

  selectImageToView(event: any, index: number) {
    event.stopPropagation();
    this.displayImage(index);
  }

  prevImage(event?: any) {
    event?.stopPropagation();
    const imageIdx = this.product.images.findIndex(
      (img) => img === this.currentImage
    );

    const updatedImageIdx =
      imageIdx === 0 ? this.product.images.length - 1 : imageIdx - 1;
    this.selectImageToView(event, updatedImageIdx);
  }

  nextImage(event?: any) {
    event?.stopPropagation();

    const imageIdx = this.product.images.findIndex(
      (img) => img === this.currentImage
    );

    const updatedImageIdx =
      imageIdx === this.product.images.length - 1 ? 0 : imageIdx + 1;
    this.selectImageToView(event, updatedImageIdx);
  }
}
