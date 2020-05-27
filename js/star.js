function star(id, x, y, name, value, clanId, clanName, colour, routes, factionId, production){
    this.id = id;
    this.x = x;
    this.y = y;
    this.name = name;
    this.value = value;
    this.clanId = clanId;
    this.clanName = clanName;
    this.colour = colour;
    this.routes = routes;
    this.factionId = factionId;
    this.production = production;
    this.selected = false;
}

star.prototype.drawStar = function(){
    G.beginPath();
    if(settings.fog){
        G.fillStyle = "#666";
        G.strokeStyle = "#666";
    }
    else{
        //console.log("hit?");
        G.fillStyle = this.teamColour;
        G.strokeStyle = this.teamColour;
        //console.log(G.fillStyle + " / " + G.strokeStyle);
    }
    G.arc(this.x, this.y, (this.radius*2), 0, 2*Math.PI);
    G.fill();
    G.stroke();
    
    if(settings.fog == false){
        G.beginPath();
        if(this.lockLife > 0){
            G.fillStyle = "#000";
            G.strokeStyle = "#000";
        }
        else{
            G.fillStyle = this.colour;
            G.strokeStyle = this.colour;
        }
        G.arc(this.x, this.y, (this.radius*2) - 5, 0, 2*Math.PI);
        G.fill();
        G.stroke();
    }

    if(this.hasShield && settings.fog == false){
        G.lineWidth = 2;
        G.strokeStyle = "#0ff";
        G.beginPath();
        G.arc(this.x, this.y, this.radius*2 + 8, 0, 2*Math.PI);
        G.stroke();
    }
}