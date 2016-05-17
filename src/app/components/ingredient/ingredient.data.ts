export class Ingredient {
  private static idCtr:number = 1;
  private static nextId() {
      return "ingredient"+Ingredient.idCtr++;
  }   
  name : string;
  amount : string;
  id : string = Ingredient.nextId();
  spriteId : string = this.id + "_sprite"; 
  scrollY : number;
  used : boolean;

  constructor(name: string, amount: string) {
    this.name = name;
    this.amount = amount;
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