fileInput = $("#fileinput")

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
                drawImage(image.width/3, image.height/3)
            }
        }
    }
});

var loadedImage

function drawImage(width, height) {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    canvas.width = width;
    canvas.height = height;

    ctx.imageSmoothingQuality = "low";
    ctx.drawImage(loadedImage, 0, 0, width, height);
}