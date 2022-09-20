import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { IAddProduct } from 'src/interface/IAddProduct';
import { IProductDetails } from 'src/interface/IProductDetails';
import { ISellerProduct } from 'src/interface/ISellerProduct';
import { Product } from '../model/Product';
import { SharedService } from './shared.service';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient, private sharedService: SharedService) {}
  public _url = 'https://localhost:7096/api/Product/';
  private URL = '';
  private _UrlActiveEdit = 'https://localhost:7096/api/Product/RemoveProduct/';

  UpdateProduct(model: any): Observable<string> {
    this.URL = 'https://localhost:7096/api/Product/UpdateProduct';
    return this.http
      .put<string>(this.URL, model, {
        headers: this.sharedService.headers_object,
      })
      .pipe(
        catchError((err) => {
          return throwError(() => err.message || 'Internal Server Error');
        })
      );
  }
  GetAllProductsFilter(userId: string): Observable<Product[]> {
    return this.http
      .get<Product[]>(this._url + 'GetAllProducts?UserId=' + userId)
      .pipe(
        catchError((err) => {
          return throwError(() => err.message || 'Internal Server Error');
        })
      );
  }
  AddNewProduct(model: any): Observable<any> {
    this.URL = 'https://localhost:7096/api/Product/AddNewProduct';
    return this.http
      .post<any>(this.URL, model)/* , {
        headers: this.sharedService.headers_object,
      } */
      .pipe(
        catchError((err) => {
          return throwError(() => err.message || 'Internal Server Error');
        })
      );
  }
  GetAllProductsByUserId(UserID: string): Observable<ISellerProduct[]> {
    return this.http
      .get<ISellerProduct[]>(this._url + 'GetProductByUserId?UserId=' + UserID)
      .pipe(
        catchError((err) => {
          return throwError(() => err.message || 'Internal Server Error');
        })
      );
  }
  RemoveProduct(ProdID: number): Observable<string> {
    return this.http
      .delete(this._url + 'RemoveProduct/' + ProdID, { responseType: 'text' })
      .pipe(
        catchError((err) => {
          return throwError(() => err.message || 'Internal Server Error');
        })
      );
  }
  ChangeActivityStatus(userId: string, ProdID: number, Status: number) {
    return this.http
      .get(this._UrlActiveEdit + `${userId}/${ProdID}/${Status}`)
      .pipe(
        catchError((err) => {
          return throwError(() => err.message || 'Internal Server Error');
        })
      );
  }
}
