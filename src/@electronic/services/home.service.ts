import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Product } from '../model/Product';
import { SubCategory } from '../model/subcategory';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private http: HttpClient) {}
  public _url = 'https://localhost:7096/api/Home/';

  GetAllPhones(userId:string): Observable<Product[]> {
    return this.http
      .get<Product[]>(this._url + 'GetAllPhones?UserID=' + userId)
      .pipe(
        catchError((err) => {
          return throwError(() => err.message || 'Internal Server Error');
        })
      );
  }

  GetAllLabtops(userId:string): Observable<Product[]> {
    return this.http
      .get<Product[]>(this._url + 'GetAllLabtop?UserID=' + userId)
      .pipe(
        catchError((err) => {
          return throwError(() => err.message || 'Internal Server Error');
        })
      );
  }

  GetAllAccessories(userId:string): Observable<Product[]> {
    return this.http
      .get<Product[]>(this._url + 'GetAllAccessories?UserID=' + userId)
      .pipe(
        catchError((err) => {
          return throwError(() => err.message || 'Internal Server Error');
        })
      );
  }

  GetAllProductsNew(): Observable<Product[]> {
    return this.http
      .get<Product[]>(this._url + 'GetAllProductsNew')
      .pipe(
        catchError((err) => {
          return throwError(() => err.message || 'Internal Server Error');
        })
      );
  }










  ByIdCateoryAllPoduc(id:number,userId:string):Observable<Product[]>{
    return  this.http.get<Product[]>(this._url+"ByIdCateoryAllPoduc?id="+id+"&UserID="+userId).pipe(catchError((err)=>{
      return throwError(()=>err.message || "Internal Server Error")
    }))
    ;
  }
  GetAllSubCategoryByIdCaty(id:number):Observable<SubCategory[]>{
    return  this.http.get<SubCategory[]>(this._url+"GetAllSubCategoryByIdCaty/"+id).pipe(catchError((err)=>{
      return throwError(()=>err.message || "Internal Server Error")
    }))
    ;
  }
  GetAllProductByIdSubCategory(id:number,userId:string):Observable<Product[]>{
    return  this.http.get<Product[]>(this._url+"GetAllProductByIdSubCategory?id="+id+"&UserID="+userId).pipe(catchError((err)=>{
      return throwError(()=>err.message || "Internal Server Error")
    }))
    ;
  }
}
