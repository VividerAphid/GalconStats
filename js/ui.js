function addElement(props){
    //Takes in {type, id, class, parent, innards}
    let child = document.createElement(props.type);
    child.id = props.id;
    child.className = props.class;
    props.parent.appendChild(child);
    child.innerHTML = props.innards;
}

function buildScoreboard(){
    let count = factions.idList.length;
    let parentEl = document.getElementById("ScoresHolder");

    for(let r = 0; r < count; r++){
        let target = factions.idList[r];
        let text = factions[target].name + " : " + factions[target].score;
        addElement({type: "button", id: target + "ScoreButton", class: "collapsible", parent: parentEl, innards: text});
        document.getElementById(target+"ScoreButton").style.color = factions[target].colour;
        addElement({type: "div", id: target + "ScoreInfo", class: "collapsibleContent", parent: parentEl, innards: "Clan scores here"});
        document.getElementById(target+"ScoreInfo").style.color = factions[target].colour;
    }
    setUpCollapsibles();
}

function fillClanScores(){
    let count = clans.idList.length;
    let factionCount = factions.idList.length;
    let text = {};
    for(let r = 0; r < factionCount; r++){
        text[factions.idList[r]] = "";
    }
    for(let r = 0; r < count; r++){
        let currentClan = clans[clans.idList[r]];
        let targetFaction = currentClan.faction.id;
        text[targetFaction] += "" + currentClan.name + " : " + currentClan.score + "<br>";
    }
    for(let r = 0; r < factionCount; r++){
        let targetFaction = factions.idList[r];
        document.getElementById(targetFaction + "ScoreInfo").innerHTML = text[targetFaction];
    }
}

function setUpCollapsibles(){
    var coll = document.getElementsByClassName("collapsible");
    var i;

    for (i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", function() {
        this.classList.toggle("activeCollapsible");
        var content = this.nextElementSibling;
        if (content.style.display === "block") {
            content.style.display = "none";
        } 
        else {
            content.style.display = "block";
        }
        });
    }
}

function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
  
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  
    tablinks = document.getElementsByClassName("tabLink");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
  
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

function toggleDebug(){
    //console.log("ping");
    if(debug){
        //console.log(debug);
        debug = false;
    }
    else{
        //console.log(debug);
        debug = true;
    }
    //console.log(debug);
    render(mapData, g);
}