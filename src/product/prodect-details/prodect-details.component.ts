import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { GalleryItem, ImageItem } from 'ng-gallery';
import { CartService } from 'src/@electronic/services/cart.service';
import { CryptService } from 'src/@electronic/services/crypt.service';
import { ICheckFavoProdID } from 'src/interface/ICheckFavoProdID';
import { IComment } from 'src/interface/IComment';
import { IFavoriteProduct } from 'src/interface/IFavoriteProduct';
import { IProductDetails } from 'src/interface/IProductDetails';
import { IProductImg } from 'src/interface/IProductImg';
import { CommentService } from 'src/Services/comment.service';
import { FavoriteProductService } from 'src/Services/favorite-product.service';
import { ProductdeatailsService } from 'src/Services/proddeatails.service';
import { ProductImgsService } from 'src/Services/product-imgs.service';

@Component({
  selector: 'app-prodect-details',
  templateUrl: './prodect-details.component.html',
  styleUrls: ['./prodect-details.component.scss'],
})
export class ProdectDetailsComponent implements OnInit {
  Product!: IProductDetails;
  errorMSG = '';
  errorImg = '';
  errorfavo = '';
  errorComment = '';

  Imgs: any;
  prodId: any;

  Imgss!: GalleryItem[];
  prodIsFavorite: any;
  CommentsOfProduct: any;
  constructor(
    private ActRoute: ActivatedRoute,
    private prod: ProductdeatailsService,
    private prodImgs: ProductImgsService,
    private favoProd: FavoriteProductService,
    private Comments: CommentService,
    private crypt: CryptService,
    private cardService: CartService,
    private tost: NgToastService
  ) {}
  images: any = [];
  maxquantity!: number;
  getAllCommentByProdID() {
    this.Comments.getAllCommentByProdID(this.prodId).subscribe(
      (data: IComment[]) => {
        this.CommentsOfProduct = data;
      },
      (err: string) => {
        this.errorComment = err;
      }
    );
  }
  addNewComment(
    userIdd: string = this.userID,
    ProdID: number,
    Comment: string
  ) {
    this.Comments.AddNewComment(this.userID, ProdID, Comment).subscribe();
    this.getAllCommentByProdID();

    // location.reload();
  }
  remove(faviID: number) {
    this.favoProd.deleteFavoriteProduct(faviID).subscribe(
      (data) => {
        this.errorMSG = data;
        this.checkProduct();
      },
      (err) => {
        this.errorMSG = err;
      }
    );
  }
  addNewFavoritProduct(favProdiID: number) {
    this.favoProd.addnew(favProdiID, this.userID).subscribe((data) => {
      this.checkProduct();
    });
  }
  userID = '';
  gettoken() {
    if (localStorage.getItem('token')) {
      var token = JSON.parse(
        this.crypt.Decrypt(localStorage.getItem('token')!)
      );
      this.userID = token.id;
    }
  }
  checkProduct() {
    this.favoProd.check(this.prodId, this.userID).subscribe(
      (data: ICheckFavoProdID) => {
        this.prodIsFavorite = data;
      },
      (err: string) => {
        this.errorfavo = err;
      }
    );
  }
  ngOnInit(): void {
    this.gettoken();

    this.ActRoute.paramMap.subscribe((params: ParamMap) => {
      this.prodId = params.get('ID');
    });

    this.prod.getProductDeyails(this.prodId).subscribe(
      (data: IProductDetails) => {
        this.Product = data;
      },
      (err: string) => {
        this.errorMSG = err;
      }
    );

    this.getAllCommentByProdID();

    this.checkProduct();

    this.prodImgs.getProductImgs(this.prodId).subscribe(
      (data: IProductImg[]) => {
        this.Imgs = data;
        console.log(data);
        let ggg = [];
        for (let index = 0; index < data.length; index++) {
          ggg[index] = new ImageItem({
            src: data[index].name,
            thumb: data[index].name,
          });
        }
        this.Imgss = ggg;
      },
      (err: string) => {
        this.errorImg = err;
      }
    );
  }

  AddCard(idproduct: number, inpuvalue: string) {
    const valuecount = parseInt(inpuvalue);
    this.cardService
      .AddCartByDetails(idproduct, valuecount, this.userID)
      .subscribe(
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
  }
  countitemcard() {
    this.cardService.CountCart(this.userID).subscribe((e) => {
      this.cardService.changeNav(e);
    });
  }
}
