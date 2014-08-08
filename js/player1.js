// blockHigh: backingUp + hit
// blockLow: backup + down + hit
// lightPunch: e
// jump: w
// walkLeft: a
// walkRight: d
// duck: s
// hardPunch: leftShift + e
// knife-lightPunch: lightPunch + knife
// knife-hardPunch: hardPunch + knife
// lowKick: c
// spinKick: v
// medKick: leftShift + c
// hardKick: leftShift + v
// hardPunch2: f

var player1 = ani.jailBird('player1', {
    jump: {
        letter: 'W',
        key: 87,
        action: function () {
            player1.play('jump');
        }
    },
    walkLeft: {
        letter: 'A',
        key: 65,
        action: function () {
            if (!player1.reverse && player1.isTargetInFront() && player1.isTargetInRange()) {
                player1.play("walkBackward");
            } else if (!player1.reverse) {
                player1.play('turn');
            } else {
                player1.play('walk');
            }
        }
    },
    duck: {
        letter: 'S',
        key: 83,
        action: function () {
            player1.play('duck');
        }
    },
    walkRight: {
        letter: 'D',
        key: 68,
        action: function () {
            if (player1.reverse && player1.isTargetInFront() && player1.isTargetInRange()) {
                player1.play("walkBackward");
            } else if (player1.reverse) {
                player1.play('turn');
            } else {
                player1.play('walk');
            }
        }
    },
    blockHigh: {
        letter: 'Q',
        key: 81,
        action: function () {
            player1.play('blockHigh');
        }
    },
    blockLow: {
        letter: 'Z',
        key: 90,
        action: function () {
            player1.play('blockLow');
        }
    },
//            blockAir: {
//                letter: 'Z',
//                key: 90,
//                action: function () {
//                    player1.play('blockLow');
//                }
//            }
    lightPunch: {
        letter: 'R',
        key: 82,
        action: function () {
            player1.play('lightPunch');
        }
    },
    "knife-lightPunch": {
        letter: 'T',
        key: 84,
        action: function () {
            player1.play('knife-lightPunch');
        }
    },
    lowKick: {
        letter: 'C',
        key: 67,
        action: function () {
            player1.play('lowKick');
        }
    },
    hardPunch: {
        letter: 'G',
        key: 71,
        action: function () {
            player1.play('hardPunch');
        }
    },
    medPunch: {
        letter: 'Y',
        key: 89,
        action: function () {
            player1.play('medPunch');
        }
    },
    medKick: {
        letter: 'H',
        key: 72,
        action: function () {
            player1.play('medKick');
        }
    },
    hadPunch2: {
        letter: 'V',
        key: 86,
        action: function () {
            player1.play('hardPunch2');
        }
    },
    "knife-hardPunch": {
        letter: 'B',
        key: 66,
        action: function () {
            player1.play('knife-hardPunch');
        }
    },
    hardKick: {
        letter: 'U',
        key: 85,
        action: function () {
            player1.play('hardKick');
        }
    },
    spinKick: {
        letter: 'J',
        key: 74,
        action: function () {
            player1.play('spinKick');
        }
    },
    hitFace: {
        letter: 'I',
        key: 73,
        action: function () {
            player1.play('hitFace');
        }
    },
    hitGut: {
        letter: 'O',
        key: 79,
        action: function () {
            player1.play('hitGut');
        }
    },
    duckHitFace: {
        letter: 'P',
        key: 80,
        action: function () {
            player1.play('duckHitFace');
        }
    },

});

player1.on('strike', function (event, name, spot) {
    var damage = 0, momentum = 0, strike = document.getElementsByClassName('strike')[0], opponent = player1.target;
    posSpot(strike, spot);

    //TODO: need to implement damage and momentum for each action here.
    if (name === "lightPunch") {
        damage = 10;
        momentum = 10;
    } else if (name === "hardPunch") {
        damage = 20;
        momentum = 20;
    } else if (name === "spinKick") {
        damage = 30;
        momentum = 50;
    } else if (name === "knifeHardPunch") {
        damage = 20;
        momentum = 20;
    } else if (name === "hardPunch2") {
        damage = 25;
        momentum = 40;
    } else if (name === "hardKick") {
        damage = 25;
        momentum = 30 ;
    } else if (name === "lightKick") {
        damage = 15;
        momentum = 10;
    } else if (name === "knifeLightPunch") {
        damage = 15;
        momentum = 10;
    }
    opponent.checkHit(spot, damage, momentum);
    var lifeRemaining = opponent.damage/opponent.life;
    var percent = lifeRemaining * 100;
    console.log ("percent " + percent);
    console.log("lifeRemaining " + opponent.damage + "/" + opponent.life + " = " + lifeRemaining);

    if (opponent.damage > opponent.life) {
        console.log("player1 wins");
        opponent.damage = opponent.life;
    } else {

    }
    document.getElementsByClassName('player2Health')[0].children[0].style.width = percent + "%";
});

player1.on('weakSpots', function (event, name, spots) {
    var i = 0, spot, el = document.getElementsByClassName('weakSpot'), len = el.length;
    while (i < len) {
        spot = spots[i];
        if (spot) {
            posSpot(el[i], spot);
        } else {
            posSpot(el[i], {x:0, y:0, radius:0, name:''})
        }
        i += 1;
    }
});

player1.ground = 210;