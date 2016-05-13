import { Injectable } from '@angular/core';
import { Recipe } from './recipe.data';
import { Step } from '../step/step.data';
import { Ingredient } from '../ingredient/ingredient.data';

@Injectable()
export class RecipeService {
    getRecipe(){
        return new Recipe("Fried broccoli", 
        
            [ new Step("Chop up the broccoli", 
                [ new Ingredient("Broccoli") ]),
                
              new Step("Fry the broccoli in olive oil", 
                [ new Ingredient("Broccoli"), 
                  new Ingredient("Olive Oil")
                ]),
                
              new Step("Ready to eat!")
            ]);
    }
}