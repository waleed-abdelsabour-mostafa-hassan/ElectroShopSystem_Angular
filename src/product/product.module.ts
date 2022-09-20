import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProdectDetailsComponent } from './prodect-details/prodect-details.component';
import { ProdectFilterComponent } from './prodect-filter/prodect-filter.component';
import { GalleryModule } from 'ng-gallery';
import { CartShopingComponent } from './cart-shoping/cart-shoping.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { NgToastModule } from 'ng-angular-popup';
import { NgxPaginationModule } from 'ngx-pagination';
import { PaymentOnlineComponent } from './payment-online/payment-online.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaymentCachComponent } from './payment-cach/payment-cach.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


@NgModule({
  declarations: [
    ProdectDetailsComponent,
    ProdectFilterComponent,
    CartShopingComponent,
    FavoriteComponent,
    PaymentOnlineComponent,
    PaymentCachComponent
  ],
  imports: [
    CommonModule,
    FormsModule,Ng2SearchPipeModule,
    ProductRoutingModule,GalleryModule,NgToastModule,NgxPaginationModule,ReactiveFormsModule
  ]
})
export class ProductModule { }
