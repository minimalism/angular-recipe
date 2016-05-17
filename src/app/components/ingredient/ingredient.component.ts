import { Component, Input } from '@angular/core'; 
import { Ingredient } from '../ingredient/ingredient.data.ts';
import { AnimationService } from '../../services/animation.service.ts';

@Component({
    selector: 'ingredient',
    styleUrls: [
        require('app/components/ingredient/ingredient.style.scss')
    ],
    templateUrl: 'app/components/ingredient/ingredient.template.html'
})
export class IngredientComponent {
    @Input('data') ingredient : Ingredient;
    
    constructor(animationService : AnimationService){
    }
    

}