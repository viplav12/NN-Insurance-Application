import { Injectable } from '@angular/core';
import { Insurance } from './_models/insurance.model';

@Injectable()
export class AppActions {

  static USER_INSURANCE = {};

  /* Method to set current insurance state */
  setInsurance(insuranceData: Insurance[]) {
    return { type: AppActions.USER_INSURANCE, insurance: insuranceData };
  }
}