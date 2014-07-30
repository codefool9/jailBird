var player2 = ani.jailBird('player2', {});
player2.x = 150;
player2.ground = 200;
player2.reverse = true;

player2.on('weakSpots', function (event, name, spots) {
    var i = 0, len = spots.length, spot, el = document.getElementsByClassName('weakSpot');
    while (i < len) {
        spot = spots[i];
        posSpot(el[i], spot);
        i += 1;
    }
});