import { Injectable, Injector, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import * as CryptoJS from 'crypto-js';
import * as config from 'configuration.json';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  public url: any = environment.url;

  constructor(private http: HttpClient, private injector: Injector, private router: Router) { }

  addproducts(req) {
    return this.http.post(`${this.url}/addproducts`, req);
  }

  getproducts(limit: any, page: any) {
    return this.http.get(`${this.url}/getproducts?limit=${limit}&page=${page}`);
  }

  addorder(req: any) {
    return this.http.post(`${this.url}/addorder`, req);
  }

  getorderdetails() {
    return this.http.get(`${this.url}/getorderdetails`);
  }

  removecart(id: any) {
    return this.http.delete(`${this.url}/removecart/${id}`);
  }

  place_order() {
    return this.http.get(`${this.url}/place_order`);
  }

  updatecart(req: any, id: any) {
    return this.http.put(`${this.url}/updatecart/${id}`, req);
  }
}
