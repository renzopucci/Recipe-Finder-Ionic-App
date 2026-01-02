import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../services/recipe.service';
import { StorageService } from '../services/storage.service';


@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.page.html',
  styleUrls: ['./recipe-details.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class RecipeDetailsPage implements OnInit {
  recipeId!: number;
  recipe: any;
  measurement: 'metric' | 'us' = 'metric';
  isFav = false;



  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private storageService: StorageService
  ) {}

  ngOnInit() {
    this.measurement = this.storageService.getMeasurement();
    this.recipeId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadRecipe();
  }

  loadRecipe() {
    this.recipeService.getRecipeDetails(this.recipeId).subscribe({
      next: (data: any) => {
        this.recipe = data;
        this.isFav = this.storageService.isFavourite(this.recipeId);
      },
      error: (err: any) => {
        console.error('Error loading recipe details', err);
      },
    });
  }
  toggleFavourite() {
  if (!this.recipe) return;

  if (this.isFav) {
    this.storageService.removeFavourite(this.recipeId);
    this.isFav = false;
  } else {
    this.storageService.addFavourite({
      id: this.recipeId,
      title: this.recipe.title,
      image: this.recipe.image,
    });
    this.isFav = true;
  }
}

}
