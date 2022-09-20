import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
// import jsPDF from 'jspdf';
// import * as pdfMake from "pdfmake/build/pdfmake";
// import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { ReportOrder } from 'src/@electronic/model/ReportOrder';
import { OrderService } from 'src/@electronic/services/order.service';

// (<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;
// var htmlToPdfmake = require("html-to-pdfmake");
@Component({
  selector: 'app-order-daitels',
  templateUrl: './order-daitels.component.html',
  styleUrls: ['./order-daitels.component.scss']
})
export class OrderDaitelsComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public iddata:any,
    private dialog:MatDialogRef<OrderDaitelsComponent>,
    private reportService:OrderService
  ) { }
report!:ReportOrder;
  ngOnInit(): void {

    this.reportService.GetAllOrderProductUseReport(this.iddata).subscribe(e=>{
      console.log(e);
      this.report=e;
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
