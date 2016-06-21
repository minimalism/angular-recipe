import { Injectable, Inject } from '@angular/core';
import { Recipe } from './../components/recipe/recipe.data';
import { Step } from './../components/step/step.data';
import { Ingredient, Utensil } from './../components/ingredient/ingredient.data';
import { Move, Chop, Pour } from './../components/animation/animation.data';

@Injectable()
export class RecipeService {
  
    constructor() {
      
    }
  
    getRecipe(){
      
        var steps = [ new Step("Before you begin, make sure you have all the necessary ingredients.",
                [ ]),
              new Step("Begin by chopping up the broccoli and the onion.", 
                [ new Ingredient("broccoli", "Broccoli", "1"),
                  new Ingredient("onion", "Yellow Onion", "1") ],
                [ new Utensil("knife") ]),
                
              new Step("Fry the broccoli in olive oil. After a few minutes, add the onion.", 
                [ new Ingredient("oil", "Olive oil", "0ml") ],
                [ new Utensil("frying-pan") ]),
                
              new Step("Mix the Soy sauce and Sriracha into a bowl. Add 100dl cold water.", 
                [ new Ingredient("soy", "Soy Sauce (Japanese)", "0dl"),
                  new Ingredient("chili", "Sriracha", "0dl") ],
                [ new Utensil("bowl") ]),
                
              new Step("Add the cornstarch to the bowl, and stir until the clumps have dissolved.", 
                [  new Ingredient("bouillon", "Vegetable bouillon", "0.5"),
                   new Ingredient("garlic", "Garlic", "2 cloves"),
                   new Ingredient("cornstarch",  "Cornstarch", "0dl") ]),
                
              new Step("Mix the contents of the bowl into the frying pan and let simmer until it thickens.", 
                [ ]),
                
              new Step("Add the cooked lentils and stir.", 
                [  new Ingredient("lentils", "Red Lentils", "0dl"),
                ]),
                
              new Step("Ready to eat!",
                [  new Ingredient("choi", "Bok-choi", "2"),
                ]),

            ];
      
        var animations = [
          new Move(1.1, 'broccoli', "cooking-area"),
          new Chop(1.3, 'broccoli'),
          new Move(1.5, 'onion', "cooking-area"),
          new Chop(1.8, 'onion'),
          new Move(2.1, 'oil', "cooking-area"),
          new Pour(2.3, 'oil'),
          new Move(3.2, 'soy', "cooking-area"),
          new Pour(3.3, 'soy'),
          new Move(3.4, 'chili', "cooking-area"),
          new Pour(3.6, 'chili'),
          new Move(4.1, 'bouillon', "cooking-area"),
          new Move(4.3, 'garlic', "cooking-area"),
          new Move(4.5, 'cornstarch', "cooking-area"),
          new Move(6.1, 'lentils', "cooking-area"),
          new Move(7, 'choi', "cooking-area"),
         // new Pour(2.1, 'oil', "cooking-area"),
        ];
      
        return new Recipe("A recipe for brocc-choi", steps, animations);
    }
}