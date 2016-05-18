import { Step } from '../step/step.data';
import { Ingredient } from '../ingredient/ingredient.data';
import { Animation } from '../animation/animation.data';

export class Recipe {
    ingredients : Ingredient[] = [];
    ingredientsListPosition : string = "relative";
    ingredientsListTop : string = "25px";
    
    constructor(public name : string, public steps : Step[], public animations : Animation[]){
        for (var step of this.steps){
            if (step.ingredients){
                for (var ingredient of step.ingredients){
                    this.ingredients.push(ingredient);
                }
            }
        }
    }
}