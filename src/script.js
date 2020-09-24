let toleranceSlider = $("#toleranceSlider")
let colorPicker = $("#colorPicker")

let drawer

$("#fileinput").change(function (ev) {
    if (ev.target.files) {
        let file = ev.target.files[0];
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function (e) {
            var image = new Image();
            image.src = e.target.result;
            image.onload = function (ev) {
                drawer.drawImage(image)
            }
        }
    }
});



toleranceSlider.on('change', function (val) {
    drawer.setTolerance($(this).val())
    drawer.createHitBox()
})

colorPicker.on('change', function (val) {
    drawer.setPathColor($(this).val())
    drawer.createHitBox()
})

function init() {
    let canvasInput = document.getElementById("canvasInput")
    let canvasOutput = document.getElementById("canvasOutput")
    drawer = new Drawer(canvasInput, canvasOutput)
}