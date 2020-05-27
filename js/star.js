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

    this.radius = 10;
    this.selected = false;
}

star.prototype.drawStar = function(G){
    G.beginPath();

    G.fillStyle = this.colour;
    G.strokeStyle = this.colour;

    G.arc(this.x, this.y, (this.radius*2), 0, 2*Math.PI);
    G.fill();
    G.stroke();

    if(this.selected){
        G.lineWidth = 2;
        G.strokeStyle = "#0ff";
        G.beginPath();
        G.arc(this.x, this.y, this.radius*2 + 8, 0, 2*Math.PI);
        G.stroke();
    }
}