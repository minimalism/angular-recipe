import { Component, Input, AfterViewInit, ElementRef, ViewChild } from '@angular/core'; 
import { Recipe } from './recipe.data.ts';
import { Step } from '../step/step.data.ts';
import { StepComponent } from '../step/step.component.ts';
import { IngredientComponent } from '../ingredient/ingredient.component.ts';
import { ScrollSpyDirective, ScrollSpyService} from 'ng2-scrollspy';


@Component({
    selector: 'recipe',
    directives: [ StepComponent, IngredientComponent, ScrollSpyDirective ],
    styleUrls: [
        require('app/recipe/recipe.style.scss')
    ],
    templateUrl: 'app/recipe/recipe.template.html'
})
export class RecipeComponent implements AfterViewInit {
    @Input('data') recipe : Recipe;
    
    ingredientsListStyle;
    
    constructor(private scrollSpyService: ScrollSpyService){
         this.scrollSpyService = scrollSpyService;
    }
    
    ngAfterViewInit() {
        this.scrollSpyService.getObservable('window').subscribe((e: any) => {

            var ingredients = e.target.querySelector(".ingredient-list")
            if (ingredients){
                var clientRect = ingredients.getBoundingClientRect();
                var windowTop = (window.pageYOffset || e.target.scrollTop)  - (e.target.clientTop || 0);
                if (this.ingredientsListStyle === undefined && clientRect.top < 100){
                    this.ingredientsListStyle = { 
                        "position" : 'fixed',
                        "top" : clientRect.top + 'px',
                        "left" : clientRect.left + 'px'
                    };
                }
                else if (this.ingredientsListStyle !== undefined && windowTop < 540){
                    
                    delete this.ingredientsListStyle;
                }
            }
        });
    }
}