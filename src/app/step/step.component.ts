import { Component, Input } from '@angular/core'; 
import { Step } from './step.data.ts';

@Component({
    selector: 'recipe-step',
    styleUrls: [
        require('app/step/step.style.scss')
    ],
    templateUrl: 'app/step/step.template.html'
})
export class StepComponent {
    @Input() stepData : Step;
    
    constructor(){
    }
}