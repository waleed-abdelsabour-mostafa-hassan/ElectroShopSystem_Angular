import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ReportOrder } from 'src/@electronic/model/ReportOrder';
import { OrderService } from 'src/@electronic/services/order.service';
import { OrderDaitelsComponent } from 'src/app/Order/order-daitels/order-daitels.component';

@Component({
  selector: 'app-printreprtorder',
  templateUrl: './printreprtorder.component.html',
  styleUrls: ['./printreprtorder.component.scss']
})
export class PrintreprtorderComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public iddata:any,
    private dialog:MatDialogRef<PrintreprtorderComponent>,
    private reportService:OrderService
  ) { }
  iscach="Cach";
report!:ReportOrder;
  ngOnInit(): void {

    this.reportService.GetAllOrderProductUseReport(this.iddata).subscribe(e=>{
      console.log(e);
      this.report=e;
      if( this.report.payment_Type!="Cach"){
        this.iscach="Pyment";
      }

    })
  }
  @ViewChild('pdfTable') pdfTable!: ElementRef;
  // generatePDF() {

  //   const doc = new jsPDF();

  //   const pdfTable = this.pdfTable.nativeElement;

  //   var html = htmlToPdfmake(pdfTable.innerHTML);

  //   const documentDefinition = { content: html };
  //   pdfMake.createPdf(documentDefinition).open();


  // }
}
