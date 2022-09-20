import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SellerRoutingModule } from './seller-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { SellerProductComponent } from './profile/seller-product/seller-product.component';
import { OrderProductComponent } from './profile/order-product/order-product.component';
import { GalleryModule } from 'ng-gallery';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    ProfileComponent,
    SellerProductComponent,
    OrderProductComponent,
  ],
  imports: [
    CommonModule,
    SellerRoutingModule,
    NgxPaginationModule,
    GalleryModule,
  ],
})
export class SellerModule {}
