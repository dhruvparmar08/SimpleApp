import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
// import {MatPaginator} from '@angular/material/paginator';
// import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {

  constructor(private _api: AuthService) { }

  displayedColumns: string[] = ['name', 'email', 'mobile', 'address'];
  dataSource = new  MatTableDataSource();

  ngOnInit(): void {
    this.getdetails();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getdetails() {
    const url = "allusers"
    this._api.API('get', url, '', false, false).then((res: any)=> {
      if(res.success === true) {
        if(res.data.success === true) {
          this.dataSource = new MatTableDataSource(res.data.data);
        }
      }
    })
  }
}