import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryModel } from 'src/@electronic/model/category';
import { SubCategory } from 'src/@electronic/model/subcategory';
import { CategoryService } from 'src/@electronic/services/category.service';
import { SubcategoryService } from 'src/@electronic/services/subcategory.service';

@Component({
  selector: 'app-edit-subcategory',
  templateUrl: './edit-subcategory.component.html',
  styleUrls: ['./edit-subcategory.component.scss']
})
export class EditSubcategoryComponent implements OnInit {
  updateSubCategory!:FormGroup
  subCategoryList:SubCategory[]=[];
  editSub!:SubCategory;
    caegorys!: CategoryModel[];
  subcategoID:any;

  constructor(private categorysserver:CategoryService ,private subCategory:SubcategoryService,
    private fb:FormBuilder,private activated:ActivatedRoute,
     private router:Router,private catego:CategoryService) {

   }


   id!:number;


  ngOnInit(): void {
    this.editSub={
      id:0,
      name:'',
      categoryID:0,
    };

    this.updateSubCategory=this.fb.group({
      name:[""],
      subid:[0],

     });

     this.activated.paramMap.subscribe((param) => {
      var Id = parseInt(param.get('id')!);
      this.subCategory.GetSubCategory(Id).subscribe(data=>{
        this.editSub=data;
        this.id=Id;
        this.updateSubCategory.setValue({
          name:data.name,
          subid:data.categoryID,

        })
      }
        );

    })


    this.categorysserver.GetAllCategory().subscribe(e=>{
      this.caegorys=e;
    })






    }

    editSubCategory(){

        this.editSub.categoryID=this.updateSubCategory.value.subid;
        this.editSub.name=this.updateSubCategory.value.name;
        console.log( this.editSub);

      this.subCategory.EditSubCategory(this.id, this.editSub).subscribe(data=>{
        this.router.navigate(['/admin/dashboard/subcategorys']);
      });
        }
  }




