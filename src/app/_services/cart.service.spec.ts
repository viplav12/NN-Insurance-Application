import { TestBed } from '@angular/core/testing';

import { CartService } from './cart.service';

describe('CartService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CartService = TestBed.get(CartService);
    expect(service).toBeTruthy();
  });
  it('should update cart', () => {
    const service: CartService = TestBed.get(CartService);
    const cart = [{
      icon: 'home',
      id: 1002,
      name: 'Home insurance',
      price: 50,
      term: 'monthly',
    }];
    service.updateCart(cart);
    expect(service.cartData.value).toEqual(cart);
  });
});
