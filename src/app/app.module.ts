import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from 'src/auth/auth.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SellerModule } from 'src/seller/seller.module';
import {MatDialogModule} from '@angular/material/dialog';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProductModule } from 'src/product/product.module';
import { GalleryModule } from 'ng-gallery';
import { AcessDeniedComponent } from './acess-denied/acess-denied.component';
import { AdminModule } from 'src/admin/admin.module';
import { ReactiveFormsModule, FormsModule, NgModel } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

import {MatMenuModule} from '@angular/material/menu';

import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {MatIconModule} from '@angular/material/icon';
import { NgToastModule } from 'ng-angular-popup';
import { UploadImgComponent } from './upload-img/upload-img.component';
import { OrderDaitelsComponent } from './Order/order-daitels/order-daitels.component';
import { MyOrderComponent } from './Order/my-order/my-order.component';
import { NgxPrintModule } from 'ngx-print';
import { OrderTrackingComponent } from './Order/order-tracking/order-tracking.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { DeliveryComponent } from './delivery/delivery.component';
@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    PageNotFoundComponent,
    AcessDeniedComponent,
    UploadImgComponent,
    MyOrderComponent,
    OrderDaitelsComponent,
    OrderTrackingComponent,
    DeliveryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    AuthModule,
    SellerModule,
     MatDialogModule,
    CarouselModule,
    NgxPaginationModule,
    ProductModule,
    AdminModule,
    MatMenuModule,
    MatIconModule,
    NgToastModule ,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatAutocompleteModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    SellerModule,NgxPrintModule,Ng2SearchPipeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
