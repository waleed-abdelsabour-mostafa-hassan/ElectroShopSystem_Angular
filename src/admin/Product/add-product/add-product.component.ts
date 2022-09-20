import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryModel } from 'src/@electronic/model/category';
import { CategoryService } from 'src/@electronic/services/category.service';
import { CryptService } from 'src/@electronic/services/crypt.service';
import { ProductService } from 'src/@electronic/services/product.service';
import { SharedService } from 'src/@electronic/services/shared.service';
import { SubcategoryService } from 'src/@electronic/services/subcategory.service';
import { IAddProduct } from 'src/interface/IAddProduct';
import { ISubCategory } from 'src/interface/ISubCategory';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit {
  image!: File;
  userID = this._shared.UserId;
  productModel: IAddProduct = {
    id: 0,
    name: '',
    ram: '',
    hardDrive: '',
    camera: '',
    description: '',
    processor: '',
    screenSize: 0,
    discount: 0,
    price: 0,
    countProduct: 0,
    subCategoryID: 0,
    userID: this.userID,
  };
  selectedCategory = -1;
  showSub = false;
  Categories: CategoryModel[] = [];
  SubCategories: ISubCategory[] = [];
  selectedValue = 0;
  constructor(
    private crypt: CryptService,
    private subService: SubcategoryService,
    private productService: ProductService,
    private router: Router,
    private categoryService: CategoryService,
    private _shared: SharedService
  ) {
    this.subService.GetAllSubCategory().subscribe((data) => {
      this.SubCategories = data;
    });
    this.categoryService.GetAllCategory().subscribe((data) => {
      this.Categories = data;
    });
  }

  gettoken() {
    if (localStorage.getItem('token')) {
      var token = JSON.parse(
        this.crypt.Decrypt(localStorage.getItem('token')!)
      );

      this.userID = token.id;
    }
  }

  SelectChanged(obj: any) {
    this.selectedValue = obj.value;
  }
  onFileChanged(event: any) {
    this.image = event.target.files[0];
  }
  saveProduct() {
    let FormObj = new FormData();
    FormObj.append('id', this.productModel.id.toString());
    FormObj.append('name', this.productModel.name.toString());
    FormObj.append('ram', this.productModel.ram.toString());
    FormObj.append('hardDrive', this.productModel.hardDrive.toString());
    FormObj.append('camera', this.productModel.camera.toString());
    FormObj.append('description', this.productModel.description.toString());
    FormObj.append('processor', this.productModel.processor.toString());
    FormObj.append('screenSize', this.productModel.screenSize.toString());
    FormObj.append('discount', this.productModel.discount.toString());
    FormObj.append('price', this.productModel.price.toString());
    FormObj.append('countProduct', this.productModel.countProduct.toString());
    FormObj.append('img', this.productModel.img.toString());
    FormObj.append('image', this.image);
    FormObj.append('subCategoryID', this.productModel.subCategoryID.toString());
    FormObj.append('userID', this.productModel.userID.toString());
    this.productService.AddNewProduct(FormObj).subscribe((d) => console.log(d));
    // this.router.navigateByUrl();
    // location.reload();
  }
  FilteredSubCategories: ISubCategory[] = [];
  CategorySelected(event: any) {
    let t = -1;
    this.selectedCategory = event.target.value;
    t = this.selectedCategory;
    this.FilteredSubCategories = this.SubCategories.filter(function (el) {
      return el.categoryID == t;
    });

    console.log(this.FilteredSubCategories);

    this.showSub = true;
  }
  ngOnInit(): void {
    this.gettoken();
  }
}
