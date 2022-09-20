import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/@electronic/services/category.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {
  updateCategory!:FormGroup
  categoID:any;
  editCatego:any;

  constructor(private category:CategoryService, private fb:FormBuilder,private activated:ActivatedRoute, private router:Router) {
    this.categoID=activated.snapshot.paramMap.get('id')
   }
  ngOnInit(): void {
    this.category.GetCategory(this.categoID).subscribe(data=>{
      this.updateCategory=this.fb.group({
        name:[data['name']]
      })
    })
  }
  editCategory(){
  this.category.EditCategory(this.categoID,this.updateCategory.value).subscribe(data=>{
    this.router.navigateByUrl('admin/dashboard/categorys')
  });
    }

  }




