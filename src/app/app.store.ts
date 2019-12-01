import { AppActions } from './app.action';
import { Insurance } from './_models/insurance.model';
import { userInsurance } from './_dummy-data/product-data';

// Interface for ShipmentWeight
export interface ProductCartState {
  productCart: Insurance[];
}

// Initializing interface.
export const INITIAL_STATE: ProductCartState = {
  productCart: userInsurance
};

// Reducer method.
export function rootReducer(lastState: ProductCartState, action): ProductCartState {
  const obj: ProductCartState = { productCart: lastState.productCart };
  switch (action.type) {
    case AppActions.USER_INSURANCE :
      action.insurance.forEach(insurance => {
        obj.productCart.push(insurance);
      });
      return obj;
    default:
      return obj;
  }
}