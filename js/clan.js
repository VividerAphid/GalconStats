class clan{
    constructor(id, name, faction, logoData){
        this.id = id;
        this.name = name;
        this.faction = faction;
        this.logoData = logoData;
    }
    colour(){
        return this.faction.colour;
    }
}