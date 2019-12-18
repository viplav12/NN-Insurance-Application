import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Insurance } from '../_models/insurance.model';
import { DataService } from '../_services/data.service';
import { CartService } from '../_services/cart.service';

@Component({
  selector: 'app-buy',
  templateUrl: 'buy.page.html',
  styleUrls: ['buy.page.scss']
})
export class BuyTab implements OnInit {

  toast: any;
  pageTitle = 'Buy';
  pageInfo = 'BUY INSURANCES';
  insuranceData: Insurance[];
  cartData: Insurance[];

  constructor(
    private router: Router,
    public toastController: ToastController,
    private dataService: DataService,
    public cartService: CartService
  ) {}

  ngOnInit() {
    this.loadInitData();
    this.loadCart();
  }

  loadInitData() {
    this.insuranceData = this.dataService.getAllInsurance();
  }

  loadCart() {
    this.cartService.cart.subscribe((cart: Insurance[]) => {
      this.cartData = cart.map(data => {
        return data;
      });
    });
  }

  addInsurance(data: Insurance) {
    let userInsurance: Insurance[] = [];
    this.dataService.userInsurance.subscribe((insurance: Insurance[]) => {
      userInsurance = insurance;
      if (!userInsurance.some((value) => value.name === data.name)) {
        if (!this.cartData.some((insuranceData) => insuranceData.name === data.name)) {
          this.cartData.push(data);
          this.cartService.updateCart(this.cartData);
          this.showToast('Product successfully added to cart!', 'success');
        } else {
          this.showToast('This product already added to cart!', 'danger');
        }
      } else {
        this.showToast('You have already bought this insurance!', 'danger');
      }
    });


  }

  async showToast(message: string, toastColor: string) {
    this.router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        this.hideToast();
      }
    });

    try {
      this.toast.dismiss();
    } catch (e) {}

    this.toast = await this.toastController.create({
      message,
      duration: 1500,
      animated: true,
      showCloseButton: true,
      closeButtonText: 'X',
      cssClass: 'custom-toast',
      color: toastColor,
      position: 'bottom'
    });

    this.toast.present();
  }

  async hideToast() {
    if (this.toast !== undefined) {
      this.toast.dismiss();
    }
  }
}
