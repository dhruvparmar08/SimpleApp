import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  name: string;
  constructor(private _auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.getUserdetails();
  }

  getUserdetails() {

    const url = "me";
    this._auth.API('post', url, '', false).then((res: any) => {
      this._auth.showloader();
      if(res.success === true) {
        if(res.data.success === true) {
          this.name = res.data.data.name;
        }
      }
    })
  }

  logout() {
    this._auth.alertPopUp('success', 'loging out...');
    this._auth.logout("loging out...");
  }

  openhome() {
    this.router.navigate(['/main/dashboard']);
  }
  openprofile() {
    this.router.navigate(['/main/profile']);
  }
}
