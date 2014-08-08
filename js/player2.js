var player2 = ani.jailBird('player2', {
    jump: {
        letter: 'UP',
        key: 38,
        action: function () {
            player2.play('jump');
        }
    },
    walkLeft: {
        letter: 'LEFT',
        key: 37,
        action: function () {
            player2.reverse = true;
            player2.play('walk');
        }
    },
    duck: {
        letter: 'DOWN',
        key: 40,
        action: function () {
            player2.play('duck');
        }
    },
    walkRight: {
        letter: 'RIGHT',
        key: 39,
        action: function () {
            player2.reverse = false;
            player2.play('walk');
        }
    },
    lightPunch: {
        letter: 'l',
        key: 76,
        action: function () {
            player2.play('lightPunch');
        }
    }
});
player2.x = 150;
player2.ground = 210;
player2.reverse = true;
player2.life = 1000;

player2.on('strike', function (event, name, spot) {
    var damage = 0, momentum = 0, strike = document.getElementsByClassName('strike')[0], opponent = player2.target;
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
        console.log("player2 wins");
        opponent.damage = opponent.life;
    } else {

    }
    document.getElementsByClassName('player1Health')[0].children[0].style.width = percent + "%";
});

player2.on('weakSpots', function (event, name, spots) {
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