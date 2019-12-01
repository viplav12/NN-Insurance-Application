import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CartTab } from './cart.page';
import { PaymentModePipeModule } from '../_pipes/payment-mode.pipe';
import { CurrencyPipe } from '@angular/common';
import { NgRedux } from '@angular-redux/store';
import { AppActions } from '../app.action';
import { BehaviorSubject, of } from 'rxjs';

describe('CartTab', () => {
  let component: CartTab;
  let fixture: ComponentFixture<CartTab>;

  const cartServiceStub = {
    cartData: () => {
      return of({
        icon: 'home',
        id: 1002,
        name: 'Home insurance',
        price: 50,
        term: 'monthly',
      });
    },
    cart: new BehaviorSubject([{
        icon: 'home',
        id: 1002,
        name: 'Home insurance',
        price: 50,
        term: 'monthly',
      },
      {
        icon: 'car',
        id: 1001,
        name: 'Car insurance',
        price: 90,
        term: 'monthly',
      }]).asObservable()
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CartTab],
      imports: [IonicModule.forRoot(), PaymentModePipeModule],
      providers: [NgRedux, AppActions],
    }).compileComponents();

    fixture = TestBed.createComponent(CartTab);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should loadCart', () => {
    component.loadCart();
    const newInsurance = [{
      icon: 'home',
      id: 1002,
      name: 'Home insurance',
      price: 50,
      term: 'monthly',
    },
    {
      icon: 'car',
      id: 1001,
      name: 'Car insurance',
      price: 90,
      term: 'monthly',
    }];
    cartServiceStub.cart.subscribe((data) => {
      expect(data).toEqual(newInsurance);
    });
  });

  it('should calculatePurchaseAmount', () => {
    component.insuranceData = [{
      icon: 'home',
      id: 1002,
      name: 'Home insurance',
      price: 50,
      term: 'monthly',
    },
    {
      icon: 'car',
      id: 1001,
      name: 'Car insurance',
      price: 10,
      term: 'monthly',
    }];
    component.calculatePurchaseAmount();
    expect(component.purchaseAmount).toBe(60);
  });

  it('should removeInsurance', () => {
    component.insuranceData = [
      {
        icon: 'home',
        id: 1002,
        name: 'Home insurance',
        price: 50,
        term: 'monthly',
      },
      {
        icon: 'car',
        id: 1001,
        name: 'Car insurance',
        price: 90,
        term: 'monthly',
      }
    ];
    const removeObj = {
      icon: 'car',
      id: 1001,
      name: 'Car insurance',
      price: 90,
      term: 'monthly',
    };
    component.loadCart();
    component.removeInsurance(removeObj);
    expect(component.insuranceData.length).toEqual(0);
  });

});
