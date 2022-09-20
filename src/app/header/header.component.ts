import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Subscription } from 'rxjs';
import { CartService } from 'src/@electronic/services/cart.service';
import { CryptService } from 'src/@electronic/services/crypt.service';
import { LoginComponent } from 'src/auth/login/login.component';
import { RegisterComponent } from 'src/auth/register/register.component';
import { CartShopingComponent } from 'src/product/cart-shoping/cart-shoping.component';
import { FavoriteComponent } from 'src/product/favorite/favorite.component';
import { FavoriteProductService } from 'src/Services/favorite-product.service';
import { UserService } from 'src/Services/user.service';
import { UploadImgComponent } from '../upload-img/upload-img.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  subscription: Subscription;

  constructor(
    private favoPro: FavoriteProductService,
    private service: CartService,
    public dialog: MatDialog,
    private tost: NgToastService,
    private userservece: UserService,
    private crypt: CryptService,
    private route: Router
  ) {
    this.subscription = this.service.navItem$.subscribe((message) => {
      this.countProduct = message;
    });
    this.subscription = this.favoPro.navItem$.subscribe((message) => {
      this.CountOfFavoriteProduct = message;
    });
    this.subscription = this.userservece.navItemimg$.subscribe((message) => {
      this.img = message;
    });

    this.subscription = this.userservece.navItem$.subscribe((message) => {
      this.islogin = message;
      this.gettoken();
      this.CountCartpro();
      this.CountFav();
    });
  }
  changimg() {
    const dialogRef = this.dialog.open(UploadImgComponent, {
      height: '45%',
      width: '45%',
      // data: {name: this.name, animal: this.animal},
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }

  gettoken() {
    if (localStorage.getItem('token')) {
      var token = JSON.parse(
        this.crypt.Decrypt(localStorage.getItem('token')!)
      );

      this.img = token.img;
      this.userID = token.id;
      this.name = token.nameUser;
      this.role =
        token.role.toLowerCase() == 'Seller'.toLowerCase() ||
        token.role.toLowerCase() == 'Admin'.toLowerCase();
      this.islogin = true;
      this.roleadmin = token.role.toLowerCase() == 'Admin'.toLowerCase();
      this.roleadelivery= token.role.toLowerCase() == 'Delivery'.toLowerCase();
    }
  }

  public countProduct: number = 0;

  CountOfFavoriteProduct: number = 0;
  errorMSG: any;
  islogin = false;

  img = '';
  name = '';
  role = false;
  roleadmin = false;
  roleadelivery=false;
  userID = '';
  ngOnInit(): void {
    this.gettoken();

    this.CountCartpro();
    this.CountFav();
  }

  CountFav() {
    this.favoPro.getCountOfFavoriteProduct(this.userID).subscribe(
      (data) => {
        this.CountOfFavoriteProduct = data;
      },
      (err) => {
        this.errorMSG = err;
      }
    );
  }

  CountCartpro() {
    this.service.CountCart(this.userID).subscribe((e) => {
      this.countProduct = e;
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

  getfavier() {
    this.tost.success({ detail: 'ff', summary: 'gg' });
  }
  ngLogOut() {
    this.userservece.Logout();
    this.islogin = false;
    this.countProduct = 0;
    this.CountOfFavoriteProduct = 0;
    location.href = 'home';
  }
  ngSignup() {
    const dialogRef = this.dialog.open(RegisterComponent, {
      width: '100%',
      // data: {name: this.name, animal: this.animal},
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }

  gocart() {
    if (!localStorage.getItem('token')) {
      this.ngLogin();
    } else {
      const dialogRef = this.dialog.open(CartShopingComponent, {
        width: '100%',
        // data: {name: this.name, animal: this.animal},
      });

      dialogRef.afterClosed().subscribe((result) => {
        console.log('The dialog was closed');
        // this.animal = result;
      });
    }
  }

  gofav() {
    if (!localStorage.getItem('token')) {
      this.ngLogin();
    } else {
      const dialogRef = this.dialog.open(FavoriteComponent, {
        width: '100%',
        // data: {name: this.name, animal: this.animal},
      });

      dialogRef.afterClosed().subscribe((result) => {
        console.log('The dialog was closed');
        // this.animal = result;
      });
    }
  }
}
