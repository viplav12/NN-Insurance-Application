import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProductTab } from './product.page';
import { PaymentModePipeModule, PaymentModePipe } from '../_pipes/payment-mode.pipe';
import { CurrencyPipe } from '@angular/common';
import { allInsurance } from '../_dummy-data/all-insurance';
import { of, BehaviorSubject } from 'rxjs';
import { userInsurance } from '../_dummy-data/product-data';

describe('ProductTab', () => {
  let component: ProductTab;
  let fixture: ComponentFixture<ProductTab>;

  const dataServiceStub = {
    getAllInsurance: () => {
      return allInsurance;
    },
    setUserInsuranceData: (data) => {
      return of(data);
    },
    userInsurance: new BehaviorSubject([{
      icon: 'car',
      id: 1001,
      name: 'Car insurance',
      price: 90,
      term: 'monthly'
    }]).asObservable(),

  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductTab],
      imports: [IonicModule.forRoot(), PaymentModePipeModule],
      providers: [PaymentModePipe],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductTab);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.insuranceData = [];
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
