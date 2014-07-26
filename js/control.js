/**
 * Created by byronjones on 7/25/14.
 */
function control (player,keys) {
    console.log (player.name)
    player.y(500);

    window.addEventListener("keydown",function (event) {
        console.log(event.keyCode);
        if (event.keyCode === keys.right) {
           console.log(player.name + "moveRight");
            player.reverse(false);
           player.play('walk');
        } else if (event.keyCode === keys.left) {
           console.log(player.name + "moveLeft");
            player.reverse(true);
            player.play('walk');
        } else if (event.keyCode === keys.up) {
            console.log(player.name + "jump");
        } else if (event.keyCode === keys.down) {
            console.log(player.name + "down");
            player.play('duck');
        }
    })
}