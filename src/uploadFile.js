fileInput = $("#fileinput")
let tailleSlider = $("#tailleSlider")
let tailleImg = tailleSlider.value

fileInput.change(function (ev) {
    if (ev.target.files) {
        let file = ev.target.files[0];
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function (e) {
            var image = new Image();
            image.src = e.target.result;
            image.onload = function (ev) {
                loadedImage = image
                drawImage(image.width, image.height)
            }
        }
    }
});

var loadedImage

function drawImage(image) {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    canvas.width = image.width;
    canvas.height = image.height;


    var canvasRes = document.getElementById('canvas-resultat');
    canvasRes.width = image.width;
    canvasRes.height = image.height;

    ctx.imageSmoothingQuality = "low";
    ctx.drawImage(image, 0, 0, image.width, image.height);
}
