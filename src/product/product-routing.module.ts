import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartShopingComponent } from './cart-shoping/cart-shoping.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { ProdectDetailsComponent } from './prodect-details/prodect-details.component';
import { ProdectFilterComponent } from './prodect-filter/prodect-filter.component';
const routes: Routes = [
  { path: 'details/:ID', component: ProdectDetailsComponent },
  { path: 'productfilter', component: ProdectFilterComponent },
  { path: 'cart', component: CartShopingComponent },
  { path: 'wishlist', component: FavoriteComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes), HttpClientModule],
  exports: [RouterModule],
})
export class ProductRoutingModule {}
