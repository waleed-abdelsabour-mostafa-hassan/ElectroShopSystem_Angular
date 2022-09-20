import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { CategorysComponent } from './Category/categorys/categorys.component';
import { EditCategoryComponent } from './Category/edit-category/edit-category.component';
import { SubcategorysComponent } from './SubCategory/subcategorys/subcategorys.component';
import { AddCategoryComponent } from './Category/add-category/add-category.component';
import { AddSubcategoryComponent } from './SubCategory/add-subcategory/add-subcategory.component';
import { EditSubcategoryComponent } from './SubCategory/edit-subcategory/edit-subcategory.component';
import { AddProductComponent } from './Product/add-product/add-product.component';
import { EditProductComponent } from './Product/edit-product/edit-product.component';
import { ProductsComponent } from './Product/products/products.component';
import { AddUserComponent } from './Useres_and_Role/add-user/add-user.component';
import { EditUserRoleComponent } from './Useres_and_Role/edit-user-role/edit-user-role.component';
import { UserRolesComponent } from './Useres_and_Role/user-roles/user-roles.component';
import { UsersComponent } from './Useres_and_Role/users/users.component';
import { ProductsapproveComponent } from './ProductsApprove/productsapprove/productsapprove.component';
import { ProductImagesComponent } from './Product/product-images/product-images.component';
import { OrdersComponent } from './OrderAdmin/orders/orders.component';
import { OrderUserComponent } from './OrderAdmin/order-user/order-user.component';
import { OrderStatusComponent } from './OrderAdmin/order-status/order-status.component';
import { PrintreprtorderComponent } from './OrderAdmin/printreprtorder/printreprtorder.component';
import { NgxPrintModule } from 'ngx-print';
import { HomedashComponent } from './dashboard/homedash/homedash.component';
import { Ng2OrderModule } from 'ng2-order-pipe';


@NgModule({
  declarations: [

    DashboardComponent,
    UsersComponent,
    AddUserComponent,
    UserRolesComponent,
    EditUserRoleComponent,
    ProductsComponent,
    AddProductComponent,
    EditProductComponent,
    CategorysComponent,
    AddCategoryComponent,
    EditCategoryComponent,
    SubcategorysComponent,
    AddCategoryComponent,
    AddSubcategoryComponent,
    EditSubcategoryComponent,
    ProductsapproveComponent,
    ProductImagesComponent,
    OrdersComponent,
    OrderUserComponent,

    OrderStatusComponent,
    PrintreprtorderComponent,
    HomedashComponent




  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatDialogModule,
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
    NgxPrintModule,
    Ng2OrderModule

  ]
})
export class AdminModule { }
