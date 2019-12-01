import { TestBed } from '@angular/core/testing';

import { DataService } from './data.service';
import { allInsurance } from '../_dummy-data/all-insurance';

describe('DataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataService = TestBed.get(DataService);
    expect(service).toBeTruthy();
  });

  it('should return all insurances', () => {
    const service: DataService = TestBed.get(DataService);
    const insurances = service.getAllInsurance();
    expect(insurances).toBe(allInsurance);
  });

  it('should set user insurances', () => {
    const service: DataService = TestBed.get(DataService);
    const insurance = [{
      icon: 'car',
      id: 1001,
      name: 'Car insurance',
      price: 90,
      term: 'monthly'
    }];
    service.setUserInsuranceData(insurance);

    service.userInsuranceData.subscribe((data) => {
      expect(data).toBe(insurance);
    });
  });
});
