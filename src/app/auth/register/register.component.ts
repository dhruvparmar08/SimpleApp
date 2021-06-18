import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, ValidatorFn } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

function passwordMatchValidator(password: string): ValidatorFn {
  return (control: FormControl) => {
    // console.log(control)
    if (!control || !control.parent) {
      return null;
    }
    return control.parent.get(password).value === control.value ? null : { mismatch: true };
  };
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  visible: boolean = false;
  visible1: boolean = false;

  constructor(private fb: FormBuilder, private _auth: AuthService, private router: Router, private route: ActivatedRoute) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(/^(([a-zA-Z]{3,20})+[ ]+([a-zA-Z]{3,20})+)+$/)]],
      email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/)], this.emailValidator.bind(this)],
      mobile: ['', [Validators.required, Validators.pattern(/^((\+)?(\d{2}[-]))?(\d{10}){1}?$/)], this.mobileValidator.bind(this)],
      gender: ['', Validators.required],
      address: ['', Validators.required],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/)]],
      confirmpassword: ['', [Validators.required, passwordMatchValidator('password')]]
    })
  }

  ngOnInit(): void {
    this.registerForm.controls['email'].patchValue(this.route.snapshot.paramMap.get('email'));
  }

  submit() {

    if(this.registerForm.valid) {

      let data = {
        name: this.registerForm.controls['name'].value,
        email: this.registerForm.controls['email'].value,
        mobile: this.registerForm.controls['mobile'].value.toString(),
        gender: this.registerForm.controls['gender'].value,
        address: this.registerForm.controls['address'].value,
        password: this.registerForm.controls['password'].value
      }

      const url = 'register';
      this._auth.API('post', url, data, false, false).then((res: any) => {
        this._auth.showloader();
        if(res.success == true) {
          if(res.data.success === true) {
            this.registerForm.reset();
            this.router.navigate(['/auth/login']);
          }
        }
      })
    }
  }

  emailValidator(control : FormControl) {
    const q = new Promise((resolve, reject) => {
      let data = {
        email: control.value
      }
      console.log(data);
      const url = 'checkemail';
      this._auth.API('post', url, data, false, false).then((res: any)=> {
        console.log(res)
        if(res.success === true) {
          resolve(null) 
        } else {
          resolve({ 'isEmailExist': true })
        }
      });
    });
      return q;
  }

  mobileValidator(control : FormControl) {
    const q = new Promise((resolve, reject) => {
      let data = {
        mobile: control.value
      }
      console.log(data);
      const url = 'checkmobile';
      this._auth.API('post', url, data, false, false).then((res: any)=> {
        if(res.success === true) {
          resolve(null) 
        } else {
          resolve({ 'isMobileExist': true })
        }
      });
    });
      return q;
  }
}
