// *******************************************************************************
// FILE: script.js
// *******************************************************************************

var sPlayer = 0;
var sRound = 0;
var sRolls = {};
var sBlink = true;

var sLastPlayer = 0;
var sLastRound = 0;
var sLastRoll = 0;

// *******************************************************************************
// FUNCTION
// *******************************************************************************
function PlayerAndRollsToString(inPlayer, inRound) {
    var id = 'p' + inPlayer.toString() + '_rolls_' + inRound.toString();
    return id;
}

// *******************************************************************************
// FUNCTION
// *******************************************************************************
function PlayerAndRoundToString(inPlayer, inRound) {
    var id = 'p' + inPlayer.toString() + '_roll_' + inRound.toString();
    return id;
}

// *******************************************************************************
// FUNCTION
// *******************************************************************************
function UpdateSelectedRound() {
    for (let player = 0; player < 2; player++) {
        for (let round = 0; round < 20; round++) {
            var id = PlayerAndRoundToString(player, round);
            var element = document.getElementById(id);
            
            if (sPlayer == player && sRound == round) {
                element.style.backgroundColor = '#777777';
                element.style.color = 'white';
            }
            else {
               element.style.backgroundColor = '#dddddd';
               element.style.color = 'black';
           }
        }
    }
}

// *******************************************************************************
// FUNCTION
// *******************************************************************************
function NewGame() {
    const result = confirm("Are you sure you want to start a new game?");
    if (result) {
        sPlayer = 0;
        sRound = 0;
        sRolls = {};
        
        for (let player = 0; player < 2; player++) {
            for (let round = 0; round < 20; round++) {
                var id = PlayerAndRoundToString(player, round);
                document.getElementById(id).innerHTML = '-';
            }
        }
        
        for (let roll = 2; roll < 13; roll++) {
            var key = "rolls_" + roll.toString();
            document.getElementById(key).innerHTML = '-';

            for (let player = 0; player < 2; player++) {
                key = PlayerAndRollsToString(player, roll);
                document.getElementById(key).innerHTML = '-';
            }
        }
        
        UpdateSelectedRound();
    }
}

// *******************************************************************************
// FUNCTION
// *******************************************************************************
function AddRoll(inKey) {
    if (inKey in sRolls) {
        sRolls[inKey] = sRolls[inKey] + 1;
    }
    else {
        sRolls[inKey] = 1;
    }
    document.getElementById(inKey).innerHTML = sRolls[inKey].toString();
}

// *******************************************************************************
// FUNCTION
// *******************************************************************************
function RemoveRoll(inKey) {
    if (inKey in sRolls) {
        sRolls[inKey] = sRolls[inKey] - 1;
        if (sRolls[inKey] == 0) {
            document.getElementById(inKey).innerHTML = '-';
        }
        else  {
            document.getElementById(inKey).innerHTML = sRolls[inKey].toString();
        }
    }
}

// *******************************************************************************
// FUNCTION
// *******************************************************************************
function DoRoll(inRoll) {
    var id = PlayerAndRoundToString(sPlayer, sRound);
    document.getElementById(id).innerHTML = inRoll.toString();
    
    var key = PlayerAndRollsToString(sPlayer, inRoll);
    AddRoll(key);
    AddRoll("rolls_" + inRoll.toString());
    
    sLastPlayer = sPlayer;
    sLastRound = sRound;
    sLastRoll = inRoll;

    sPlayer = sPlayer + 1;
    if (sPlayer == 2) {
        sPlayer = 0;
        sRound = sRound + 1;
    }
    
    UpdateSelectedRound();
}

// *******************************************************************************
// FUNCTION
// *******************************************************************************
function Back() {
    if (sLastPlayer != 0 || sLastRound != 0) {
        sPlayer = sLastPlayer;
        sRound = sLastRound;
        
        var key = PlayerAndRollsToString(sLastPlayer, sLastRoll);
        RemoveRoll(key);
        RemoveRoll("rolls_" + sLastRoll.toString());
        
        var id = PlayerAndRoundToString(sPlayer, sRound);
        document.getElementById(id).innerHTML = '-';
        
        sLastPlayer = 0;
        sLastRound = 0;
        
        UpdateSelectedRound();
    }
}

// *******************************************************************************
// FUNCTION
// *******************************************************************************
function BlinkSelection() {
    sBlink = !sBlink;
    var id = PlayerAndRoundToString(sPlayer, sRound);
    var element = document.getElementById(id);
    if (sBlink) {
        element.style.backgroundColor = '#777777';
        element.style.color = 'white';
    }
    else {
       element.style.backgroundColor = '#dddddd';
       element.style.color = 'black';
   }
}

// *******************************************************************************
// INIT
// *******************************************************************************
document.getElementById("back").addEventListener("click", Back);
document.getElementById("new_game").addEventListener("click", NewGame);
document.getElementById("roll_2").addEventListener("click", function(){DoRoll(2)});
document.getElementById("roll_3").addEventListener("click", function(){DoRoll(3)});
document.getElementById("roll_4").addEventListener("click", function(){DoRoll(4)});
document.getElementById("roll_5").addEventListener("click", function(){DoRoll(5)});
document.getElementById("roll_6").addEventListener("click", function(){DoRoll(6)});
document.getElementById("roll_7").addEventListener("click", function(){DoRoll(7)});
document.getElementById("roll_8").addEventListener("click", function(){DoRoll(8)});
document.getElementById("roll_9").addEventListener("click", function(){DoRoll(9)});
document.getElementById("roll_10").addEventListener("click", function(){DoRoll(10)});
document.getElementById("roll_11").addEventListener("click", function(){DoRoll(11)});
document.getElementById("roll_12").addEventListener("click", function(){DoRoll(12)});
UpdateSelectedRound();
setInterval(BlinkSelection, 500);
