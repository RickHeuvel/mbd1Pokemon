import { Injectable } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import {environment} from '../../environments/environment';
import {LocationService} from './location.service';
import {PokemonService} from './pokemon.service';
import {pokemonModel} from '../models/pokemon-model';
import * as turf from '@turf/turf';
import {LngLat} from 'mapbox-gl';
import {Observable, of} from 'rxjs';
import {Router} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class MapService {

  map: mapboxgl.Map;
  currentPos: LngLat;


  constructor(private locationService: LocationService, private pokemonService: PokemonService,  private router: Router) {
    Object.getOwnPropertyDescriptor(mapboxgl, 'accessToken').set(environment.mapbox.accessToken);
  }


  private async createMap() {

    await this.locationService.getCurrentLocation().then((pos) => {
      this.currentPos = new LngLat( pos.coords.longitude, pos.coords.latitude);
      this.map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/rickheuvel/cju00t3r10flu1fny6swuqk0l',
        center: this.currentPos,
        zoom: 12,
        pitch: 45,
        scrollZoom: true,
        attributionControl: false
      });
    }).catch(error => console.log(error));

    this.map.addControl(new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true,
      showUserLocation: true,
    }));
    this.fillMap();
  }

  fillMap() {
        let num;
        for ( num = 0; num < 10; num++) {
          this.addMarker(this.pokemonService.getRandomPokemon());
        }
  }
  async addMarker(pokemon: pokemonModel) {
    const rPos = await this.locationService.getRandomLocation();

    let marker;
    const element = document.createElement('div');
    element.title = pokemon.name;
    element.style.backgroundImage = 'url(' + pokemon.sprite + ')';
    element.style.width = '96px';
    element.style.height = '96px';

     element.addEventListener('click', () => this.catchPokemon(marker));

     marker = new mapboxgl.Marker(element)
        .setLngLat([rPos.longitude, rPos.latitude])
        .addTo(this.map);
  }


  private catchPokemon(marker: mapboxgl.Marker) {

    if (this.getDistence(marker.getLngLat()) > 0.2) {
      const popup = new mapboxgl.Popup({closeOnClick: false})
          .setLngLat(marker.getLngLat())
          .setText('deze pokemon is buiten je bereik')
          .addTo(this.map);
    } else {
      this.router.navigate(['catch/' + marker.getElement().title] );
     // this.pokemonService.catchPokemon(marker.getElement().title);
      marker.remove();
    }
  }

  private getDistence(cord: LngLat) {
    const from = turf.point(cord.toArray());
    const to = turf.point(this.currentPos.toArray());
    const options = {units: 'kilometers'};

    // @ts-ignore
    const distance = turf.distance(from, to, options);

    return distance;
  }
  // @ts-ignore
  public showMap(): Observable {
    this.createMap();

    const observable = new Observable(observer => {
      observer.next(this.map);
    });
    return observable;

  }
}
