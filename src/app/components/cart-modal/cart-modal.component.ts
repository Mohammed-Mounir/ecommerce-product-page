import { Component, Input } from '@angular/core';
import { IProduct } from '../../models/product';
import { CommonModule } from '@angular/common';
import { CartService } from './cart.service';

@Component({
  selector: 'app-cart-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-modal.component.html',
  styleUrl: './cart-modal.component.css',
})
export class CartModalComponent {
  @Input() cartProducts: IProduct[] = [];

  constructor(private cartService: CartService) {}

  removeProduct(id: number) {
    this.cartService.removeProductFromCart(id);
  }
}
