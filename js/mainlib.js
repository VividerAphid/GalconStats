function render(map, g){
    console.log("render called");
    for(var r = 0; r < map.length; r++){
        map[r].drawRoutes(g, map);
    }
    for(var r = 0; r < map.length; r++){
        map[r].drawStar(g);
    }
}

function loadMap(){
    console.log("load map");
    var map = [new star(0, 50, 50, "mins1", 100, 1, "MinsClan", "#0ff", "1;2", 1, 42),
        new star(1, 150, 150, "mins2", 100, 1, "MinsClan", "#0ff", "0;2", 1, 55),
        new star(2, 150, 50, "mins3", 100, 2, "MinsClan2", "#f0f", "0;1", 2, 75)];
    return map;
}

function readFiles(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText.split("\n"));
        }
    };
    xhttp.open("GET", "GALAXY.txt", true);
    xhttp.send();
}   