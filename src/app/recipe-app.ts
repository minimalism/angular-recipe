import {Component} from '@angular/core';
import {RecipeService} from "./recipe/recipe.service";
import {Recipe} from "./recipe/recipe.data";

@Component({
  selector: 'recipe-app',
  providers: [ RecipeService ],
  pipes: [],
  directives: [ ],
  templateUrl: 'app/recipe-app.html',
})
export class RecipeApp {
  recipe : Recipe;
  
  constructor(private recipeService : RecipeService) {
    this.recipe = recipeService.getRecipe();
  }

}
