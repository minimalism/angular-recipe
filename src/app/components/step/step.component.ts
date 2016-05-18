import { Component, Input, AfterViewInit } from '@angular/core'; 
import { Step } from './step.data.ts';

@Component({
    selector: 'recipe-step',
    styleUrls: [
        require('app/components/step/step.style.scss')
    ],
    templateUrl: 'app/components/step/step.template.html'
})
export class StepComponent {
    @Input() stepData : Step;
    
    constructor(){
    }
    
    /*ngAfterViewInit() {
        var stepDiv = document.querySelector('#'+this.stepData.id);
        var top = stepDiv.getBoundingClientRect().top;
        
        var windowTop = (window.pageYOffset || document.documentElement.scrollTop)  - (document.documentElement.clientTop || 0);
        
        for (var ingredient of this.stepData.ingredients){ 
            ingredient.scrollY = top + windowTop;
        }
    }*/
}