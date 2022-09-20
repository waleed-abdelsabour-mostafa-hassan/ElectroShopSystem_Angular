import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryModel } from 'src/@electronic/model/category';
import { CategoryService } from 'src/@electronic/services/category.service';

@Component({
  selector: 'app-categorys',
  templateUrl: './categorys.component.html',
  styleUrls: ['./categorys.component.scss']
})
export class CategorysComponent implements OnInit {
  categorylist:CategoryModel[]=[];
  name:string="";
  key:string='id';
  reverse:boolean=false;
  categoID:any
    constructor(private categoryservice:CategoryService,private router:Router, activated:ActivatedRoute) {
      this.categoID=activated.snapshot.paramMap.get('id')
     }

    ngOnInit(): void {
      this.categoryservice.GetAllCategory().subscribe({
        next:(data)=>{
          this.categorylist=data;
        },
        error:(err)=>{
          console.log(err);
        }
      })
    }
    addCategory()
    {
      this.router.navigate(['admin/dashboard/addcategory']);
    }
    editCategory(category:any)
    {
      this.router.navigate(['admin/dashboard/editcategory/',category.id]);
    }
    Delete(id:number){
      if (confirm("Are you sure for deleteing ?") == true) {
      this.categoryservice.DeletCategory(id).subscribe(data=>{
        this.categoryservice.GetAllCategory().subscribe(data=>{
          this.categorylist=data;
        })})
      } else{}
    }
    search(){
      if(this.name=="")
      {
        this.ngOnInit();
      } else{
        this.categorylist=this.categorylist.filter(res=>{
          return res.name.toLocaleLowerCase().match(this.name.toLocaleLowerCase());
        })
      }
    }

    sort(key:any){
      this.key=key;
      this.reverse=!this.reverse;
    }
  }

