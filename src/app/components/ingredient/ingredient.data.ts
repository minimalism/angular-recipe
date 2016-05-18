export class Ingredient {
  containerId : string; 
  //scrollY : number;
  used : boolean;

  constructor(public id : string, public name: string, public amount: string) {
    this.containerId = id + "container";
  }
  
    use(){
      console.assert(!this.used, "Ingredient " + this.name + " was already used!");
      this.used = true;
    }
    unuse(){
      console.assert(this.used, "Ingredient " + this.name + " wasn't used!");
      this.used = false;
    }
}