import { Step } from '../step/step.data';
import { Ingredient } from '../ingredient/ingredient.data'

export class Recipe {
    name : string;
    steps : Step[];
    ingredients : Ingredient[];
    
    constructor(name : string, steps : Step[]){
        this.name = name;
        this.steps = steps;
        this.ingredients = [];
        
        for (var step of this.steps){
            if (step.ingredients){
                for (var ingredient of step.ingredients){
                    this.ingredients.push(ingredient);
                }
            //step.ingredients.forEach()
            }
        }
    }
}