import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BuyTab } from './buy.page';
import { DataService } from '../_services/data.service';
import { CartService } from '../_services/cart.service';
import { allInsurance } from '../_dummy-data/all-insurance';
import { of, BehaviorSubject } from 'rxjs';
import { PaymentModePipeModule, PaymentModePipe } from '../_pipes/payment-mode.pipe';
import { RouterTestingModule } from '@angular/router/testing';
import { CurrencyPipe } from '@angular/common';

describe('BuyTab', () => {
  let component: BuyTab;
  let fixture: ComponentFixture<BuyTab>;

  const dataServiceStub = {
    getAllInsurance: () => {
      return allInsurance;
    },
    setUserInsuranceData: () => {
      return of([{
        icon: 'car',
        id: 1001,
        name: 'Car insurance',
        price: 90,
        term: 'monthly'
      }]);
    },
    userInsurance: new BehaviorSubject([{
      icon: 'home',
      id: 1002,
      name: 'Home insurance',
      price: 50,
      term: 'monthly',
    }]).asObservable(),

  };
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
      }]).asObservable(),
    updateCart: (data, doAdd) => {
      return of([{
        icon: 'home',
        id: 1002,
        name: 'Home insurance',
        price: 50,
        term: 'monthly',
      },
      data]);
    },
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BuyTab],
      imports: [IonicModule.forRoot(), PaymentModePipeModule, RouterTestingModule.withRoutes([])],
      providers: [
        PaymentModePipe,
        CurrencyPipe,
        { provide: DataService, useValue: dataServiceStub },
        { provide: CartService, useValue: cartServiceStub },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BuyTab);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should loadInitData', () => {
    component.loadInitData();
    expect(component.insuranceData).toBe(allInsurance);
  });

  it('should loadCart', () => {
    component.loadCart();
    cartServiceStub.cart.subscribe((data) => {
      expect(component.cartData).toBe(data);
    });
  });
  it('should addInsurance if new card', () => {
    const newCard = {
      icon: 'car',
      id: 1001,
      name: 'Car insurance',
      price: 90,
      term: 'monthly',
    };
    component.addInsurance(newCard);
    dataServiceStub.userInsurance.subscribe(() => {
      const updatedData = [{
        icon: 'home',
        id: 1002,
        name: 'Home insurance',
        price: 50,
        term: 'monthly',
      },
      newCard];
      expect(component.cartData).toEqual(updatedData);
    });
  });

});
