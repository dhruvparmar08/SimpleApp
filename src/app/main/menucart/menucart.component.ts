import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-menucart',
  templateUrl: './menucart.component.html',
  styleUrls: ['./menucart.component.scss']
})
export class MenucartComponent implements OnInit {

  cartlist: any;
  cartdatasource = new MatTableDataSource();
  length: number;
  displayedColumns: string[] = ['img', 'name', 'qut', 'price', 'total', 'remove'];
  qut: number = 1;
  total: number;
  
  @ViewChild('register_details', { 'static': true }) content:any;

  constructor(private _auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.cartlist = this._auth.getToken('cart-details');  
    this.length = this.cartlist.length;
    this.cartdatasource = new MatTableDataSource(this.cartlist);
  }

  getTotalCost() {
    return this.cartdatasource.data.map((t: any) => t.price*t.quantity).reduce((acc, value) => acc + value, 0);
  }

  remove(id) {
    // console.log(id);
    for (var i = 0; i < this.cartlist.length; i++) {
      var obj = this.cartlist[i];
  
      if (id === obj.id) {
          this.cartlist.splice(i, 1);
      }
    }
    this.cartdatasource = new MatTableDataSource(this.cartlist);
    this.length = this.cartlist.length;
  }

  order() {
    if(this.length > 0) {
      this._auth.alertPopUp('success', 'Your Bill has been download momentary');
      setTimeout(()=> {
        this.generarPDF();
      }, 2000);
    } else {
      this._auth.alertPopUp('error', 'Order cart is empty!');
    }
    setTimeout(()=> {
      this.router.navigate(['/main/dashboard']);
    }, 2500);
  }

  generarPDF() {

    const div = document.getElementById('register_details');
    const options = {
      background: 'white',
      scale: 3
    };

    html2canvas(div, options).then((canvas) => {

      var img = canvas.toDataURL("image/PNG");
      var doc = new jsPDF('l', 'mm', 'a4');

      // Add image Canvas to PDF
      const bufferX = 100;
      const bufferY = 0;
      const imgProps = (<any>doc).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      // console.log("pdfHeight :", pdfHeight + " pdfWidth :" , pdfWidth);
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');

      return doc;
    }).then((doc) => {
      var today = new Date();
      var dd = today.getDate();

      var mm = today.getMonth()+1; 
      var yyyy = today.getFullYear();
      let date, month;

      if(dd<10) 
      {
          date='0'+dd;
      } else {
        date = dd;
      }

      if(mm<10) 
      {
          month='0'+mm;
      } else {
        month = mm;
      }
      let name = date+"-"+month+"-"+yyyy+"_cart_details.pdf";
      doc.save(name);  
    });
  }
}
