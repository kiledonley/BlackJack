

const Cards = {
    values: ["A","2","3","4","5","6","7","8","9","0","J","Q","K"],
    points: [11,2,3,4,5,6,7,8,9,10,10,10,10],
    Suit: ["D","H","S","C"]
}

var turnArray = [
                player = {name: "dealer", nickname: "DEALER",hand: [], Score: 0, Aces: 0, wins: 0},
                player = {name: "First", nickname: "placeholder",hand: [], Score: 0, Aces: 0, wins: 0}
                ]

Deck = [];
Deckplace = 0;
                    for(j = 0; j < Cards.Suit.length; j++){
                        for(i=0; i < Cards.values.length; i++){
                            Deck[Deckplace] = `${Cards.values[i]}${Cards.Suit[j]}`
                            Deckplace += 1
                        }
                    }
var HoldCardvalue = "";
var CurrentDeck = [...Deck];
var buttonswork = true;

Start();

document.querySelectorAll("button").forEach(function(button){
    button.addEventListener('click', function(event){
        var press = button.id;
            if(buttonswork){
            switch(press){
                case "hitme": GiveCard(1);
                            break;
                case "stay": 
                    while (turnArray[0].Score < 17){
                            GiveCard(0)
                            }   
                            turnOver();
            }
        }
    })
})

function Deal(){
for(around = 0; around < 2; around++){
    for(i = 0 ; i < turnArray.length; i++){
        GiveCard(i);
    }
}
}

function Draw(){
    var Deal = Math.floor(Math.random() * CurrentDeck.length);
    var Card = CurrentDeck.splice(Deal, 1);
    return Card;
}

function GiveCard(i){

    var DealTo = document.getElementById(turnArray[i].name);
    var image = document.createElement("IMG");  
    var Card = Draw();

    image.style = `margin-left: calc(${turnArray[i].hand.length}*50px)`
    if(turnArray[0].hand[0] === undefined){
        image.classList = "hiddenCard"
        HoldCardvalue = `https://deckofcardsapi.com/static/img/${Card}.png` 
        image.src = `https://cdn.shopify.com/s/files/1/0200/7616/products/playing-cards-bicycle-rider-back-1_1024x1024.png?v=1535755695`
    }
    else{
    image.src = `https://deckofcardsapi.com/static/img/${Card}.png` 
    }
    DealTo.appendChild(image)
    // Hand(who,Card);
    turnArray[i].hand[turnArray[i].hand.length] = Card
    // Score(who,Card);
    
    for(j=0 ; j < Cards.values.length; j++){
        if(Card[0].charAt(0) === Cards.values[j]){
            turnArray[i].Score += Cards.points[j];
           console.log(Card[0].charAt(0), turnArray[0].Score)
        }      
        }
        if(Card[0].charAt(0) === "A"){
            turnArray.Aces++
        }
    

    if(turnArray[i].Score === 21){
        turnOver()  
    }
    else if(turnArray[i].Score > 21 && turnArray[i].Aces === 0){
        turnOver()
    }
    else if(turnArray[i].Score > 21){
        turnArray[i].Score -= 10
        turnArray[i].Aces--
    }
    }

function Start(){
    turnArray[1].nickname = prompt("Enter your name","NAME");

    document.getElementsByClassName("player1nametag")[0].innerText = turnArray[1].nickname;
    
    if (confirm("DEAL?")){
        Deal()
    }
}

function turnOver(){
    buttonswork = false;
    temp1Score = turnArray[1].Score > 21 ? 0 : turnArray[1].Score;
    tempDealerScore = turnArray[0].Score > 21 ? 0 : turnArray[0].Score;
    winner = temp1Score >= tempDealerScore ? 1 : 0;
    turnArray[winner].wins++
    document.getElementsByClassName("hiddenCard")[0].src = HoldCardvalue
    document.getElementById("header").innerHTML = `
    <div>Dealer: ${turnArray[0].wins}    ${turnArray[1].nickname}: ${turnArray[1].wins}</div>
    <div>${turnArray[winner].nickname} wins this hand</div> <button id = "play" class="font">Play Again</button>`
   
    document.getElementById("play").addEventListener('click', e => {
        if(e.target.id = "play"){
            buttonswork = true;
    for(i = 0;   i < turnArray.length; i++){
    document.getElementById(turnArray[i].name).innerHTML = "";   
    turnArray[i].Score = 0;
    turnArray[i].hand = [];
    turnArray[i].Aces = 0;
    }
    }
    document.getElementById("header").innerHTML = `<div>Dealer: ${turnArray[0].wins}    ${turnArray[1].nickname}: ${turnArray[1].wins}</div>`
    Deal()
}
 )
}