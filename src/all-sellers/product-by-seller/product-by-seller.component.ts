import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { CartService } from 'src/@electronic/services/cart.service';
import { CryptService } from 'src/@electronic/services/crypt.service';
import { ProductService } from 'src/@electronic/services/product.service';
import { ISellerProduct } from 'src/interface/ISellerProduct';
import { CommentService } from 'src/Services/comment.service';
import { FavoriteProductService } from 'src/Services/favorite-product.service';
import { ProductdeatailsService } from 'src/Services/proddeatails.service';
import { ProductImgsService } from 'src/Services/product-imgs.service';

@Component({
  selector: 'app-product-by-seller',
  templateUrl: './product-by-seller.component.html',
  styleUrls: ['./product-by-seller.component.scss'],
})
export class ProductBySellerComponent implements OnInit {
  constructor(
    private ActRoute: ActivatedRoute,
    private prod: ProductService,
    private prodImgs: ProductImgsService,
    private favoProd: FavoriteProductService,
    private Comments: CommentService,
    private crypt: CryptService,
    private cardService: CartService,
    private tost: NgToastService,
    private rout: Router
  ) {}
  SellerId: any;
  SellerProd: any;
  pages!: number;
  itemsPerPage = 6;
  curr: number = 1;
  totalitems: number = 0;

  error: any;

  gotoProductDetails = (ID: Number) => {
    this.rout.navigate(['/product/details/', ID]);
  };

  ngOnInit(): void {
    this.ActRoute.paramMap.subscribe((params: ParamMap) => {
      this.SellerId = params.get('id');
    });

    this.prod.GetAllProductsByUserId(this.SellerId).subscribe(
      (data: ISellerProduct[]) => {
        this.SellerProd = data;
      },
      (err: string) => {
        this.error = err;
      }
    );
  }
}
