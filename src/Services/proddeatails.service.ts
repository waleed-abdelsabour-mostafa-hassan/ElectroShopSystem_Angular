import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { IProductDetails } from 'src/interface/IProductDetails';

@Injectable({
  providedIn: 'root'
})
export class ProductdeatailsService {


  constructor(private http:HttpClient) { }
_url="https://localhost:7096/api/Product/GetProductByProductId/";
  getProductDeyails(prodID:number):Observable<IProductDetails>{

return this.http.get<IProductDetails>(this._url+prodID).pipe(
  catchError((err)=>{return throwError(()=>err.message || 'internal Error')})
)

  }
}
