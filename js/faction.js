class faction{
    constructor(id, name, colour, score){
        this.id = id;
        this.name = name;
        this.colour = colour;
        this.clans = [];
        this.score = score;
        this.hitStash = 0;
    }
    getStarCount(){
        let total = 0;
        for(let r = 0; r < this.clans.length; r++){
            total += this.clans[r].starCount;
        }
        return total;
    }
}