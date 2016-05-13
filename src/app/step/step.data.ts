import { Ingredient } from '../ingredient/ingredient.data';

export class Step {
    
    description : string;
    ingredients : Ingredient[];
    
    constructor(description : string, ingredients? : Ingredient[]){
        this.description = description;
        this.ingredients = ingredients;
    }
}