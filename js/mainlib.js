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
    getData("GALAXY.txt").then(function(res){
        console.log("Found!");
        data = parseData(res);
        console.log(data);
    },
     function(err){
        console.error("Failed!", err);
     }
    );

    return data;
}

function getData(target){
    return new Promise(function(resolveGet, rejectGet){
        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", target, true);
        xhttp.onload = function() {
            if (this.status == 200) {
                resolveGet(this.response);
            }
            else{
                rejectGet(Error(this.statusText));
            }
        };
        xhttp.onerror = function(){rejectGet(Error("Network error"))};
        xhttp.send();
    });
    
}

function parseData(raw){
    var converted = [];
    for(var r = 0; r < raw.length; r++){
        converted[r] = raw[r].split("\t");
    }
    return converted;
}

function resolveGet(res){
    console.log(res);
}

function rejectGet(err){
    throw(err);
}