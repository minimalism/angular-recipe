import { Component, Input } from '@angular/core'; 
import { Ingredient } from '../ingredient/ingredient.data.ts';

@Component({
    selector: 'ingredient',
    styleUrls: [
        require('app/ingredient/ingredient.style.scss')
    ],
    templateUrl: 'app/ingredient/ingredient.template.html'
})
export class IngredientComponent {
    @Input('data') ingredient : Ingredient;
    
    constructor(){
        
    }
}