import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCategoryComponent } from './Category/add-category/add-category.component';
import { CategorysComponent } from './Category/categorys/categorys.component';
import { EditCategoryComponent } from './Category/edit-category/edit-category.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomedashComponent } from './dashboard/homedash/homedash.component';
import { OrdersComponent } from './OrderAdmin/orders/orders.component';
import { AddProductComponent } from './Product/add-product/add-product.component';
import { EditProductComponent } from './Product/edit-product/edit-product.component';
import { ProductImagesComponent } from './Product/product-images/product-images.component';
import { ProductsComponent } from './Product/products/products.component';
import { ProductsapproveComponent } from './ProductsApprove/productsapprove/productsapprove.component';
import { AddSubcategoryComponent } from './SubCategory/add-subcategory/add-subcategory.component';
import { EditSubcategoryComponent } from './SubCategory/edit-subcategory/edit-subcategory.component';
import { SubcategorysComponent } from './SubCategory/subcategorys/subcategorys.component';
import { AddUserComponent } from './Useres_and_Role/add-user/add-user.component';
import { EditUserRoleComponent } from './Useres_and_Role/edit-user-role/edit-user-role.component';
import { UserRolesComponent } from './Useres_and_Role/user-roles/user-roles.component';
import { UsersComponent } from './Useres_and_Role/users/users.component';


const routes: Routes = [
  {path:'dashboard',component:DashboardComponent,
  children:[
    {path:'adduser',component:AddUserComponent},
    {path:'userRoles',component:UserRolesComponent},
    {path:'users',component:UsersComponent},
    {path:'products',component:ProductsComponent},
    {path:'edituserRole/:userId/:roleId',component:EditUserRoleComponent},
    {path:'AddProduct',component:AddProductComponent},
    {path:'categorys',component:CategorysComponent},
    {path:'subcategorys',component:SubcategorysComponent},
    {path:'addcategory',component:AddCategoryComponent},
    {path:'editcategory/:id',component:EditCategoryComponent},
    {path:'addsubcategory',component:AddSubcategoryComponent},
    {path:'editsubcategory/:id',component:EditSubcategoryComponent},
    {path:'EditProduct/:id',component:EditProductComponent},
    {path:'ProductImages/:id',component:ProductImagesComponent},
    {path:'productsApprove',component:ProductsapproveComponent},
    {path:'orders',component:OrdersComponent},
    {path:'homedash',component:HomedashComponent},
]
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
