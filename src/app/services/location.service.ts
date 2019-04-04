import { Injectable } from '@angular/core';
import {Geolocation, Geoposition} from '@ionic-native/geolocation/ngx';
import {RandomCoordinateUtils, LatLng} from '@molteni/coordinate-utils';


@Injectable({
  providedIn: 'root'
})
export class LocationService {

  location: Promise<Geoposition>;

  constructor(private geolocation: Geolocation) {
  }

  async getRandomLocation() {
    let position;

    await this.getCurrentLocation().then((pos) => {
          position = new LatLng(pos.coords.latitude, pos.coords.longitude);
      }).catch(error => console.log(error));

    const result = RandomCoordinateUtils.randomCoordinateFromPosition(position, 0.5);
    return result;
  }

  public getCurrentLocation() {
    this.location = this.geolocation.getCurrentPosition();
    return this.location;
  }
}
