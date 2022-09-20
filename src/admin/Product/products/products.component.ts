import {  Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Product } from 'src/@electronic/model/Product';
import { ProductService } from 'src/@electronic/services/product.service';
import { SharedService } from 'src/@electronic/services/shared.service';
import { UserData } from 'src/app/home/home.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  OldProducts:Product[]=[];
  priceAsc:boolean=false;
  idAsc:boolean=false;
  nameAsc:boolean=false;
  products:Product[]=[];
  test:boolean=false;
  constructor(private productService:ProductService,private sharedService:SharedService,
    private router:Router) {
    
    //this.dataSource = new MatTableDataSource(this.users);
  }

/*   displayedColumns: string[] = ['id', 'name', 'progress', 'fruit','action'];
  dataSource!: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


   users:UserData[] = [
    { id: "1", name: 'hhg', progress: 'hgj', fruit: 'fhh' },
    { id: "2", name: 'dg', progress: 'hgj', fruit: 'fhh' },
    { id: "3", name: 'ghj', progress: 'll', fruit: 'fhh' },
    { id: "4", name: 'ghj', progress: 'hgj', fruit: 'fhh' },
    { id: "5", name: 'hhg', progress: 'ww', fruit: 'fhh' },
    { id: "6", name: 'hhg', progress: 'hgj', fruit: 'fhh' },
    { id: "7", name: 'hhg', progress: 'hgj', fruit: 'fhh' },
    { id: "8", name: 'hhhgfg', progress: 'hgj', fruit: 'fhh' },
    { id: "9", name: 'hhg', progress: 'jk', fruit: 'fhh' },
    { id: "10", name: 'hhg', progress: 'hgj', fruit: 'fhh' },
    { id: "10", name: 'hhg', progress: 'hgj', fruit: 'fhh' },
    { id: "10", name: 'hhg', progress: 'hgj', fruit: 'fhh' },
    { id: '10', name: 'hhg', progress: 'hgj', fruit: 'fhh' },
    { id: "10", name: 'hhg', progress: 'hgj', fruit: 'fhh' },
    { id: "10", name: 'hhg', progress: 'hgj', fruit: 'fhh' },
    { id: "10", name: 'hhg', progress: 'hgj', fruit: 'fhh' },
    { id: "10", name: 'hhg', progress: 'hgj', fruit: 'fhh' },
    { id: "10", name: 'hhg', progress: 'hgj', fruit: 'fhh' } ,
    { id: "10", name: 'hhg', progress: 'hgj', fruit: 'fhh' }
  ]; */
  ngOnInit(): void {
   this.fill();
  }
  fill(){
    this.productService.GetAllProductsFilter(this.sharedService.UserId).subscribe(data=>
      {
        this.products=data;
        this.OldProducts=data;
        this.test=true;
        console.log(data);
      }
      );
  }
  DeleteProduct(id:number,event:any){
    let x:any;
    var confirm=window.confirm("Delete This Item ??");
    if(confirm)
    { 
      this.productService.RemoveProduct(id).subscribe(data=>{
        console.log(data);
        event.target.parentElement.parentElement.remove();
      },err=>{
        alert("You Can not remove this product");
      }
     
      );
        
      
         
    }

    //this.router.navigate(['/admin/dashboard/products']);
   // window.location.reload();
  }
/*   applyFilter(event: Event) {
    console.log(event);
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
 */
  
   compareNameAsc( a:any, b:any ) {
    if ( a.name < b.name ){
      return -1;
    }
    if ( a.name > b.name ){
      return 1;
    }
    return 0;
  }
  compareNameDesc( a:any, b:any ) {
    if ( a.name > b.name ){
      return -1;
    }
    if ( a.name < b.name ){
      return 1;
    }
    return 0;
  }
  compareIDAsc( a:any, b:any ) {
    if ( a.id < b.id ){
      return -1;
    }
    if ( a.id > b.id ){
      return 1;
    }
    return 0;
  }compareIDDesc( a:any, b:any ) {
    if ( a.id > b.id ){
      return -1;
    }
    if ( a.id < b.id ){
      return 1;
    }
    return 0;
  }
  comparePriceAsc( a:any, b:any ) {
    if ( a.price < b.price ){
      return -1;
    }
    if ( a.price > b.price ){
      return 1;
    }
    return 0;
  }comparePriceDesc( a:any, b:any ) {
    if ( a.price > b.price ){
      return -1;
    }
    if ( a.price < b.price ){
      return 1;
    }
    return 0;
  }
  SortWithPrice()
  {
    this.idAsc=false;
    this.nameAsc=false;
    if(!this.priceAsc){
      this.priceAsc=true;
    this.products.sort(this.comparePriceAsc);
  }
  else{
    this.priceAsc=false;
    this.products.sort(this.comparePriceDesc);

  }

  }
  SortWithID(){
    this.nameAsc=false;
    this.priceAsc=false;
    if(!this.idAsc){
      this.idAsc=true;
      this.products.sort(this.compareIDAsc);
    }
    else{
      this.idAsc=false;
      this.products.sort(this.compareIDDesc);

    }

  }
  SortWithName()
  {
    this.idAsc=false;
    this.priceAsc=false;
    if(!this.nameAsc){
      this.nameAsc=true;
    this.products.sort(this.compareNameAsc);

    }
    else{
      this.nameAsc=false;
    this.products.sort(this.compareNameDesc);

    }
  }
  //Searching
  Search(event:any)
  {
    if(event.target.value.length>0){}

    let Searched=this.OldProducts.filter(function (e) {
      return e.name.trim().toLowerCase().includes(event.target.value.toLowerCase());
    });
    this.products=Searched;
  }

  ngAfterViewInit() {
/*     this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort; */
  }
  ChangeActivityStatus(UId:any,PID:any,status:boolean)
  {
    
    if(status){
     this.productService.ChangeActivityStatus(UId,PID,0).subscribe(
       data=>{
         this.fill();
        }
     );

    }
    else{
    this.productService.ChangeActivityStatus(UId,PID,1).subscribe(
data=>{this.fill();
}
    );

  }
    window.location.reload();
    

  }



}
/* export interface IProduct {
  ID: number;
  Name: string;
  Quantity: number;
  Price: number;
  Img: string;
} */
