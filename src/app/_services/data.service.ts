import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Insurance } from '../_models/insurance.model';
import { allInsurance } from '../_dummy-data/all-insurance';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor() { }
  userInsuranceData = new BehaviorSubject([]);
  userInsurance = this.userInsuranceData.asObservable();

  getAllInsurance() {
    return allInsurance;
  }
  setUserInsuranceData(insurance: Insurance[]) {
    this.userInsuranceData.next(insurance);
  }
}
