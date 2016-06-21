import { Component, Input, AfterViewInit, ElementRef, ViewChild } from '@angular/core'; 
import { Recipe } from './recipe.data.ts';
import { Step } from '../step/step.data.ts';
import { Ingredient } from '../ingredient/ingredient.data.ts';
import { StepComponent } from '../step/step.component.ts';
import { IngredientComponent } from '../ingredient/ingredient.component.ts';
import { AnimationService } from '../../services/animation.service.ts';
import { Animation } from '../animation/animation.data.ts';

import { ScrollSpyDirective, ScrollSpyService} from 'ng2-scrollspy';
import * as _ from 'lodash';


@Component({
    selector: 'recipe',
    providers: [ ],
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
    
    private animations : Boolean = false;

    private windowTop : number = 0;
    targetedId = "right-column";
    targetedContainerSuffix = "container___"; 
    ingredientsListStyle;

    constructor(private scrollSpyService: ScrollSpyService, private animationService : AnimationService){
         this.scrollSpyService = scrollSpyService;
         
    }
    
    onResize($event){
        if (this.ingredientsListStyle){
            var ingredientsContainer = document.querySelector('#' + this.targetedId + this.targetedContainerSuffix);
            var clientRect = ingredientsContainer.getBoundingClientRect();
            this.ingredientsListStyle.left = clientRect.left + "px";
        }
        
        this.recalculateStepY();
    }
    
    private recalculateStepY() {
        for (var step of this.recipe.steps){
            var stepContainer = document.querySelector('#' + step.id);
            var clientRect = stepContainer.getBoundingClientRect();
            
            step.top = clientRect.top + this.windowTop;
            step.height = clientRect.height;
        }
    }
    
    ngAfterViewInit() {
        var ctrl = this;
        
        for (var ingredient of this.recipe.ingredients){
            this.unusedIngredients.push(ingredient);
        }
        
        this.recalculateStepY();
        
        this.animationService.generateAnimationLayers(this.recipe.animations);

        this.scrollSpyService.getObservable('window').subscribe((e: any) => {
            
            var wtop = this.windowTop = (window.pageYOffset || document.documentElement.scrollTop)  - (document.documentElement.clientTop || 0);
            
            if (this.animations){
                // Calculate current animationstep
                var stepIndex = _.findIndex(this.recipe.steps, (step : Step) => {
                    return step.top > wtop
                });
                if (stepIndex > -1){
                    if (stepIndex > 0){
                        var prevCompletedStep = this.recipe.steps[stepIndex-1];
                        this.animationService.setStep(stepIndex + (wtop - prevCompletedStep.top) / prevCompletedStep.height);
                    }
                    else{
                        this.animationService.setStep(0);
                    } 
                }
                else{
                    this.animationService.setStep(999);
                }
            }
            
            // Check which steps have been taken and ingredients used along the Y scrollbar
            /*ctrl.unusedIngredients = _(ctrl.unusedIngredients).dropWhile((ingredient : Ingredient) => {
                if (ingredient.scrollY < this.windowTop){
                    ingredient.use();
                    ctrl.usedIngredients.unshift(ingredient);
                    
                    return true;
                }
                return false;
            }).value();
            
            ctrl.usedIngredients = _(ctrl.usedIngredients).dropWhile((ingredient : Ingredient) => {
                if (ingredient.scrollY > this.windowTop){
                    ingredient.unuse();
                    ctrl.unusedIngredients.unshift(ingredient);
                    //this.animationService.unanimate(new Animation(ingredient.spriteId, "cooking-area"));
                    return true;
                }
                return false;
            }).value();*/

            var ingredients = document.querySelector('#'+this.targetedId);
            if (ingredients){

                var stickheight = 0;
                var clientRect = ingredients.getBoundingClientRect();
                                
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