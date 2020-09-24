/* //// class för fem img objekt
//! används inte än, får testa mer senare
class DiceIcons {
    constructor() {
        this.img = document.createElement("img");
        this.img.className = "dice_img unsaved";
        this.img.src = "resources/images/dice/dice-0.png" //// gör loop
        this.img.saved = false;
        this.dice_container.appendChild(img);
        //// toggle save dice event
        this.img.addEventListener("click", function(e) {
            if (this.saved === false) {
                console.log("saved");
                img.className = "dice_img saved";
                this.saved = true;
                console.log(this.saved);
            } else {
                this.saved = false;
                console.log("unsaved");
                img.className = "dice_img unsaved";
                console.log(this.saved);
            }
        });
    }
    createImg() {
        let img = document.createElement("img");
        img.className = "dice_img unsaved";
        img.src = "resources/images/dice/dice-0.png" //// gör loop
        img.saved = false;
        dice_container.appendChild(img); 
        //// toggle save dice event
        img.addEventListener("click", function(e) {
            if (this.saved === false) {
                console.log("saved");
                img.className = "dice_img saved";
                this.saved = true;
                console.log(this.saved);
            } else {
                this.saved = false;
                console.log("unsaved");
                img.className = "dice_img unsaved";
                console.log(this.saved);
            }
    }
} */