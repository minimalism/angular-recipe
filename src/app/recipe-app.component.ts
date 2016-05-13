import {Component} from '@angular/core';
import {RecipeService} from "./recipe/recipe.service";
import {RecipeComponent} from "./recipe/recipe.component";
import {Recipe} from "./recipe/recipe.data";
import {StepComponent} from "./step/step.component";
import {Step} from "./step/step.data";

@Component({
  selector: 'recipe-app',
  providers: [ RecipeService ],
  pipes: [],
  directives: [ RecipeComponent ],
  templateUrl: 'app/recipe-app.html',
  styleUrls: [
    require('app/recipe-app.style.scss')
  ],
})
export class RecipeApp {
  recipe : Recipe;
  
  constructor(private recipeService : RecipeService) {
    this.recipe = recipeService.getRecipe();
  }

}
