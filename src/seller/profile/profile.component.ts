import { Component, OnInit } from '@angular/core';
import { ParamMap, Router } from '@angular/router';
import { CryptService } from 'src/@electronic/services/crypt.service';
import { ProductService } from 'src/@electronic/services/product.service';
import { Movie } from 'src/app/home/home.component';
import { ISellerProduct } from 'src/interface/ISellerProduct';
import { UserService } from 'src/Services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  constructor(private rout: Router, private UserS: UserService, private crypt: CryptService) {}
  UserName: any;
  userImg!: any;
  userID = '';
  errMsg = '';
  errMsg1 = '';
  // SellerId:any;
  // gotoAllproduct = (ID: Number) => {
  //   this.rout.navigate(['/product/details/', ID]);
  // };
  gettoken(){

    if (localStorage.getItem('token')) {
      var token = JSON.parse(
        this.crypt.Decrypt(localStorage.getItem('token')!)
      );


      this.userID = token.id;

    }


  }
  ngOnInit(): void {
    this.gettoken();

    this.UserS.getUserImgs(this.userID).subscribe(
      (data: string) => {
        this.userImg = data;
      },
      (err: string) => {
        this.errMsg1 = err;
      }
    );
    this.UserS.getUserName(this.userID).subscribe(
      (data: string) => {
        this.UserName = data;
      },
      (err: string) => {
        this.errMsg = err;
      }
    );

    // this.rout.paramMap.subscribe((params: ParamMap) => {
    //   this.SellerId = params.get('ID');
    // });
  }
}
