import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

let Menu = [
  {
     id: 1,
     image: "../../../assets/images/maggi.jpg",
     name:"maggi",
     category: "breakfast",
     price: 12,
     description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. ',
     quantity:1
 },

 {
     id: 2,
     image: "../../../assets/images/Aalu_pakora.jpg",
     name:"allu pakoida",
     category: "evening",
     price: 20,
     description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. ',
     quantity:1
 },
 {
     id: 3,
     image: "../../../assets/images/Masala-Corn.jpg",
     name:"corn",
     category: "breakfast",
     price: 10,
     description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. ',
     quantity:1
 },
  {
     id: 4,
     image: "../../../assets/images/Chole-Kulcha.jpg",
     name:"chola",
     category: "lunch",
     price: 50,
     description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. ',
     quantity:1
 },
   {
     id: 5,
     image: "../../../assets/images/pizza.jpg",
     name:"pizza",
     category: "evening",
     price: 80,
     description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. ',
     quantity:1
 },
    {
     id: 6,
     image: "../../../assets/images/nonveg_thali.jpg",
     name:"Non-Veg Thali",
     category: "dinner",
     price: 180,
     description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. ',
     quantity:1
 },
     {
     id: 7,
     image: "../../../assets/images/sweets.jpg",
     name:"Sweets",
     category: "dinner",
     price: 60,
     description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. ',
     quantity:1
 },
     {
     id: 8,
     image: "../../../assets/images/rajma_rice.jpg",
     name:"Rajma Rice",
     category: "lunch",
     price: 60,
     description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. ',
     quantity:1
 },
     {
     id: 9,
     image: "../../../assets/images/Samosa.jpg",
     name:"samaso",
     category: "evening",
     price: 10,
     description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. ',
     quantity:1
 },
];

@Component({
  selector: 'app-menudetails',
  templateUrl: './menudetails.component.html',
  styleUrls: ['./menudetails.component.scss']
})
export class MenudetailsComponent implements OnInit {

  menulist: any[];
  number: number = 1;
  cartlist: any[] = [];
  length: number = this.cartlist.length;

  constructor(private _auth: AuthService, private router: Router) { 
    
    this.menulist = Menu;

    this._auth.showloader();
    setTimeout(() => {
      this._auth.hideloader();
    }, 2000);
  }

  ngOnInit(): void {
    this.cartlist = [];
    this._auth.removeToken('cart-details');
  }

  opencart() {
    this._auth.setToken("cart-details", this.cartlist);
    this.router.navigate(['/main/cartnow']);
  }

  enable(e, data) {
    if(e.checked) {
      this.cartlist.push(data);
    } else {
      for (var i = 0; i < this.cartlist.length; i++) {
        var obj = this.cartlist[i];
    
        if (data.id === obj.id) {
            this.cartlist.splice(i, 1);
        }
      }
    }
    this.length = this.cartlist.length;
  }
}
