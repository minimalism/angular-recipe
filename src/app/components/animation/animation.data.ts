export abstract class Animation {
    private static idCtr:number = 1;
    private static nextId() {
        return "anim"+Animation.idCtr++;
    }   
    static ReverseToken : string = "-reverse";
    id : string;
    reverseId : string;
    
    constructor(public onStep : number, public targetId : string){
        this.id = Animation.nextId() + targetId;
        this.reverseId = this.id + Animation.ReverseToken;
    }
    
    abstract getRules();
}

export class Move extends Animation {
    constructor(onStep : number, targetId : string, public moveToId : string) {
        super(onStep, targetId);
        
    }
    
    getRules (){
        var targetElement : HTMLElement = document.getElementById(this.targetId);
        var moveToElement : HTMLElement = document.getElementById(this.moveToId);
        
        var moveToRect = moveToElement.getBoundingClientRect();
        var targetRect = targetElement.getBoundingClientRect();
        
        var moveToCenter = {
            x: moveToRect.left + moveToRect.width / 2,
            y: moveToRect.top + moveToRect.height / 2
        }
        var targetCenter = {
            x: targetRect.left + targetRect.width / 2,
            y: targetRect.top + targetRect.height / 2
        }
        
        var translateTop = moveToCenter.y - targetCenter.y;
        var translateLeft = moveToCenter.x - targetCenter.x;
        var rules = `transform:translate(${translateLeft}px,${translateTop}px);`
        return rules;
    }
}

export class Chop extends Animation {
    
    constructor(onStep : number, public chopTargetId : string) {
        super(onStep, 'utensil-knife');
        
    }
    
    getRules (){
        return `background-color: #FF0`;
        //return `background-image: url('http://andreascarlson.se/img/sprite.png')`;
    }
}

export class Pour extends Animation {
    getRules (){
        return "transform:rotate(-90deg);";
    }
}