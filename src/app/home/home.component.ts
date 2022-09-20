import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Product } from 'src/@electronic/model/Product';
import { CartService } from 'src/@electronic/services/cart.service';
import { CryptService } from 'src/@electronic/services/crypt.service';
import { HomeService } from 'src/@electronic/services/home.service';
import { LoginComponent } from 'src/auth/login/login.component';
import { FavoriteProductService } from 'src/Services/favorite-product.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  errorMSG = '';
  prodIsFavorite: any;
  errorfavo: any;
  constructor(
    public dialog: MatDialog,
    private homeServec: HomeService,
    private rout: Router,
    private cardService: CartService,
    private tost: NgToastService,
    private favoProd: FavoriteProductService,
    private crypt: CryptService
  ) {}

  gotoProductDetails = (ID: Number) => {
    this.rout.navigate(['/product/details/', ID]);
  };
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
  pages!: number;
  itemsPerPage = 5;
  curr: number = 1;
  totalitems!: number;
  Phones!: Product[];
  Accessories!: Product[];
  Labtops!: Product[];
  ProductsNew!: Product[];
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: true,
    dots: true,
    autoplay: true,
    autoplayTimeout: 2000,
    autoplaySpeed: 1000,

    navSpeed: 700,
    navText: [
      '<i class="fa fa-chevron-left"></i>',
      '<i class="fa fa-chevron-right"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 4,
      },
    },
    nav: true,
  };

  customOptions2: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: true,
    dots: true,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplaySpeed: 1000,

    navSpeed: 700,
    navText: [
      '<i class="fa fa-chevron-left"></i>',
      '<i class="fa fa-chevron-right"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 4,
      },
    },
    nav: true,
  };
  customOptions3: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: true,
    dots: true,
    autoplay: true,
    autoplayTimeout: 4000,
    autoplaySpeed: 1000,

    navSpeed: 700,
    navText: [
      '<i class="fa fa-chevron-left"></i>',
      '<i class="fa fa-chevron-right"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 4,
      },
    },
    nav: true,
  };
  customOptions4: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: true,
    dots: true,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplaySpeed: 1000,

    navSpeed: 700,
    navText: [
      '<i class="fa fa-chevron-left"></i>',
      '<i class="fa fa-chevron-right"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 4,
      },
    },
    nav: true,
  };

  removeFavoritProduct(faviID: number) {
    this.favoProd.deleteFavoriteProduct(faviID).subscribe(
      (data) => {
        this.errorMSG = data;
        this.changecountfav();
        this.GetAllPhones();
        this.GetAllLabtops();
        this.GetAllAccessories();
        this.GetAllProductsNew();
      },
      (err) => {
        this.errorMSG = err;
      }
    );
  }
  addNewFavoritProduct(favProdiID: number) {
    if (localStorage.getItem('token')) {
      this.favoProd.addnew(favProdiID, this.userID).subscribe((data) => {
        this.changecountfav();
        this.GetAllPhones();
        this.GetAllLabtops();
        this.GetAllAccessories();
        this.GetAllProductsNew();
      });
    } else {
      this.ngLogin();
    }
  }

  userID = '';
  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      var token = JSON.parse(
        this.crypt.Decrypt(localStorage.getItem('token')!)
      );
      this.userID = token.id;
    }

    this.GetAllPhones();
    this.GetAllLabtops();
    this.GetAllAccessories();
    this.GetAllProductsNew();
  }
  GoMovie(id: number) {
    this.rout.navigate(['movieDetails', id]);
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

  GetAllPhones() {
    this.homeServec.GetAllPhones(this.userID).subscribe((e) => {
      this.Phones = e;
    });
  }

  GetAllLabtops() {
    this.homeServec.GetAllLabtops(this.userID).subscribe((e) => {
      this.Labtops = e;
    });
  }

  GetAllAccessories() {
    this.homeServec.GetAllAccessories(this.userID).subscribe((e) => {
      this.Accessories = e;
    });
  }

  GetAllProductsNew() {
    this.homeServec.GetAllProductsNew().subscribe((e) => {
      this.ProductsNew = e;
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
export interface Movie {
  moviePost: string;
  id: number;
  movieName: string;
  movieYear: string;
  quality: string;
}
export interface UserData {
  id: string;
  name: string;
  progress: string;
  fruit: string;
}
