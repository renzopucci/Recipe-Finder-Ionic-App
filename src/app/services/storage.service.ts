import { Injectable } from '@angular/core';

export interface FavouriteRecipe {
  id: number;
  title: string;
  image: string;
}

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private readonly MEASUREMENT_KEY = 'measurement';
  private readonly FAV_KEY = 'favourites';

  // ---- measurement ----
  getMeasurement(): 'metric' | 'us' {
    const value = localStorage.getItem(this.MEASUREMENT_KEY);
    return value === 'us' ? 'us' : 'metric';
  }

  setMeasurement(value: 'metric' | 'us'): void {
    localStorage.setItem(this.MEASUREMENT_KEY, value);
  }

  // ---- favourites ----
  getFavourites(): FavouriteRecipe[] {
    const raw = localStorage.getItem(this.FAV_KEY);
    if (!raw) return [];
    try {
      return JSON.parse(raw) as FavouriteRecipe[];
    } catch {
      return [];
    }
  }

  isFavourite(id: number): boolean {
    return this.getFavourites().some(r => r.id === id);
  }

  addFavourite(recipe: FavouriteRecipe): void {
    const list = this.getFavourites();
    if (list.some(r => r.id === recipe.id)) return;
    list.push(recipe);
    localStorage.setItem(this.FAV_KEY, JSON.stringify(list));
  }

  removeFavourite(id: number): void {
    const list = this.getFavourites().filter(r => r.id !== id);
    localStorage.setItem(this.FAV_KEY, JSON.stringify(list));
  }
}
