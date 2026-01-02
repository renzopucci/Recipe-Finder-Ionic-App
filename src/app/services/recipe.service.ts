import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface RecipeSearchResult {
  id: number;
  title: string;
  image: string;
}

interface SpoonacularSearchResponse {
  results: RecipeSearchResult[];
}

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private readonly apiKey = '70759a4f7911402abcc53d3c51d3b759';
  private readonly baseUrl = 'https://api.spoonacular.com/recipes';

  constructor(private http: HttpClient) {}

  searchRecipes(query: string): Observable<RecipeSearchResult[]> {
    const params = new HttpParams()
      .set('query', query)
      .set('apiKey', this.apiKey);

    return this.http
      .get<SpoonacularSearchResponse>(`${this.baseUrl}/complexSearch`, { params })
      .pipe(map((res) => res.results));
  }
  getRecipeDetails(id: number): Observable<any> {
  const params = new HttpParams().set('apiKey', this.apiKey);

  return this.http.get<any>(
    `${this.baseUrl}/${id}/information`,
    { params }
  );
}

}
