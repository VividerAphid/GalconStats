function star(id, x, y, name, value, clanId, clanName, colour, routes, factionId, production){
    this.id = id;
    this.x = x;
    this.y = y;
    this.name = name;
    this.value = value;
    this.clanId = clanId;
    this.clanName = clanName;
    this.colour = colour;
    this.routes = this.convertRoutes(routes);
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

star.prototype.drawRoutes = function(G, map){
    var reps = this.routes.length;
    for(var r = 0; r < reps; r++){
        var connectee = map[this.routes[r]].id;
        if(connectee > this.id){
            G.beginPath();
            G.lineWidth = 3;
            if(this.factionId == map[connectee].factionId){
                G.fillStyle = this.colour;
                G.strokeStyle = this.colour;
            }
            else{
                G.fillStyle = "#999";
                G.strokeStyle = "#999";
            }
            G.moveTo(this.x, this.y);
            G.lineTo(map[connectee].x, map[connectee].y);
            G.stroke();
        }
    }
}

star.prototype.convertRoutes = function(rout){
    var routeStr = rout.split(";");
    console.log(routeStr);
    for(var r = 0; r < routeStr.length; r++){
        routeStr[r] = routeStr[r] * 1;
    }
    return routeStr;
}