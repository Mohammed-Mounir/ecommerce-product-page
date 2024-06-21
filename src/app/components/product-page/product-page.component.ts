import { CommonModule } from '@angular/common';
import { Component, HostListener, inject } from '@angular/core';
import { CartService } from '../cart-modal/cart.service';
import { IProduct } from '../../models/product';
import { ViewImageModalComponent } from '../view-image-modal/view-image-modal.component';
import { ViewImageComponent } from '../view-image/view-image.component';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [CommonModule, ViewImageComponent, ViewImageModalComponent],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css',
})
export class ProductPageComponent {
  cartService: CartService = inject(CartService);
  product: IProduct = {
    id: 0,
    name: 'Fall Limited Edition Sneakers',
    company: 'SNEAKER COMPANY',
    price: 250,
    discount: 50,
    description:
      'These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they’ll withstand everything the weather can offer.',
    images: [
      './assets/images/image-product-1.jpg',
      './assets/images/image-product-2.jpg',
      './assets/images/image-product-3.jpg',
      './assets/images/image-product-4.jpg',
    ],
  };

  imagePosition = 0;
  currentImage = this.product.images[0];
  quantity = 0;
  showViewImageModal = false;

  addProduct() {
    if (this.quantity < 10) this.quantity++;
  }

  removeProduct() {
    if (this.quantity > 0) {
      this.quantity--;
    }
  }

  addToCart() {
    this.cartService.updateCartProducts({
      ...this.product,
      quantity: this.quantity,
    });
  }

  displayImage(index: number) {
    this.currentImage = this.product.images[index];
  }

  prevImage() {
    this.imagePosition =
      this.imagePosition === 0
        ? this.product.images.length - 1
        : this.imagePosition - 1;
  }

  nextImage() {
    this.imagePosition =
      this.imagePosition === this.product.images.length - 1
        ? 0
        : this.imagePosition + 1;
  }

  displayViewImage(display = true) {
    this.showViewImageModal = display;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    const isMobile = event.target.innerWidth < 768;
    if (isMobile) this.showViewImageModal = false;
  }
}
