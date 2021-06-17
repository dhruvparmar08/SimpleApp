import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, ValidatorFn } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  editForm: FormGroup;
  _id: string;
  disable: boolean = true;
  
  @ViewChild('content', { 'static': true}) content:any;

  constructor(private fb: FormBuilder, private _auth: AuthService, private router: Router) { 
    this.editForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(/^(([a-zA-Z]{3,20})+[ ]+([a-zA-Z]{3,20})+)+$/)]],
      email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/)]],
      mobile: ['', [Validators.required, Validators.pattern(/^((\+)?(\d{2}[-]))?(\d{10}){1}?$/)]],
      address: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    this.getUserdetails();
  }

  getUserdetails() {

    const url = "me";
    this._auth.API('post', url, '', false).then((res: any) => {
      if(res.success === true) {
        if(res.data.success === true) {
          this._id = res.data.data._id;
          this.editForm.patchValue({
            name: res.data.data.name,
            email: res.data.data.email,
            mobile: res.data.data.mobile,
            address: res.data.data.address
          })
        }
      }
    })
  }

  submit() {
    if(this.editForm.valid) {
      const url = "edit?_id=" + this._id;

      this._auth.API('put', url, this.editForm.value, false).then((res: any) => {
        if(res.success === true) {
          if(res.data.success === true) {
            setTimeout(() => {
              window.location.reload();
            }, 3000);
          }
        }
      })
    }
  }

  delete() {
    const url = 'delete?_id=' + this._id;

    this._auth.API('delete', url, '', false).then((res :any) => {
      if(res.success === true) {
        setTimeout(() =>{
          this._auth.logout("logging out");
        }, 3000);
      }
    })
  }

  enable_edit() {
    this.disable = !this.disable;
  }

  dwnload() {
    this._auth.alertPopUp('success', 'Your details has been download momentary');
    setTimeout(()=> {
      this.generarPDF();
    }, 2500);
  }

  generarPDF() {

    const div = document.getElementById('content');
    const options = {
      background: 'white',
      scale: 3
    };

    html2canvas(div, options).then((canvas) => {

      var img = canvas.toDataURL("image/PNG");
      var doc = new jsPDF('l', 'mm', 'a4');

      // Add image Canvas to PDF
      const bufferX = 70;
      const bufferY = 35;
      const imgProps = (<any>doc).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      console.log("pdfHeight :", pdfHeight + " pdfWidth :" , pdfWidth);
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
      let name = date+"-"+month+"-"+yyyy+"_your_details.pdf";
      doc.save(name);  
    });
  }
}
