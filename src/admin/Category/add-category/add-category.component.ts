import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from 'src/@electronic/services/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {
  insertCategory!:FormGroup
  constructor(private categ:CategoryService,private router:Router , private fb:FormBuilder) { }
  newCategory:any;

  ngOnInit(): void {
    this.insertCategory=this.fb.group({
      name:['',Validators.required]
    })

  }
  addCategory(){
    this.categ.InsertCategory(this.insertCategory.value).subscribe(data=>{
      this.router.navigateByUrl('admin/dashboard/categorys')
    })
      }



}
