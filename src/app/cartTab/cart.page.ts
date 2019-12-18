import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { NgRedux } from '@angular-redux/store';
import { Insurance } from '../_models/insurance.model';
import { CartService } from '../_services/cart.service';
import { AppActions } from '../app.action';
import { INITIAL_STATE } from '../app.store';

@Component({
  selector: 'app-cart',
  templateUrl: 'cart.page.html',
  styleUrls: ['cart.page.scss']
})
export class CartTab implements OnInit {

  pageTitle = 'Cart';
  pageInfo = 'BUY INSURANCES';
  insuranceData: Insurance[];
  purchaseAmount = 0;

  constructor(
    private redux: NgRedux<Insurance[]>,
    private actions: AppActions,
    private alertController: AlertController,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    this.cartService.cart.subscribe((cart: Insurance[]) => {
      this.insuranceData = cart.map(data => {
        return data;
      });
      this.calculatePurchaseAmount();
    });
  }

  removeInsurance(data: Insurance) {
    const index: number = this.insuranceData.indexOf(data);
    if (index !== -1) {
      this.insuranceData.splice(index, 1);
      this.calculatePurchaseAmount();
    }
  }

  calculatePurchaseAmount() {
    this.purchaseAmount = 0;
    this.insuranceData.forEach((insurance: Insurance) => {
      this.purchaseAmount = this.purchaseAmount + insurance.price;
    });
  }

  checkout() {
    if (this.insuranceData.length === 0) {
      this.emptyCartAlert();
    } else {
      this.confirmPurchase();
    }
  }

  async emptyCartAlert() {
    const alert = await this.alertController.create({
      message: 'Your cart is empty!!',
      buttons: ['OK'],
    });

    await alert.present();
  }

  async confirmPurchase() {
    const alert = await this.alertController.create({
      message: 'Please confirm your purchase!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Confirm',
          role: 'confirm',
          cssClass: 'primary'
        }
      ]
    });

    await alert.present();
    const result = await alert.onDidDismiss();
    this.makePurchase(result.role);
  }

  makePurchase(confirmation) {
    if (confirmation === 'confirm') {
      this.redux.dispatch(this.actions.setInsurance(this.insuranceData));
      this.cartService.updateCart([]);
    }
  }
}
