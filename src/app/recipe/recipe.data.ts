import { Step } from '../step/step.data';

export class Recipe {
    name : string;
    steps : Step[];
    
    constructor(name : string, steps : Step[]){
        this.name = name;
        this.steps = steps;
    }
}