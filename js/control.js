/**
 * Created by byronjones on 7/25/14.
 */
function control (player,keys) {
    console.log (player.name)
    player.y(500);

    window.addEventListener("keydown",function (event) {
        console.log(event.keyCode)
        if (event.keyCode === keys.right) {
           console.log(player.name + "moveRight")
        }
    })
}