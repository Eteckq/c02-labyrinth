var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

canvas.addEventListener("mousedown", function (e) {
    let coord = getMousePosition(canvas, e);
    flood_fill(coord.x, coord.y, '#ff2e1f')
});


function getMousePosition(canvas, event) {
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    return {
        x,
        y
    }
}