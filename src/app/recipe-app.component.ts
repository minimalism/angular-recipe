import {Component} from '@angular/core';
import {RecipeService} from "./services/recipe.service";
import {RecipeComponent} from "./components/recipe/recipe.component";
import {Recipe} from "./components/recipe/recipe.data";
import {StepComponent} from "./components/step/step.component";
import {Step} from "./components/step/step.data";

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
