function render(map, g){
    console.log("render called");
    for(var r = 0; r < map.length; r++){
        map[r].drawStar(g);
    }
}

function loadMap(){
    console.log("load map");
    var map = [new star(1, 20, 20, "mins", 100, 1, "MinsClan", "#0ff", "2;3", 1, 42)];
    return map;
}

function readFiles(){
    
}