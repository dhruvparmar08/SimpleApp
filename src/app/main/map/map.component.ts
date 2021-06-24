import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  constructor() { }

  lat: number = 23.091130;
  lng: number = 72.512510;

  ngOnInit(): void {
  }

}
