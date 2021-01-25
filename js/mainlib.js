function render(map, g){
    g.beginPath();
    g.fillStyle = "#222";
    g.fillRect(0,0,mapCan.width, mapCan.height);
    for(var r = 0; r < map.length; r++){
        map[r].drawRoutes(g, map);
    }
    selectMysteryEdges("+");
    for(var r = 0; r < map.length; r++){
        map[r].drawStar(g);
        if(debug){
            map[r].drawDebugs(g);
        }
    }
}

function loadMap(mapIn){
    var outmap = [];
    for(var r = 1; r < mapIn.length; r++){
        var temp = mapIn[r];
        outmap[r-1] = new star(temp[0] * 1, temp[1] * 1, temp[2] * 1, temp[3], temp[4] * 1, temp[5] * 1, temp[6], "#" + temp[7], temp[8], temp[9] * 1, temp[10]*1);
        mysteryEdges[r] = temp[8].split(";");
        //mysteryEdges.push(temp[8].split(";"));
        if(outmap[r-1].colour == "#"){
            outmap[r-1].colour = "#fff";
        }
    }
    //console.log(outmap);
    return outmap;
}

function loadFactions(facIn){
    var outFacs = {idList: []};
    for(var r = 1; r <facIn.length; r++){
        var temp = facIn[r];
        outFacs[temp[0]] = new faction(temp[0] * 1, temp[2], "#" + temp[1], temp[5]*1);
        outFacs.idList.push(temp[0]);
    }

    return outFacs;
}

function loadClans(clansIn){
    let outClans = {idList: []};
    let count = clansIn.length;
    for(let r = 1; r < count; r++){
        let temp = clansIn[r];
        let tempId = clansIn[r][0];
        if(clansIn[r][6] > 0){
            outClans[tempId] = new clan(tempId, clansIn[r][1], factions[clansIn[r][6]], clansIn[r][3]);
            outClans.idList.push(tempId);
        }
    }
    return outClans;
}

function readFile(target, type){
    getData(target).then(function(res){
        let typeStr;
        let dat = parseData(res.split("\n"));
        switch(type){
            case 0:
                mapData = loadMap(dat);
                render(mapData, g);
                typeStr = "GALAXY.txt!";
                break;
            case 1:
                hitData = dat;
                typeStr = "HITS.txt!";
                break;
            case 2:
                factions = loadFactions(dat);
                if(!scoreBoardLoaded){
                    buildScoreboard();
                }
                fillFactionScores();
                if(mapData != undefined){
                    totalHits();
                }
                else{
                    console.log("Map Data not loaded yet, hits were not totalled");
                }
                typeStr = "FACTIONS.txt!";
                break;
            case 3:
                if(factions != undefined){
                    clans = loadClans(dat);
                    console.log(clans);
                    factioniseClans();
                    calcClanScores();
                    fillClanScores();
                }
                typeStr = "CLANS.txt!";
                break;   
        }
        console.log("Retrieved " + typeStr);
    },
     function(err){
        console.error("Failed!", err);
     });
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

function selectRoutes(targID){
    var base = mapData[targID];
    for(var r = 0; r < base.routes.length; r++){
        var temp = base.routes[r];
        mapData[temp - 1].selected = true;
    }
    render(mapData, g);
}

function totalHits(){
    let count = mapData.length;
    for(let r = 0; r < count; r++){
        let currentStar = mapData[r];
        if(currentStar.factionId != 0){
            factions[currentStar.factionId].hitStash += currentStar.value;
        }
    }
}

function calcClanScores(){
    let count = mapData.length;
    for(let r = 0; r < count; r++){
        let currentStar = mapData[r];
        if(currentStar.clanId != 0){
            let scoreIncr = currentStar.production;
            if(currentStar.isActiveConst){
                scoreIncr = scoreIncr * 2;
            }
            if(currentStar.isPrize){
                scoreIncr = scoreIncr * 5;
            }
            clans[currentStar.clanId].score += scoreIncr;
            clans[currentStar.clanId].starCount += 1;
        }
    }
}

function factioniseClans(){
    let count = clans.idList.length;
    console.log(count);
    for(let r = 0; r < count; r++){
        let fac = clans[clans.idList[r]].faction.id;
        console.log(fac);
        factions[fac].clans.push(clans[clans.idList[r]]);
    }
}

function selectMysteryEdges(type){
    let count = mysteryEdges.length;
    for(let r = 1; r < count; r++){
        let mini = mysteryEdges[r];
        let cnt = mini.length;
        if(mini != ""){
            for(let t = 0; t < cnt; t++){
                //console.log(r + ": " + mini[t]);
                if(mini[t][0] == type){
                    let p1 = mapData[r-1];
                    let p2 = mapData[[mini[t] * 1] -1];

                    p1.isConst = true;
                    p1.isActiveConst = true;
                    p2.isConst = true;
                    p2.isActiveConst = true;

                    g.beginPath()
                    g.lineWidth = 5;
                    g.strokeStyle = "#fff";
                    g.moveTo(p1.x, p1.y);
                    g.lineTo(p2.x, p2.y);
                    g.stroke();
                }
            }
        } 
        //mapData[mysteryEdges[r][0]-1].selected = true;
        //mapData[mysteryEdges[r][1]-1].selected = true;
    }
}