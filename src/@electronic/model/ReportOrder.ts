import { ProductsByReport } from "./ProductsByReport";

 export class ReportOrder{


  constructor(
    public  userName:string,
    public  email:string,
    public  phone:string,

    public  address:string,

    public  total_Price:number,

    public  create_Date:Date,

    public  orderPlace_Date:Date,
    public  payment_Type:string,
    public reportDto : ProductsByReport[]

  ){

  }
 }
