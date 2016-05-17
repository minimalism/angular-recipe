import { Injectable } from '@angular/core';

@Injectable()
export class AnimationService {
    
    
    stylesheet;
    
    constructor(){
        var style = document.createElement("style");//document.styleSheets[document.styleSheets.length-1];
        style.appendChild(document.createTextNode(""));
        document.head.appendChild(style);
        this.stylesheet = style.sheet;
        
        this.createKeyframes();
    }
    
    createKeyframes(){
        var index = this.stylesheet.insertRule(`
            @keyframes wiggle {
                to { 
                    left:-250px;
                    margin-top:50px; 
                }
            }`, 0);
        
        this.stylesheet.insertRule(`
            @keyframes unwiggle {
                from { 
                    left:-250px;
                    margin-top:50px; 
                }
            }
        `, 1);
        
        this.stylesheet.insertRule(`
        .animated{
            animation: wiggle 1s ease 1 forwards;
        }`, 2);
        
        this.stylesheet.insertRule(`
        .deanimated {
            animation: unwiggle 1s ease 1 forwards;
        }`, 3);
    }
    
    unanimate(id : string){
        var heart = document.getElementById(id);
        
        heart.classList.remove('animated');
        heart.classList.add('deanimated');
        
    }
    
    animate(id : string){
        
        var heart = document.getElementById(id);
        
        heart.classList.remove('deanimated');
        heart.classList.add('animated');
    }
}