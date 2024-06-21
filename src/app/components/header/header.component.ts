import { CommonModule } from '@angular/common';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { CartModalComponent } from '../cart-modal/cart-modal.component';
import { IProduct } from '../../models/product';
import { Subscription } from 'rxjs';
import { CartService } from '../cart-modal/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, CartModalComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit, OnDestroy {
  isOpenDrawer = false;
  isOpenCart = false;
  cartProducts: IProduct[] = [];
  private cartSubscription: Subscription | undefined;
  quantity = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartSubscription = this.cartService
      .getCartProducts()
      .subscribe((products: IProduct[]) => {
        this.cartProducts = products;
        this.quantity = products.reduce(
          (acc, curr) => (curr.quantity || 0) + acc,
          0
        );
      });
  }

  ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  toggleOpenCart() {
    this.isOpenCart = !this.isOpenCart;
  }

  openDrawer() {
    this.isOpenDrawer = true;
  }

  closeDrawer() {
    this.isOpenDrawer = false;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    const isMobile = event.target.innerWidth < 768;
    if (!isMobile) this.closeDrawer();
  }
}
