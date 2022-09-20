import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ProductService } from 'src/@electronic/services/product.service';
import { SubcategoryService } from 'src/@electronic/services/subcategory.service';
import { IProductDetails } from 'src/interface/IProductDetails';
import { ISubCategory } from 'src/interface/ISubCategory';
import { ProductdeatailsService } from 'src/Services/proddeatails.service';
import { IAddProduct } from 'src/interface/IAddProduct';
import { SharedService } from 'src/@electronic/services/shared.service';
@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
})
export class EditProductComponent implements OnInit {
  _updateImg = '0';
  image!: File;
  productModel!: IProductDetails;
  prodId: any;
  SubCategories: ISubCategory[] = [];
  constructor(
    private subService: SubcategoryService,
    private router: Router,
    private prod: ProductdeatailsService,
    private ActRoute: ActivatedRoute,
    private productService: ProductService,
    private _shared: SharedService
  ) {
    ActRoute.paramMap.subscribe((params: ParamMap) => {
      this.prodId = params.get('id');
    });
    this.prod.getProductDeyails(this.prodId).subscribe(
      (data: IProductDetails) => {
        this.productModel = data;
      },
      (err: string) => {}
    );
    this.subService.GetAllSubCategory().subscribe((data) => {
      this.SubCategories = data;
    });
  }
  onFileChanged(event: any) {
    this.image = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function (e) {
      $('#image').attr('src', e.target!.result!.toString()!);
    };
    reader.readAsDataURL(this.image);
    this._updateImg = 'image added';

    //this.productModel.img="https://media.istockphoto.com/photos/green-check-mark-picture-id537315667?k=20&m=537315667&s=612x612&w=0&h=85SGLmM5Mmgy1eVybZ3Z5D8saJC2wjEppB8a1NBbHU4=";
  }
  saveProduct() {
    let FormObj = new FormData();
    FormObj.append('id', this.productModel.id.toString());
    FormObj.append('name', this.productModel.name);
    FormObj.append('ram', this.productModel.ram);
    FormObj.append('hardDrive', this.productModel.hardDrive);
    FormObj.append('camera', this.productModel.camera);
    FormObj.append('description', this.productModel.description);
    FormObj.append('processor', this.productModel.processor);
    FormObj.append('screenSize', this.productModel.screenSize.toString());
    FormObj.append('discount', this.productModel.discount.toString());
    FormObj.append('price', this.productModel.price.toString());
    FormObj.append('countProduct', this.productModel.countProduct.toString());
    FormObj.append('img', this._updateImg);
    FormObj.append('image', this.image);
    FormObj.append('subCategoryID', this.productModel.subCategoryID.toString());
    FormObj.append('userID', this._shared.UserId);
    this.productService.UpdateProduct(FormObj).subscribe((d) => {
      console.log(d);
    });
    // window.location.href="http://localhost:4200/admin/dashboard/products";
    // this.router.navigateByUrl('/admin/dashboard/products');
    history.back();
  }
  UpdateImageClick() {}
  ngOnInit(): void {}
}
