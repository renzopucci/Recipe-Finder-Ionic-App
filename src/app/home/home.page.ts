import { RouterLink } from '@angular/router';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RecipeService, RecipeSearchResult } from '../services/recipe.service';

@Component({
  
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink],
  
})
export class HomePage {
  ingredients = '';
  recipes: RecipeSearchResult[] = [];
  isLoading = false;
  errorMessage = '';

  constructor(private recipeService: RecipeService) {}

  search() {
    const q = this.ingredients.trim();

    this.errorMessage = '';
    this.recipes = [];

    if (!q) {
      this.errorMessage = 'Please enter at least one ingredient.';
      return;
    }

    this.isLoading = true;

    this.recipeService.searchRecipes(q).subscribe({
      next: (results) => {
        this.recipes = results ?? [];
        if (this.recipes.length === 0) {
          this.errorMessage = 'No recipes found. Try different ingredients.';
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Error calling Spoonacular API.';
        this.isLoading = false;
      },
    });
  }
}
