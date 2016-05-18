export abstract class Animation {
    private static idCtr:number = 1;
    private static nextId() {
        return "anim"+Animation.idCtr++;
    }   
    static ReverseToken : string = "-reverse";
    id : string;
    reverseId : string;
    rules : string;
    
    constructor(public onStep : number, public targetId : string){
        this.id = Animation.nextId() + targetId;
        this.reverseId = this.id + Animation.ReverseToken;
        this.rules = this.getRules();
    }
    
    abstract getRules();
}

export class Move extends Animation {
    constructor(onStep : number, targetId : string, public moveToId : string) {
        super(onStep, targetId);
        
    }
    
    getRules (){
        return "transform:translate(-250px,250px);";
    }
}

export class Chop extends Animation {
    getRules (){
        return "transform:scale(2);";
    }
}

export class Pour extends Animation {
    getRules (){
        return "transform:rotate(90deg);";
    }
}