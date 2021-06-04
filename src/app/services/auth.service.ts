import { Injectable, Injector, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import * as CryptoJS from 'crypto-js';
import  * as config from 'configuration.json';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import Swal from 'sweetalert2';  
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  url;
  public spinner: NgxSpinnerService;

  constructor(private http: HttpClient, private injector: Injector, private router: Router) { 
    this.spinner = injector.get(NgxSpinnerService);
  }

  setToken(key, value) {
    // var data = this.encryptData(value);
    localStorage.setItem(key, this.encryptData(value));
    // localStorage.setItem(key,this.encryptData(value));
    // localStorage.setItem(key,value);
  }

  getToken(key) {
      // let data = localStorage.getItem(key);
      return this.decryptData(localStorage.getItem(key));
  }

  removeToken(key) {
      localStorage.removeItem(key);
  }

  encryptData(data) {
      try {
          return CryptoJS.AES.encrypt(JSON.stringify(data), config.secret_key).toString();
      } catch (e) {
          // console.log(e);
      }
  }

  decryptData(data) {
    try {
        const bytes = CryptoJS.AES.decrypt(data, config.secret_key);
        if (bytes.toString()) {
            return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        }
        return data;
    } catch (e) {
        // console.log(e);
    }
  }
  
  logout(msg) {
    localStorage.clear();
    this.router.navigate(['/auth/login']);
  }

  API(method, url, data, withToken?, isform?) {
    let headers;
    if (isform) {
        headers = new HttpHeaders({ 'X-Requested-With': 'XMLHttpRequest' });
    }
    if (!isform) {
        headers = new HttpHeaders({ 'content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest' });
    }
    if (withToken) {
        if(this.getToken('auth_token')) {
            // this.url = config.url + url + '?api_token=' + this.getToken('auth_token');
        }
    } else {
        this.url = config.url + url;
    }
    // console.log(this.url)
    return new Promise((resolve, reject) => {

        if (method === 'get') {
            this.showloader();
          this.http.get(this.url, { headers }).subscribe((data: any) => {
            this.hideloader();
            if (data.success === true) {
              resolve({ success: true, data: data });
            } else if (data.success === false) {
                this.alertPopUp('error', data.message);
                setTimeout(() => {
                    this.logout(data.message);
                }, 3000);
            } else if (data.message === 'No token provided' || data.message === 'Token invalid') {
                this.alertPopUp('error', data.message);
                setTimeout(() => {
                    this.logout(data.message);
                }, 3000);
            } else {
                console.log('first');
                // this.hideloader();
                resolve({ success: false, data: data });
            }
          }, error => {
              this.hideloader();
              // console.log('second');
              this.alertPopUp('error', 'Internal Server Error');
              // this.hideloader();
              resolve(error);
          });
        } else if (method === 'post') {

            this.http.post(this.url, data, { headers }).subscribe((data: any) => {
                this.hideloader();
                if (data.success) {
                    resolve({ success: true, data: data });
                } else if (data.success === false) {
                    this.alertPopUp('error', data.message);
                    setTimeout(() => {
                        this.logout(data.message);
                    }, 3000);
                } else if (data.message === 'No token provided' || data.message === 'Token invalid') {
                    this.alertPopUp('error', data.message);
                    setTimeout(() => {
                        this.logout(data.message);
                    }, 3000);
                } else {
                    // console.log("invalid");
                    resolve({ success: false, data: data });
                }
            }, error => {
                this.hideloader();
                this.alertPopUp('error', 'Internal Server Error');
                resolve(error);
            });
        } else if (method === 'put') {
            this.showloader();
            this.http.put(this.url, data, { headers }).subscribe((data: any) => {
                this.hideloader();
                if (data.success === true) {
                    this.alertPopUp('success', data.message);
                      resolve({ success: true, data: data });
                } else if (data.success === false) {
                    this.logout(data.message);

                } else if (data.message === 'No token provided' || data.message === 'Token invalid') {
                    this.alertPopUp('error', data.message);
                    setTimeout(() => {
                        this.logout(data.message);
                    }, 3000);
                } else {
                    resolve({ success: false, data: data });
                }
            }, error => {
                this.hideloader();
                this.alertPopUp('error', 'Internal Server Error');
                resolve(error);
            });
        } else if (method === 'delete') {
            this.showloader();
            this.http.delete(this.url, { headers }).subscribe((data: any) => {
                this.hideloader();
                if (data.success === true) {
                    this.alertPopUp('success', data.message);
                    resolve({ success: true, data: data });
                    setTimeout(() => {
                        this.logout(data.message);
                    }, 3000);
                } else if (data.success === false) {
                    this.alertPopUp('error', data.message);
                    setTimeout(() => {
                        this.logout(data.message);
                    }, 3000);
                } else if (data.message === 'No token provided' || data.message === 'Token invalid') {
                    this.alertPopUp('error', data.message);
                    setTimeout(() => {
                        this.logout(data.message);
                    }, 3000);
                } else {
                    resolve({ success: false, data: data });
                }
            }, error => {
                this.hideloader();
                this.alertPopUp('error', 'Internal Server Error');
                resolve(error);
            });
        }
    });
  }

  alertPopUp(type, title) {
        Swal.fire({
            position: 'center',
            icon: type,
            title: title,
            showConfirmButton: false,
            timer: 3000
        });
    }

    showloader() {
        this.spinner.show();
    }

    hideloader() {
        this.spinner.hide();
    }
}
