import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private readonly MEASUREMENT_KEY = 'measurement';

  getMeasurement(): 'metric' | 'us' {
    const value = localStorage.getItem(this.MEASUREMENT_KEY);
    return value === 'us' ? 'us' : 'metric';
  }

  setMeasurement(value: 'metric' | 'us'): void {
    localStorage.setItem(this.MEASUREMENT_KEY, value);
  }
}
