//// class for dice object 
class Dice {
    constructor(keep) {
        
        this.value = this.roll(keep);
        
        
    }
    roll(keep) {
        if (keep > 0) {
            return keep;
        } else {
            return Math.floor(Math.random() * 6) + 1;
        } 
    }

    //? lägg till dice img som metod här?
    
}