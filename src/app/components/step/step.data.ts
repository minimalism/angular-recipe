import { Ingredient, Utensil } from '../ingredient/ingredient.data';

export class Step { 
    private static idCtr:number = 1;
    private static nextId() {
        return "step"+Step.idCtr++;
    }   
    id : string = Step.nextId();
    top : number;
    height : number;
    
    constructor(public description : string, public ingredients? : Ingredient[], public utensils? : Utensil[]){
    }
}