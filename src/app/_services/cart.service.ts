import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  cartData = new BehaviorSubject([]);
  cart = this.cartData.asObservable();

  updateCart(cart) {
    this.cartData.next(cart);
  }
}
