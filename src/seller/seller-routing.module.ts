import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddProductComponent } from 'src/admin/Product/add-product/add-product.component';
import { EditProductComponent } from 'src/admin/Product/edit-product/edit-product.component';
import { OrderProductComponent } from './profile/order-product/order-product.component';
import { ProfileComponent } from './profile/profile.component';
import { SellerProductComponent } from './profile/seller-product/seller-product.component';

const routes: Routes = [
  {
    path: 'profile',
    component: ProfileComponent,
    children: [
      { path: 'Products', component: SellerProductComponent },
      { path: 'OrderProduct', component: OrderProductComponent },
      { path: 'New', component: AddProductComponent },
      { path: 'edit/:id', component: EditProductComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SellerRoutingModule {}
