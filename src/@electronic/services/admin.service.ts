import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { EditRoleModel } from '../model/editrole';
import { EditUserModel } from '../model/EditUserModel';
import { Product } from '../model/Product';
import { RolesAllModel } from '../model/rolesall';
import { Users } from '../model/user';
import { UserModel } from '../model/usermodel';
import { UserRolesModel } from '../model/userroles';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor( private http:HttpClient,
    private rout:Router   ) { }
  baseUrl="https://localhost:7096/api/Admin/";
  headerrs={
headerrs: new HttpHeaders({
  'Content-Type': 'application/json',
}),
withCredentials: true,
  };

  GetAllUser():Observable<Users[]>{
    return this.http.get<Users[]>(this.baseUrl+'GetAllUsers').pipe();
  }

  AddUser(model: UserModel):Observable<UserModel>{
  return this.http.post<UserModel>(this.baseUrl+'AddUser',model).pipe();
  }

  GetUser(id:string):Observable<Users>{
    return this.http.get<Users>(this.baseUrl+'GetUser/'+id).pipe();

  }

  EditUser(model: EditUserModel):Observable<Users>{
    return this.http.put<Users>(this.baseUrl+'EditUser',model).pipe();
  }
  DeleteAll(ids: string[]){
   return this.http.post(this.baseUrl + 'DeleteUsers', ids, this.headerrs).pipe();
  }
  GetUserRole():Observable<UserRolesModel[]>{
    return this.http.get<UserRolesModel[]>(this.baseUrl + 'GetUserRole').pipe();
  }

  GetAllRoles():Observable<RolesAllModel[]>{
    return this.http.get<RolesAllModel[]>(this.baseUrl +'GetAllRoles').pipe();
  }
  EditUserRole(model:EditRoleModel):Observable<EditRoleModel>{
    return this.http.put<EditRoleModel>(this.baseUrl +'EditUserRole',model ).pipe();
  }




  GetAllProducts():Observable<Product[]>{
    return this.http.get<Product[]>(this.baseUrl+'GetAllProducts').pipe();
  }
  RemoveProduct(ProdID: number): Observable<string> {
    return this.http
      .delete(this.baseUrl + 'RemoveProduct/' + ProdID, { responseType: 'text' })
      .pipe(
        catchError((err) => {
          return throwError(() => err.message || 'Internal Server Error');
        })
      );
  }
  ChangeProductApprove(ProdID: number, Approve: boolean) {
    return this.http
      .get(this.baseUrl +'UpdateProductApprove/'+ `${ProdID}/${Approve}`).pipe(catchError((err) => {
          return throwError(() => err.message || 'Internal Server Error');
        })
      );
  }



}
