import { Injectable } from '@angular/core';
import { Recipe } from './../components/recipe/recipe.data';
import { Step } from './../components/step/step.data';
import { Ingredient } from './../components/ingredient/ingredient.data';

@Injectable()
export class RecipeService {
    getRecipe(){
        return new Recipe("A recipe for brocc-choi", 
            [ new Step("Before you begin, make sure you have all the necessary ingredients.",
                [ ]),
              new Step("Begin by chopping up the broccoli and the onion.", 
                [ new Ingredient("Broccoli", "1 "),
                  new Ingredient("Yellow Onion", "1") ]),
                
              new Step("Fry the broccoli in olive oil. After a few minutes, add the onion.", 
                [ new Ingredient("Olive oil", "0ml"), 
                ]),
                
              new Step("Mix the Soy sauce and Sriracha into a bowl. Add 100dl cold water.", 
                [ new Ingredient("Soy Sauce (Japanese)", "0dl"),
                  new Ingredient("Sriracha", "0dl"),  
                ]),
                
              new Step("Add the cornstarch to the bowl, and stir until the clumps have dissolved.", 
                [  new Ingredient("Vegetable bouillon", "0.5"),
                   new Ingredient("Garlic", "2 cloves"),
                ]),
                
              new Step("Mix the contents of the bowl into the frying pan and let simmer until it thickens.", 
                [  new Ingredient("Cornstarch", "0dl"),
                ]),
                
              new Step("Add the cooked lentils and stir.", 
                [  new Ingredient("Red Lentils", "0dl"),
                ]),
                
              new Step("Ready to eat!",
                [  new Ingredient("Bok-choi", "2"),
                ]),

            ]);
    }
}