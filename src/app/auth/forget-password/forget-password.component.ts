import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  visible: boolean = false;

  constructor(private _formBuilder: FormBuilder, private _auth: AuthService, private router: Router) { 
    this.firstFormGroup = this._formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/)]]
    });
    this.secondFormGroup = this._formBuilder.group({
      password: ['', [Validators.required, Validators.pattern(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/)]]
    });
  }

  ngOnInit(): void {
  }

  submit() {

    if(this.firstFormGroup.valid && this.secondFormGroup.valid) {
      console.log(this.firstFormGroup.value);
      console.log(this.secondFormGroup.value);
      let data = {
        email: this.firstFormGroup.controls['email'].value,
        password: this.secondFormGroup.controls['password'].value
      }
      const url = 'savepassword';

      this._auth.API('put', url, data, false).then((res: any)=> {
        console.log(res);
        if(res.success === true) {
          this._auth.alertPopUp('success', res.data.message);
          setTimeout(() => {
            this.router.navigate(['/auth/login']);
          }, 1500);
        }
      })
    }
  }

  checkmail() {
    if(this.firstFormGroup.valid) {
      let data = {
        email: this.firstFormGroup.controls['email'].value
      }

      const url = 'checkemailaddress';

      this._auth.API('post', url, data, false, false).then((res: any) => {
        console.log(res);
        if(res.success === true) {

        } else {
          this.router.navigate(['/auth/login']);
        }
      })
    }
  }
}
