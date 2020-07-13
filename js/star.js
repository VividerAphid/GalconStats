function star(id, x, y, name, value, clanId, clanName, colour, routes, factionId, production){
    this.id = id;
    this.x = this.convertCoord(x);
    this.y = this.convertCoord(y);
    this.name = name;
    this.value = value;
    this.clanId = clanId;
    this.clanName = clanName;
    this.colour = colour;
    this.routes = this.convertRoutes(routes);
    this.factionId = factionId;
    this.production = production;

    this.radius = 5;
    this.selected = false;
    this.isConst = false;
    this.isPrize = false;
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
    if(this.routes[0] != 0){
        var reps = this.routes.length;
        for(var r = 0; r < reps; r++){;
            var targ = this.routes[r] - 1
            var connectee = map[targ].id - 1;
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
    
}

star.prototype.drawDebugs = function(G){
        G.fillStyle = "#fff";
		G.strokeStyle = "#fff";
		G.font = "20px Arial";
		G.fillText(this.id, this.x -20, this.y -20);
}

star.prototype.convertRoutes = function(rout){
    var routeStr = rout.split(";");
    for(var r = 0; r < routeStr.length; r++){
        routeStr[r] = routeStr[r] * 1;
        if(routeStr[r] < 0){
            routeStr[r] = routeStr[r] * -1;
        }
    }
    return routeStr;
}

star.prototype.convertCoord = function(ic){
    return ic + 1250;
}