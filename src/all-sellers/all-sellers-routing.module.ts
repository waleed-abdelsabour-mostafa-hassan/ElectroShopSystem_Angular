import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductBySellerComponent } from './product-by-seller/product-by-seller.component';
import { SellersComponent } from './sellers/sellers.component';

const routes: Routes = [
  {
    path: 'All',
    component: SellersComponent,
  },
  {
    path: 'Produts/:id',
    component: ProductBySellerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllSellersRoutingModule {}
