import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductTab } from './product.page';
import { PaymentModePipeModule } from '../_pipes/payment-mode.pipe';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: ProductTab }]),
    PaymentModePipeModule
  ],
  declarations: [
    ProductTab
  ],
  providers: [CurrencyPipe],
})
export class ProductTabModule {}
