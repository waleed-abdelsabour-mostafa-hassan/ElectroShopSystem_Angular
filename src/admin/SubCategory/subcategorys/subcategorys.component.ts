import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SubCategory } from 'src/@electronic/model/subcategory';
import { SubcategoryService } from 'src/@electronic/services/subcategory.service';

@Component({
  selector: 'app-subcategorys',
  templateUrl: './subcategorys.component.html',
  styleUrls: ['./subcategorys.component.scss']
})
export class SubcategorysComponent implements OnInit {
  subCategoryList:SubCategory[]=[];

  name:any;
  key:string='id';
  reverse:boolean=false;
  constructor(private subcategoryservice:SubcategoryService,private router:Router, activated:ActivatedRoute)
   {

  }

    ngOnInit(): void {
      this.subcategoryservice.GetAllSubCategory().subscribe(data=>{
        this.subCategoryList=data;
      })
        }

        addSubCategory()
        {
          this.router.navigate(['admin/dashboard/addsubcategory']);
        }
        editSubCategory(subcategory:any)
        {
          this.router.navigate(['admin/dashboard/editsubcategory/',subcategory.id]);
        }
        Delete(id:number){
          if (confirm("Are you sure for deleteing ?") == true) {
            this.subcategoryservice.DeletSubCategory(id).subscribe(data=>{
              this.subcategoryservice.GetAllSubCategory().subscribe(data=>{
         this.subCategoryList=data;
       })})
          } else{}
        }
        search(){
          if(this.name=="")
          {
            this.ngOnInit();
          } else{
            this.subCategoryList=this.subCategoryList.filter(res=>{
              return res.name.toLocaleLowerCase().match(this.name.toLocaleLowerCase());
            })
          }
        }
        sort(key:any){
          this.key=key;
          this.reverse=!this.reverse;
        }

  }
