import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { SocialAuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  login_Form: FormGroup;
  login_mobile: FormGroup;
  enable: boolean = false;
  visible: boolean = false;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private _auth: AuthService, private authService: SocialAuthService) {

    this.login_mobile = this.fb.group({
      mobile: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
    this.login_Form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  mobile_submit() {
    if(this.login_mobile.valid) {
      let data = {
        mobile: this.login_mobile.controls['mobile'].value,
        password: this.login_mobile.controls['password'].value
      }
      let x = 'auth_token';
      const url = "authenticate";

      this._auth.API('post', url, data, false, false).then((res: any)=> {
        this.reset();
        this._auth.showloader();
        if(res.success === true) {
          if(res.data.success === true) {
            this._auth.setToken('auth_token', res.data.token);
            this.router.navigate(['/main/dashboard']);
          }
        }
      })
    }
  }

  email_submit() {
    if(this.login_Form.valid) {
      let data = {
        email: this.login_Form.controls['email'].value,
        password: this.login_Form.controls['password'].value
      }
      const url = "authenticate";

      this._auth.API('post', url, data, false, false).then((res: any)=> {
        this._auth.showloader();
        if(res.success === true) {
          if(res.data.success === true) {
            this.reset();
            this._auth.setToken('auth_token', res.data.token);
            this.router.navigate(['/main/dashboard']);
            this._auth.alertPopUp('success', res.data.message);
          }
        }
      })
    }
  }

  reset() {
    this.login_Form.reset();
    this.login_mobile.reset();
  }

  check(e) {
    if(e.value == '2') {
      this.enable = true;
    } else {
      this.enable = false;
    }
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((res: any) => {
      // console.log(res.response.id_token);
      const url = "authenticate-google";
      let data = {
        tokenId: res.response.id_token
      }

      this._auth.API('post', url, data, false, false).then((res: any) => {
        console.log(res);
        if(res.data.success === true) {
          this._auth.setToken('auth_token', res.data.token);
          this._auth.setToken('login_type', 'Google');
          this._auth.alertPopUp('success', res.data.message);
          setTimeout(() => {
            this.router.navigate(['/main/dashboard']);
          }, 3000);
        } else {
          this._auth.setToken('name', res.data.data.name);
          this._auth.setToken('email', res.data.data.email);
          this.router.navigate(['/auth/register']);
        }
      })
      // this.google(res.response.id_token);
    }, err => console.log(err))
  }

  forget() {
    this.router.navigate(['/auth/forget-password']);
  }
}
