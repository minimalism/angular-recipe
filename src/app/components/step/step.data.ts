import { Ingredient } from '../ingredient/ingredient.data';

export class Step { 
    private static idCtr:number = 1;
    private static nextId() {
        return "step"+Step.idCtr++;
    }   
    description : string;
    ingredients : Ingredient[];
    id : string = Step.nextId();
    
    constructor(description : string, ingredients? : Ingredient[]){
        this.description = description;
        this.ingredients = ingredients;
    }
}