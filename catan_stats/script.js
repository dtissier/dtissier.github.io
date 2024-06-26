// *******************************************************************************
// FILE: script.js
// *******************************************************************************

var sPlayer = 0;
var sRound = 0;
var sRolls = {};
var sBlink = true;

var sLastPlayer = [];
var sLastRound = [];
var sLastRoll = [];

const kNumRounds = 50;

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
    var last_player = -1;
    var last_round = -1;
    
    if (sLastPlayer.length > 0) {
        last_player = sLastPlayer[sLastPlayer.length-1];
    }
    if (sLastRound.length > 0) {
        last_round = sLastRound[sLastRound.length-1];
    }

    for (let player = 0; player < 2; player++) {
        for (let round = 0; round < kNumRounds; round++) {
            var id = PlayerAndRoundToString(player, round);
            var element = document.getElementById(id);
            
            if (last_player == player && last_round == round) {
                element.style.backgroundColor = '#d59100';
                element.style.color = 'black';
                element.style.fontWeight = 'bold';
                element.style.fontSize = '14px';
            }
            else if (sPlayer == player && sRound == round) {
                element.style.backgroundColor = '#305470';
                element.style.color = 'white';
                element.style.fontWeight = 'bold';
                element.style.fontSize = '12px';
            }
            else {
                element.style.backgroundColor = '#bfc4c8';
                element.style.color = 'black';
                element.style.fontWeight = 'normal';
                element.style.fontSize = '12px';
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
        sLastPlayer = [];
        sLastRound = [];
        sLastRoll = [];

        for (let player = 0; player < 2; player++) {
            for (let round = 0; round < kNumRounds; round++) {
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
    
    sLastPlayer.push(sPlayer);
    sLastRound.push(sRound);
    sLastRoll.push(inRoll);

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
    if (sLastPlayer.length != 0) {
        sPlayer = sLastPlayer.pop();
        sRound = sLastRound.pop();
        let last_roll = sLastRoll.pop();

        var key = PlayerAndRollsToString(sPlayer, last_roll);
        RemoveRoll(key);
        RemoveRoll("rolls_" + last_roll.toString());
        
        UpdateSelectedRound();
    }
}

// *******************************************************************************
// FUNCTION
// *******************************************************************************
function SwapNames() {
    var p0_name = document.getElementById('p0_roll_name').innerHTML;
    var p1_name = document.getElementById('p1_roll_name').innerHTML;
    document.getElementById('p0_roll_name').innerHTML = p1_name;
    document.getElementById('p1_roll_name').innerHTML = p0_name;
    document.getElementById('p0_roll_name_b').innerHTML = p1_name;
    document.getElementById('p1_roll_name_b').innerHTML = p0_name;
    document.getElementById('p0_rolls_name').innerHTML = p1_name;
    document.getElementById('p1_rolls_name').innerHTML = p0_name;

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
       element.style.backgroundColor = '#bfc4c8';
       element.style.color = 'black';
   }
}

// *******************************************************************************
// INIT
// *******************************************************************************
document.getElementById("back").addEventListener("click", Back);
document.getElementById("swap_names").addEventListener("click", SwapNames);
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
// setInterval(BlinkSelection, 500);
