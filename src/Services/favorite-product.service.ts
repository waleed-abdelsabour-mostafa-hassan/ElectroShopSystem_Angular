import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { ICheckFavoProdID } from 'src/interface/ICheckFavoProdID';
import { IProductDetails } from 'src/interface/IProductDetails';
import { IFavoriteProduct } from '../interface/IFavoriteProduct';

@Injectable({
  providedIn: 'root',
})
export class FavoriteProductService {
  constructor(private http: HttpClient) {}
  public _url = '';
  public _url3 = '';
  public _url2 = '';

  getFavoriteProducts( UserID: string) {
    this._url = `https://localhost:7096/GetFavoriteProduct/` + UserID;
    return this.http.get<IFavoriteProduct[]>(this._url).pipe(
      catchError((err) => {
        return throwError(() => err.message || 'internal error ');
      })
    );
  }

  getCountOfFavoriteProduct( UserID: string): Observable<number> {
    this._url =
      `https://localhost:7096/api/favoriteProduct/count/` + UserID;
    return this.http.get<number>(this._url).pipe(
      catchError((err) => {
        return throwError(() => err.message || 'internal error ');
      })
    );
  }

  check(
    favoriteProductID: number, UserID: string
  ): Observable<ICheckFavoProdID> {
    this._url = `https://localhost:7096/api/favoriteProduct/checkProduct/${UserID}/${favoriteProductID} `;
    return this.http.get<ICheckFavoProdID>(this._url).pipe(
      catchError((err) => {
        return throwError(() => err.message || 'internal error ');
      })
    );
  }

  deleteFavoriteProduct(favoriteProductID: number):Observable<string> {
    this._url2 =
      `https://localhost:7096/api/favoriteProduct/remove/` + favoriteProductID;
    return this.http.get(this._url2,{responseType: 'text'}).pipe(
      catchError((err) => {
        return throwError(() => err.message || 'internal error ');
      })
    );
  }
  addnew(favoriteProductID: number, UserID: string):Observable<string> {
    this._url2 = `https://localhost:7096/api/favoriteProduct/addFavoriteProduct/${UserID}/${favoriteProductID}`;
    return this.http.get(this._url2,{responseType: 'text'}).pipe(
      catchError((err) => {
        return throwError(() => err.message || 'internal error ');
      })
    );
  }



  public _navItemSource = new BehaviorSubject<number>(0);

  navItem$ = this._navItemSource.asObservable();

  changeNav(number:number) {
    this._navItemSource.next(number);
  }
}
