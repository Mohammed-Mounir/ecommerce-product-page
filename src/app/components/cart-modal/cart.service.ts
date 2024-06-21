import { Injectable } from '@angular/core';
import { IProduct } from '../../models/product';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartProducts: IProduct[] = [];
  private cartProductsSubject: Subject<IProduct[]> = new Subject<IProduct[]>();

  getCartProducts() {
    return this.cartProductsSubject;
  }

  updateCartProducts(product: IProduct) {
    let updatedCartProducts: IProduct[] = this.cartProducts.slice();

    const existingProductIdx = updatedCartProducts.findIndex(
      (p) => p?.id === product.id
    );

    if (existingProductIdx >= 0) {
      if (product.quantity === 0) {
        updatedCartProducts = updatedCartProducts.filter(
          (_, idx) => idx !== existingProductIdx
        );
      } else {
        updatedCartProducts = updatedCartProducts.map((p, idx) =>
          idx === existingProductIdx ? product : p
        );
      }
    } else {
      updatedCartProducts.push(product);
    }

    this.cartProducts = updatedCartProducts;
    this.cartProductsSubject.next(this.cartProducts);
  }

  removeProductFromCart(id: number) {
    this.cartProducts = this.cartProducts.filter((p) => p.id !== id);
    this.cartProductsSubject.next(this.cartProducts);
  }
}
