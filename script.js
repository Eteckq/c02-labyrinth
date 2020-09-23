var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

let toleranceSlider = $("#toleranceSlider")
let colorPicker = $("#colorPicker")

var coordClicked

canvas.addEventListener("mousedown", function (e) {
    ctx = canvas.getContext("2d");
    coordClicked = getMousePosition(canvas, e);
    createHitBox(coordClicked.x, coordClicked.y, toleranceSlider.val(), colorPicker.val())
    // flood_fill(coord.x, coord.y, '#ff2e1f')
});



toleranceSlider.on('change',function(val){
  createHitBox(coordClicked.x, coordClicked.y, toleranceSlider.val(), colorPicker.val())
})

colorPicker.on('change',function(val){
  createHitBox(coordClicked.x, coordClicked.y, toleranceSlider.val(), colorPicker.val())
})

function hexToRgbA(hex){
    var c;
    if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
        c= hex.substring(1).split('');
        if(c.length== 3){
            c= [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c= '0x'+c.join('');

        return {
            r: (c>>16)&255,
            g: (c>>8)&255,
            b: c&255
        }
    }
}


function getMousePosition(canvas, event) {
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    return {
        x,
        y
    }
}
