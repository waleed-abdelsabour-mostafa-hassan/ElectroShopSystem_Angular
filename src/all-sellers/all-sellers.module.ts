import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllSellersRoutingModule } from './all-sellers-routing.module';
import { SellersComponent } from './sellers/sellers.component';
import { ProductBySellerComponent } from './product-by-seller/product-by-seller.component';


@NgModule({
  declarations: [
    SellersComponent,
    ProductBySellerComponent
  ],
  imports: [
    CommonModule,
    AllSellersRoutingModule
  ]
})
export class AllSellersModule { }
