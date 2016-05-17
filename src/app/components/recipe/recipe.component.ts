import { Component, Input, AfterViewInit, ElementRef, ViewChild } from '@angular/core'; 
import { Recipe } from './recipe.data.ts';
import { Step } from '../step/step.data.ts';
import { Ingredient } from '../ingredient/ingredient.data.ts';
import { StepComponent } from '../step/step.component.ts';
import { IngredientComponent } from '../ingredient/ingredient.component.ts';
import { AnimationService } from '../../services/animation.service.ts';

import { ScrollSpyDirective, ScrollSpyService} from 'ng2-scrollspy';
import * as _ from 'lodash';


@Component({
    selector: 'recipe',
    providers: [ AnimationService ],
    directives: [ StepComponent, IngredientComponent, ScrollSpyDirective ],
    styleUrls: [
        require('app/components/recipe/recipe.style.scss')
    ],
    templateUrl: 'app/components/recipe/recipe.template.html'
})
export class RecipeComponent implements AfterViewInit {
    @Input('data') recipe : Recipe;
    unusedIngredients : Array<Ingredient> = [];
    usedIngredients : Array<Ingredient> = [];
    
    targetedId = "right-column";
    targetedContainerSuffix = "container___"; 
    ingredientsListStyle;

    constructor(private scrollSpyService: ScrollSpyService, private animationService : AnimationService){
         this.scrollSpyService = scrollSpyService;
         
    }
    
    updateStickyDiv(e : any) {
        
    }
    
    onResize($event){
        if (this.ingredientsListStyle){
            var ingredientsContainer = document.querySelector('#' + this.targetedId + this.targetedContainerSuffix);
            var clientRect = ingredientsContainer.getBoundingClientRect();
            this.ingredientsListStyle.left = clientRect.left + "px";
        }
    }

    
    ngAfterViewInit() {
        var ctrl = this;
        
        for (var ingredient of this.recipe.ingredients){
            this.unusedIngredients.push(ingredient);
        }
        
        this.scrollSpyService.getObservable('window').subscribe((e: any) => {
            // Check which steps have been taken and ingredients used along the Y scrollbar
             var windowTop = (window.pageYOffset || e.target.scrollTop)  - (e.target.clientTop || 0);
            ctrl.unusedIngredients = _(ctrl.unusedIngredients).dropWhile((ingredient : Ingredient) => {
                if (ingredient.scrollY < windowTop){
                    ingredient.use();
                    ctrl.usedIngredients.unshift(ingredient);
                    //console.log("used " + ingredient.name);
                    this.animationService.animate(ingredient.spriteId);
                    return true;
                }
                return false;
            }).value();
            
            ctrl.usedIngredients = _(ctrl.usedIngredients).dropWhile((ingredient : Ingredient) => {
                if (ingredient.scrollY > windowTop){
                    //console.log("unused " + ingredient.name);
                    ingredient.unuse();
                    ctrl.unusedIngredients.unshift(ingredient);
                    this.animationService.unanimate(ingredient.spriteId);
                    return true;
                }
                return false;
            }).value();

            var ingredients = document.querySelector('#'+this.targetedId);
            if (ingredients){

                var stickheight = 0;
                var clientRect = ingredients.getBoundingClientRect();
                windowTop;
                                
                if (this.ingredientsListStyle === undefined && clientRect.top < stickheight){
                    var containerId = this.targetedId + this.targetedContainerSuffix;
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
                        container.style.width = computedStyle.width;
                        ingredients.parentElement.insertBefore(container, ingredients);
                    }
                    
                    // Stick to current height
                    this.ingredientsListStyle = { 
                        "position" : 'fixed',
                        "top" : stickheight + 'px',
                        "left" : clientRect.left + 'px'
                    };
                }
                else if (this.ingredientsListStyle !== undefined){
                    // Unstick
                    var containerId = this.targetedId + this.targetedContainerSuffix;
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