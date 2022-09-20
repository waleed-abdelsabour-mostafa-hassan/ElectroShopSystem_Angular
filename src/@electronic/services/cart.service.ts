import { HttpClient  , HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { HeaderComponent } from 'src/app/header/header.component';
import { CartProduct } from '../model/CartProduct';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public _navItemSource = new BehaviorSubject<number>(0);

  navItem$ = this._navItemSource.asObservable();

  changeNav(number:number) {
    this._navItemSource.next(number);
  }


  constructor(private http:HttpClient) { }
  public  _url="https://localhost:7096/api/Cart/";

  options={
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),};

  GetAll(userId:string):Observable<CartProduct[]>{

    return this.http.get<CartProduct[]>(this._url+"GetAll/"+userId).pipe(catchError((err)=>{
      return throwError(()=>err.message || "Internal Server Error")
    }))

  }

  AddCart(  idprodect:number,userId:string):Observable<string>{
    return  this.http.post(this._url+"AddCart/"+userId+"/"+idprodect,null,{responseType: 'text'}).pipe(catchError(this.handleError));
  }
  AddCartByDetails(  idprodect:number,count:number,userId:string):Observable<string>{
    return  this.http.post(this._url+"AddCartByDetails/"+userId+"/"+idprodect+"/"+count,null,{responseType: 'text'}).pipe(catchError(this.handleError));
  }

  CountCart(userId:string):Observable<number>{
    return this.http.get<number>(this._url+"CountCart/"+userId).pipe(catchError((err)=>{

      return throwError(()=>err.message || "Internal Server Error")
    })) ;
  }

   AddCountProduct(  idprodect:number,  pluscount:number,userId:string):Observable<string>{
     return   this.http.post<string>(this._url+"AddCountProduct/"+userId+"/"+idprodect+"/"+pluscount,null,this.options).pipe(catchError((err)=>{

      return throwError(()=>err.message || "Internal Server Error")
    })) ;
   }

  DeleteCartProduct(   idprodect:number,userId:string):Observable<string>{
    return this.http.delete(this._url+"DeleteCartProduct/"+userId+"/"+idprodect,{responseType: 'text'}).pipe(catchError((err)=>{

      return throwError(()=>err.message || "Internal Server Error")
    })) ;







  }

 handleError(error: HttpErrorResponse) {
      if (error.error instanceof ErrorEvent) {
        console.error('An error occurred:', error.error.message);
      } else {
        console.error(
          `Backend returned code ${error.status}, ` + `body was: ${error.error}`
        );
      }
      return throwError(() => error.error);
    }

  }
