import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CryptService } from 'src/@electronic/services/crypt.service';
import { FavoriteProductService } from 'src/Services/favorite-product.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss'],
})
export class FavoriteComponent implements OnInit {
  constructor( private crypt: CryptService,
    private favoPro: FavoriteProductService, private rout: Router,public dialog: MatDialog) {}
  gotoProductDetails = (ID: Number) => {
    this.rout.navigate(['/product/details/', ID]);
    this.dialog.closeAll();
  };

  Allproduct: any = [];
  errorMSG = '';
  userID="";
  errorMSG2 = '';
  gettoken(){

    if (localStorage.getItem('token')) {
      var token = JSON.parse(this.crypt.Decrypt(localStorage.getItem('token')!));
      this.userID = token.id;
    }


  }

  remove(faviID: number) {
    console.log(faviID);
    this.favoPro.deleteFavoriteProduct(faviID).subscribe(
      (data) => {

        this.errorMSG2 = data;
         this.getallfav();
         this.changecountfav();
      },
      (err) => {
        this.errorMSG = err;
      }
    );

  }
  ngOnInit(): void {

    this.gettoken();
    this.getallfav();
    this.changecountfav();
  }
  changecountfav(){

    this.favoPro.getCountOfFavoriteProduct(this.userID).subscribe(
      (data) => {
        this.favoPro.changeNav(data);

      },
      (err) => {
        this.errorMSG = err;
      }
    );

  }

  getallfav(){

    this.favoPro.getFavoriteProducts(this.userID).subscribe(
      (data) => {
        this.Allproduct = data;
      },
      (err) => {
        this.errorMSG = err;
      }
    );
  }
}
