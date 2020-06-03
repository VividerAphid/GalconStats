function render(map, g){
    for(var r = 0; r < map.length; r++){
        map[r].drawRoutes(g, map);
    }
    for(var r = 0; r < map.length; r++){
        map[r].drawStar(g);
    }
}

function loadMap(mapIn){
    var outmap = [];
    for(var r = 1; r < mapIn.length; r++){
        var temp = mapIn[r];
        outmap[r-1] = new star(temp[0] * 1, temp[1] * 1, temp[2] * 1, temp[3], temp[4] * 1, temp[5] * 1, temp[6], "#" + temp[7], temp[8], temp[9] * 1, temp[10]*1)
    }
    //console.log(outmap);
    return outmap;
}

function readFile(target){
    var data = [];
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            //Do the things here
            data = parseData(this.responseText.split("\n"));
            console.log(data);
            console.log("Done?");
        }
    };
    xhttp.open("GET", target, true);
    xhttp.send();

    console.log("data after: ");
    console.log(data);

    return data;
}

function parseData(raw){
    var converted = [];
    for(var r = 0; r < raw.length; r++){
        converted[r] = raw[r].split("\t");
    }
    return converted;
}