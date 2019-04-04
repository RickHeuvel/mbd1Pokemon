import { Injectable } from '@angular/core';
import {LocalNotifications} from '@ionic-native/local-notifications/ngx';
import {NavController, AlertController, Platform} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(public navCtrl: NavController, private platform: Platform, private localNotifications: LocalNotifications) {
    this.platform.ready().then((rdy) => {

   //    this.localNotifications.on('click', (notification, state) => {
   //      let json = new js
   //    })
    });
  }

  public planNotification() {
    this.localNotifications.schedule({
      id: 1,
      title: 'Pokemons',
      text: 'ga is heel snel pokemons vangen',
      trigger: {at: new Date(new Date().getTime() + 10 * 1000 )}
    });
  }
}
