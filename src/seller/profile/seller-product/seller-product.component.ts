import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Action } from 'rxjs/internal/scheduler/Action';
import { CryptService } from 'src/@electronic/services/crypt.service';
import { ProductService } from 'src/@electronic/services/product.service';
import { Movie } from 'src/app/home/home.component';
import { ISellerProduct } from 'src/interface/ISellerProduct';
import { UserService } from 'src/Services/user.service';

@Component({
  selector: 'app-seller-product',
  templateUrl: './seller-product.component.html',
  styleUrls: ['./seller-product.component.scss'],
})
export class SellerProductComponent implements OnInit {
  constructor(
    private crypt: CryptService,
    private ProductS: ProductService,
    private UserS: UserService,
    private ActRoute: ActivatedRoute,
    private rout: Router
  ) {}
  pages!: number;
  itemsPerPage = 6;
  curr: number = 1;
  totalitems: number = 0;
  allProduct: any;
  errMsg = '';
  userID: any;
  RemoveProductMSG: any;
  RemoveProductMSGerror: any;

  gettoken() {
    if (localStorage.getItem('token')) {
      var token = JSON.parse(
        this.crypt.Decrypt(localStorage.getItem('token')!)
      );
      this.userID = token.id;
    }
  }
  RemoveProductMSG2 = '';
  RemoveProductMSGerror2 = '';
  ChangeActivityStatus(ProdId: number, Status: string) {
    var stsNUmber = parseInt(Status);
    // console.log('ChangeActivityStatus(prod.id, status.value)');

    this.ProductS.ChangeActivityStatus(
      this.userID,
      ProdId,
      stsNUmber
    ).subscribe();
    // location.reload();
  }
  editProduct(id: number) {
    this.rout.navigate(['/seller/profile/edit/', id]);
  }

  RemoveProduct(prodId: number) {
    this.ProductS.RemoveProduct(prodId).subscribe(
      (data: string) => {
        this.RemoveProductMSG = data;
      },
      (err: string) => {
        this.RemoveProductMSGerror = err;
      }
    );
    location.reload();
  }
  gotoProductDetails = (ID: Number) => {
    this.rout.navigate(['/product/details/', ID]);
  };

  ngOnInit(): void {
    // this.ActRoute.paramMap.subscribe((params: ParamMap) => {
    //   this.userID = params.get('ID');
    // });
    this.gettoken();
    this.ProductS.GetAllProductsByUserId(this.userID).subscribe(
      (data: ISellerProduct[]) => {
        this.allProduct = data;
        console.log(data);
        this.totalitems = data.length;
      },
      (err: string) => {
        this.errMsg = err;
      }
    );
  }
}
