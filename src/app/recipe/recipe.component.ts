import { Component, Input } from '@angular/core'; 
import { Recipe } from './recipe.data.ts';
import { Step } from '../step/step.data.ts';
import { StepComponent } from '../step/step.component.ts';
import { IngredientComponent } from '../ingredient/ingredient.component.ts';

@Component({
    selector: 'recipe',
    directives: [ StepComponent, IngredientComponent ],
    styleUrls: [
        require('app/recipe/recipe.style.scss')
    ],
    templateUrl: 'app/recipe/recipe.template.html'
})
export class RecipeComponent {
    @Input('data') recipe : Recipe;
    
    constructor(){
        
    }
}