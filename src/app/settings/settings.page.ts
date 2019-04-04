import { Component, OnInit } from '@angular/core';
import {NotificationsService} from '../services/notifications.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(private notificationService: NotificationsService) { }

  ngOnInit() {
  }

    sceduleNotification() {
      this.notificationService.planNotification();
    }
}
