import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  name: string;
  destroyed = new Subject<void>();
  currentScreenSize: string;

  displayNameMap = new Map([
    [Breakpoints.XSmall, 'XSmall'],
    [Breakpoints.Small, 'Small'],
    [Breakpoints.Medium, 'Medium'],
    [Breakpoints.Large, 'Large'],
    [Breakpoints.XLarge, 'XLarge'],
  ]);

  constructor(private _auth: AuthService, private router: Router, breakpointObserver: BreakpointObserver) { 
    breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge,
    ]).pipe(takeUntil(this.destroyed)).subscribe(result => {
        for (const query of Object.keys(result.breakpoints)) {
          if (result.breakpoints[query]) {
            this.currentScreenSize = this.displayNameMap.get(query) ?? 'Unknown';
          }
        }
    });
  }

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

  openuserdata() {
    this.router.navigate(['/main/User-details']);
  }

  openprofile() {
    this.router.navigate(['/main/profile']);
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }
}
