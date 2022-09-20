import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { SharedService } from 'src/@electronic/services/shared.service';
import { IProductImg } from 'src/interface/IProductImg';

@Injectable({
  providedIn: 'root',
})
export class ProductImgsService {
  constructor(private http: HttpClient,private sharedService:SharedService) {}
  _url = '';
  getProductImgs(prodID: number):Observable<IProductImg[]> {
    this._url =
      `https://localhost:7096/api/ProductImages/GetProductImageByProductID/` +
      prodID;
    return this.http.get<IProductImg[]>(this._url).pipe(
      catchError((err) => {
        return throwError(() => err.message || 'internal Error');
      })
    );
  }
  addProductImg(img:any):Observable<any>{
    this._url =
      `https://localhost:7096/api/ProductImages/AddNewProductImage`;
      return this.http.post<any>(this._url,img,{
        headers: this.sharedService.headers_object,
      }).pipe(
        catchError((err) => {
          return throwError(() => err.message || 'internal Error');
        })
      );
  }
  RemoveImage(ImgId:number):Observable<any>{
    this._url = `https://localhost:7096/api/ProductImages/RemoveImgByImgId/${ImgId}`;
    return this.http.delete<any>(this._url,{
      headers: this.sharedService.headers_object,
    }).pipe(
      catchError((err) => {
        return throwError(() => err.message || 'internal Error');
      })
    );
  }
  RemoveAllProductImages(ProductId:number):Observable<any>{
    this._url = `https://localhost:7096/api/ProductImages/RemoveProductImages/${ProductId}`;
    return this.http.delete<any>(this._url,{
      headers: this.sharedService.headers_object,
    }).pipe(
      catchError((err) => {
        return throwError(() => err.message || 'internal Error');
      })
    );
  }
}
