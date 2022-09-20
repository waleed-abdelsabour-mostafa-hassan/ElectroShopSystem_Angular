import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryModel } from 'src/@electronic/model/category';
import { CategoryService } from 'src/@electronic/services/category.service';
import { SubcategoryService } from 'src/@electronic/services/subcategory.service';

@Component({
  selector: 'app-add-subcategory',
  templateUrl: './add-subcategory.component.html',
  styleUrls: ['./add-subcategory.component.scss']
})
export class AddSubcategoryComponent implements OnInit {
  insertSubCategory!:FormGroup
  Categories:CategoryModel[]=[];

  constructor(private fb:FormBuilder,private subcategory:SubcategoryService , private router:Router,private catego:CategoryService) {
    this.catego.GetAllCategory().subscribe(data=>{
      this.Categories=data;

    }
      );
   }

  ngOnInit(): void {
    this.insertSubCategory=this.fb.group({
      name:['',Validators.required],
      categoryID:['']
    })
  }
  addSubCategory(){
    this.subcategory.InsertSubCategory(this.insertSubCategory.value).subscribe(data=>{
      this.router.navigate(['/admin/dashboard/subcategorys']);

    })
  }



}
