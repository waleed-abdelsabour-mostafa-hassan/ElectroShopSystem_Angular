export interface IAddProduct{
  id: number;
  name: string;
  ram: string;
  hardDrive: string;

  camera: string;
  description: string;
  processor: string;

  screenSize: number;
  discount: number;
  price: number;
 // image:File;
  countProduct: number;
  img?: any;
  subCategoryID: number;
  userID: string;
  
}