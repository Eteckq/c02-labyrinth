function createHitBox(original_x, original_y) {
    let clickedColor = getRgbFromPosition(original_x, original_y)
    let image = ctx.getImageData(0, 0, canvas.width/2-15, canvas.height)

    console.log(image.data) // Recup val pour taille du for

    for(i=0 ; i<1317624; i=i+4) {
      if (!isColorMatching(clickedColor, {r:image.data[i],g:image.data[i+1],b:image.data[i+2],}, 20)) {
          image.data[i] = 0;
          image.data[i+1] = 0;
          image.data[i+2] = 0;
      }else {
        image.data[i] = 255;
        image.data[i+1] = 0;
        image.data[i+2] = 0;
      }
    }

    ctx.putImageData(image, canvas.width/2+15, 0);
}

function isColorMatching(color1, color2, tolerance) {
    return Math.abs(color1.r - color2.r) <= tolerance &&
        Math.abs(color1.g - color2.g) <= tolerance &&
        Math.abs(color1.b - color2.b) <= tolerance
}

function getRgbFromPosition(x, y) {
    let data = ctx.getImageData(x, y, 1, 1).data
    return {
        r: data[0],
        g: data[1],
        b: data[2],
    }
}
