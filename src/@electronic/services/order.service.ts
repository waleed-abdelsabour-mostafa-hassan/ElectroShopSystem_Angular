import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Order } from '../model/Order';
import { Payment } from '../model/payment';
import { ReportOrder } from '../model/ReportOrder';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http:HttpClient) { }

  public _url = 'https://localhost:7096/api/Order/';

  public _url2 = 'https://localhost:7096/api/OrderProduct/';

  CreateOrder(userId:string,payment:Payment,  Address:string,  State:string):Observable<string>{
    return this.http.post(this._url + "AddOrder/"+userId+"/"+payment+"/"+Address+"/"+State, null, { responseType: 'text' }).pipe(catchError((err) => {
      return throwError(() => err.message || 'Internal Server Error');
    })
    );
  }


  GetAllOrder():Observable<Order[]>{
    return this.http.get<Order[]>(this._url + "GetAllOrders").pipe(catchError((err) => {
      return throwError(() => err.message || 'Internal Server Error');
    })
    );
  }

  GetAllOrdersByDelevary(userId:string):Observable<Order[]>{
    return this.http.get<Order[]>(this._url + "GetAllOrdersByDelevary/"+userId).pipe(catchError((err) => {
      return throwError(() => err.message || 'Internal Server Error');
    })
    );
  }


  GetAllOrderByUserId(userId:string):Observable<Order[]>{
    return this.http.get<Order[]>(this._url + "GetAllOrdersByUserId/"+userId).pipe(catchError((err) => {
      return throwError(() => err.message || 'Internal Server Error');
    })
    );
  }

  GetAllOrderProductUseReport(OrderId:number):Observable<ReportOrder>{
    return this.http.get<ReportOrder>(this._url2 + "GetOrderProductById/"+OrderId).pipe(catchError((err) => {
      return throwError(() => err.message || 'Internal Server Error');
    })
    );
  }


  UpdateStatusOrder(OrderId:number,status:string):Observable<string>{
    return this.http.put(this._url + "UpdateStatusOrder/"+OrderId+"/"+status,null,{ responseType: 'text' }).pipe(catchError((err) => {
      return throwError(() => err.message || 'Internal Server Error');
    })
    );
  }



  GetOrderById(OrderId:number):Observable<Order>{
    return this.http.get<Order>(this._url + "GetOrderById/"+OrderId).pipe(catchError((err) => {
      return throwError(() => err.message || 'Internal Server Error');
    })
    );
  }


}
