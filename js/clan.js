class clan{
    constructor(id, name, faction, logoData){
        this.id = id;
        this.name = name;
        this.rawScore = 0;
        this.score = 0;
        this.starCount = 0;
        this.faction = faction;
        this.logoData = logoData;
    }
    colour(){
        return this.faction.colour;
    }
}