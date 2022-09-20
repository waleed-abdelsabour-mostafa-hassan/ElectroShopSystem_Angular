import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CategoryModel } from '../model/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor( private http:HttpClient,
    private rout:Router   ) { }
  baseUrl="https://localhost:7096/api/Category/";
//   headers={
// headerrs: new HttpHeaders({
//   'Content-Type': 'application/json'
// }),

// withCredentials: true,

//   };



  GetAllCategory():Observable<CategoryModel[]>{
    return this.http.get<CategoryModel[]>(this.baseUrl+'GetAllCategories');
  }

 GetCategory(id:number):Observable<CategoryModel>{
  return this.http.get<CategoryModel>(this.baseUrl+'GetCategoryByID/'+id);
 }

  InsertCategory(category:CategoryModel):Observable<CategoryModel>{
    return this.http.post<CategoryModel>(this.baseUrl+'AddNewCategory',category);

  }

  EditCategory( id:number,model:CategoryModel):Observable<CategoryModel>{
    return this.http.put<CategoryModel>(this.baseUrl+'UpdateCategory/'+id,model);

  }

  DeletCategory(id: number){
    return this.http.delete(this.baseUrl +'DeletCategory/'+id);
   }


}
