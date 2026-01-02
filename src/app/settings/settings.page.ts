import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class SettingsPage {
  measurement: 'metric' | 'us' = 'metric';

  constructor(private storageService: StorageService) {}

  ionViewWillEnter() {
    this.measurement = this.storageService.getMeasurement();
  }

  onChange() {
    this.storageService.setMeasurement(this.measurement);
  }
}
