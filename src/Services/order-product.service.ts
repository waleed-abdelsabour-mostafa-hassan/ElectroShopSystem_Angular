import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { IProductImg } from 'src/interface/IProductImg';
import { OrderProductForSeller } from 'src/interface/OrderProductForSeller';

@Injectable({
  providedIn: 'root',
})
export class OrderProductService {
  constructor(private http: HttpClient) {}

  _url = 'https://localhost:7096/api/OrderProduct/';
  _url1 = '';

  GetAllOrderProductBySellerID(
    UserID: string
  ): Observable<OrderProductForSeller[]> {
    this._url += 'GetOrderProductBySellerId/' + UserID;
    return this.http.get<OrderProductForSeller[]>(this._url).pipe(
      catchError((err) => {
        return throwError(() => err.message || 'internal Error');
      })
    );
  }
  ApproveOrder(OrdProdId: number, Approve: string): Observable<void> {
    this._url1 =
      'https://localhost:7096/api/OrderProduct/UpdateOrderProductApprove/' +
      OrdProdId +
      '/' +
      Approve;
    console.log(this._url);
    return this.http.get<void>(this._url1).pipe(
      catchError((err) => {
        return throwError(() => err.message || 'internal Error');
      })
    );
  }
}
