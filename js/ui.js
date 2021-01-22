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
        addElement({type: "div", id: target + "ScoreDiv", class: "FactionScoreDiv", parent: parentEl, innards: text});
        document.getElementById(target+"ScoreDiv").style.color = factions[target].colour;
    }
    console.log("called scoreboard builder");
}