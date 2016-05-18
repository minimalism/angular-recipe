import { Injectable } from '@angular/core';
import { Animation, Move } from '../components/animation/animation.data.ts';
import * as _ from 'lodash';
import * as $q from 'q';

@Injectable()
export class AnimationService {

    private currentStep : number = 0;
    
    private playing : $q.Deferred<{}>;
    
    private keyframeId : number = 0;
    private keyframes = {};
    
    private animations : Array<Animation> = [];
    private animationTargets = {};
    private animationLayers = {};
    
    private stylesheet;
    
    constructor(){
        var style = document.createElement("style");
        style.appendChild(document.createTextNode(""));
        document.head.appendChild(style);
        this.stylesheet = style.sheet;
        this.playing = $q.defer();
    }
    
    private createKeyFrame(id : string, rules : string) {
        console.assert(!this.keyframes[id], "Keyframe with id " + id + " already exists.");
        this.keyframes[id] = this.stylesheet.insertRule("@keyframes " + id + " { " + rules + " }", this.keyframeId++);
    }
    
    generateAnimationLayers(animations : Animation[]){
        this.animations = animations;
        
        for (var animation of animations){
            
            this.createKeyFrame(animation.id, 'to { ' + animation.rules + ' }');
            this.createKeyFrame(animation.reverseId, 'from { ' + animation.rules + ' }');
            
            this.stylesheet.insertRule('.' + animation.id + `{
                animation: `+ animation.id +` 1s ease 1 forwards;
            }`, 1);
            
            this.stylesheet.insertRule('.' + animation.reverseId + ` {
                animation: `+ animation.id +`-reverse 1s ease 1 forwards;
            }`, 1);
            
            if (!this.animationTargets[animation.targetId]){
                this.animationTargets[animation.targetId] = {
                    element : document.getElementById(animation.targetId)
                }
            }
            
            var animationTarget = this.animationTargets[animation.targetId].element;
            
            // Splice in a new parent for this animation
            var parent = animationTarget.parentElement;
            animationTarget.remove();
            var animationLayer = document.createElement("div");
            animationLayer.setAttribute("id", animation.id);
            animationLayer.classList.add("animation");
            animationLayer.appendChild(animationTarget);
            animationLayer.addEventListener("webkitAnimationEnd", this.onAnimationFinished.bind(this));
            parent.appendChild(animationLayer);
            
            this.animationLayers[animation.id] = animationLayer;
        }
        
        // Ready to play
        this.playing.resolve(null);
    }
    
    private onAnimationFinished($event : AnimationEvent){
        if (this.playing.promise.isPending()){
            var animationId = $event.animationName;
            var isRewind = false;
            
            var animation;
            if (_.endsWith($event.animationName, Animation.ReverseToken)){
                isRewind = true;
                animationId = animationId.replace(Animation.ReverseToken, "");
                
                var animationIndex = _(this.animations).findIndex((anim : Animation) => { return anim.id === animationId });
                if (animationIndex > 0){
                    animation = this.animations[animationIndex-1];
                }
            }
            else{
                animation = _(this.animations).find((anim : Animation) => { return anim.id === animationId });
            }
            
            this.playing.resolve(animation);
        }
    }   
      
    private getNextAnimation(previousAnimation? : Animation) : Animation {
        var previousStep = 0;
        if (previousAnimation){
            previousStep = previousAnimation.onStep;
        }
        
        var currStep = this.currentStep;
        
        if (currStep < previousStep){
            // We wanna rewind?
            return _(this.animations).findLast((anim : Animation) => {
                return anim.onStep > currStep && anim.onStep < previousStep;
            });  
        }
        else {
            return _(this.animations).find((anim : Animation) => {
                return anim.onStep < currStep && anim.onStep > previousStep;
            });  
        }
    }
      
    private playNext(){
        
        if (!this.playing.promise.isPending()){
            var svc = this;
            this.playing.promise.then((previousAnimation : Animation) => {
                var nextAnimation = svc.getNextAnimation(previousAnimation);
                
                if (nextAnimation !== previousAnimation){
                    
                    var resetState = !nextAnimation 
                        && previousAnimation === svc.animations[0] 
                        && this.currentStep < previousAnimation.onStep;
                    
                    if (resetState || (previousAnimation && nextAnimation.onStep < previousAnimation.onStep)){
                        console.log("Rewinding " + previousAnimation.id);
                        
                        var animationLayer = svc.animationLayers[previousAnimation.id];
                        
                        svc.playing = $q.defer();
                        svc.playing.promise.then(( animation : Animation) => {
                            animationLayer.classList.remove(animation.reverseId);
                            svc.playNext();
                        });
                        
                        animationLayer.classList.remove(previousAnimation.id);
                        animationLayer.classList.add(previousAnimation.reverseId);
                    }
                    else if (nextAnimation){
                        console.log("playing " + nextAnimation.id);
                        
                        // We are ready to play a new animation
                        svc.playing = $q.defer();
                        svc.playing.promise.then(( animation : Animation) => {
                            svc.playNext();
                        });
                        
                        var animationLayer = svc.animationLayers[nextAnimation.id];
                        animationLayer.classList.add(nextAnimation.id);
                    }
                }
            });
        }
    }
    
    setStep(newStep : number){
        if (newStep != this.currentStep){
            this.currentStep = newStep;
            this.playNext();
        }
    }
}