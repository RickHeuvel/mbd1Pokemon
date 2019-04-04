import {Component, OnInit} from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import {MapService} from '../services/map.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  map: mapboxgl.Map;

  constructor(private mapService: MapService) {

  }

  loadView() {
    this.mapService.showMap().subscribe(this.map);
  }

  ngOnInit() {
   this.loadView();
  }
}
