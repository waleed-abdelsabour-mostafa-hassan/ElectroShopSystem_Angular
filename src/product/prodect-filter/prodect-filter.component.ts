import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { CategoryModel } from 'src/@electronic/model/category';
import { Product } from 'src/@electronic/model/Product';
import { SubCategory } from 'src/@electronic/model/subcategory';
import { CartService } from 'src/@electronic/services/cart.service';
import { CategoryService } from 'src/@electronic/services/category.service';
import { CryptService } from 'src/@electronic/services/crypt.service';
import { HomeService } from 'src/@electronic/services/home.service';
import { ProductService } from 'src/@electronic/services/product.service';
import { SubcategoryService } from 'src/@electronic/services/subcategory.service';
import { LoginComponent } from 'src/auth/login/login.component';
import { FavoriteProductService } from 'src/Services/favorite-product.service';

@Component({
  selector: 'app-prodect-filter',
  templateUrl: './prodect-filter.component.html',
  styleUrls: ['./prodect-filter.component.scss'],
})
export class ProdectFilterComponent implements OnInit {
  constructor(
    private service: ProductService,
    private cardService: CartService,
    private tost: NgToastService,
    private rout: Router,
    private favoProd: FavoriteProductService,
    private homeServece: HomeService,
    private crypt: CryptService,
    private categoryservec: CategoryService,
    private subcategory: SubcategoryService,
    public dialog: MatDialog
  ) {}
  pages!: number;
  itemsPerPage = 6;
  curr: number = 1;
  totalitems!: number;
  products!: Product[];
  errorMSG: any;
  categorys!: CategoryModel[];
  subcategorys!: SubCategory[];
  search:any;
  gotoProductDetails = (ID: Number) => {
    this.rout.navigate(['/product/details/', ID]);
  };
  removeFavoritProduct(faviID: number) {
    this.favoProd.deleteFavoriteProduct(faviID).subscribe(
      (data) => {
        this.errorMSG = data;
        this.changecountfav();
      },
      (err) => {
        this.errorMSG = err;
      }
    );
  }
  addNewFavoritProduct(favProdiID: number) {
    if(localStorage.getItem('token')){

    this.favoProd.addnew(favProdiID,this.userID).subscribe(e=>{
       this.changecountfav();

    });
  }else{


    this.ngLogin(); }

  }
  userID="";
  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      var token = JSON.parse(
        this.crypt.Decrypt(localStorage.getItem('token')!)
      );
      this.userID = token.id;
    }

    this.GetAllCategory();
    this.getAllproducts();
    this.changecountfav();
  }
  getAllproducts() {
    this.service.GetAllProductsFilter(this.userID).subscribe((e) => {
      this.products = e;
    });
  }
  GetAllSubCategory() {
    this.subcategory.GetAllSubCategory().subscribe((e) => {
      this.subcategorys = e;
    });
  }

  GetAllCategory() {
    this.categoryservec.GetAllCategory().subscribe((e) => {
      this.categorys = e;
      console.log(e);
    });
  }
  addcart(idproduct: number) {
    if (localStorage.getItem('token')) {
      this.cardService.AddCart(idproduct, this.userID).subscribe(
        (e) => {
          this.countitemcard();
          this.tost.success({
            detail: 'Shopping Cart',
            summary: e,
            duration: 2000,
          });
        },
        (err) => {
          this.tost.error({
            detail: 'Shopping Cart',
            summary: err,
            duration: 2000,
          });
        }
      );
    } else {
      this.ngLogin();
    }
  }

  countitemcard() {
    this.cardService.CountCart(this.userID).subscribe((e) => {
      this.cardService.changeNav(e);
    });
  }

  changecountfav() {
    this.favoProd.getCountOfFavoriteProduct(this.userID).subscribe(
      (data) => {
        this.favoProd.changeNav(data);
      },
      (err) => {
        this.errorMSG = err;
      }
    );
  }

  GetChangCaty(id: number) {
    this.homeServece.ByIdCateoryAllPoduc(id, this.userID).subscribe((e) => {
      this.products = e;
    });
    this.homeServece.GetAllSubCategoryByIdCaty(id).subscribe((e) => {
      this.subcategorys = e;
    });
  }

  GetBySubAllProducts(id: number) {
    this.homeServece
      .GetAllProductByIdSubCategory(id, this.userID)
      .subscribe((e) => {
        this.products = e;
      });
  }

  ngLogin() {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '100%',
      // data: {name: this.name, animal: this.animal},
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }
}
