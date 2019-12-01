import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'product',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../productTab/product.module').then(m => m.ProductTabModule)
          }
        ]
      },
      {
        path: 'buy',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../buyTab/buy.module').then(m => m.BuyTabModule)
          }
        ]
      },
      {
        path: 'cart',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../cartTab/cart.module').then(m => m.CartTabModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/product',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/product',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
