import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ISubCategory } from 'src/interface/ISubCategory';
import { CategoryModel } from '../model/category';
import { SubCategory } from '../model/subcategory';

@Injectable({
  providedIn: 'root'
})
export class SubcategoryService {

  constructor( private http:HttpClient,
    private rout:Router   ) { }
  baseUrl="https://localhost:7096/api/SubCategory/";



  GetAllSubCategory():Observable<SubCategory[]>{
    return this.http.get<SubCategory[]>(this.baseUrl+'GetAllSubCategories')
  }

  GetSubCategory(id:number):Observable<any>{
    return this.http.get<any>(this.baseUrl+'GetSubCategoryByID/'+id)
   }

  InsertSubCategory( subcategory:any):Observable<any>{
    return this.http.post<SubCategory>(this.baseUrl+'AddNewSubCategory',subcategory)

  }

  EditSubCategory(id:number,subcategory:SubCategory):Observable<SubCategory>{
    return this.http.put<SubCategory>(this.baseUrl+'UpdateSubCategory/'+id,subcategory)

  }

  DeletSubCategory(id: number){
    return this.http.delete(this.baseUrl +'DeletSubCategory/'+id)
   }



}
