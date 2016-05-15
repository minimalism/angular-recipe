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
    
    updateStickyDiv(e : any) {
        
    }
    
    ngAfterViewInit() {
        
        this.scrollSpyService.getObservable('window').subscribe((e: any) => {
            var targetedId = "ingredient-list";
            var targetedContainerSuffix = "container___"; 

            var ingredients = e.target.querySelector('#'+targetedId)
            if (ingredients){

                var stickheight = 100;
                var clientRect = ingredients.getBoundingClientRect();
                var windowTop = (window.pageYOffset || e.target.scrollTop)  - (e.target.clientTop || 0);
                                
                if (this.ingredientsListStyle === undefined && clientRect.top < stickheight){
                    var containerId = targetedId + targetedContainerSuffix;
                    // find previously created container in dom?
                    var container = e.target.querySelector('#'+containerId);
                    if (!container){
                        container = document.createElement("div");
                        container.setAttribute("id", containerId); 
                        var computedStyle = window.getComputedStyle(ingredients);
                        container.style.position = computedStyle.position;
                        container.style.top = computedStyle.top; 
                        container.style.left = computedStyle.left;
                        container.style.right = computedStyle.right;
                        container.style.bottom = computedStyle.bottom;
                        ingredients.parentElement.insertBefore(container, ingredients);
                    }
                    
                    // Stick to current height
                    this.ingredientsListStyle = { 
                        "position" : 'fixed',
                        "top" : clientRect.top + 'px',
                        "left" : clientRect.left + 'px'
                    };
                }
                else if (this.ingredientsListStyle !== undefined){
                    // Unstick
                    var containerId = targetedId + targetedContainerSuffix;
                    var ingredientsContainer = e.target.querySelector('#'+containerId);
                    if (ingredientsContainer){
                        var containerClientRect = ingredientsContainer.getBoundingClientRect();
                        if (containerClientRect.top > clientRect.top){
                            delete this.ingredientsListStyle;
                            ingredientsContainer.remove();
                        }
                    }
                    else{
                        console.log("no ingredients container found :0");
                    }
                }
            }
        });
    }
}