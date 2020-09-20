function floodFill(original_x, original_y, fillColor) {
    let clickedColor = getRgbFromPosition(original_x, original_y)

    setColorAtPosition(original_x, original_y, fillColor)
    setNeighboursColor(original_x, original_y, fillColor, clickedColor)

    let oldIterations = 0
    let interval = setInterval(() => {
        if (iterations !== oldIterations) {
            oldIterations = iterations
        } else {
            clearInterval(interval)
            fillBlack(fillColor)
        }
    }, 500);
}

function fillBlack(colorToKeep) {

    for (let x = 0; x < canvas.width; x++) {

        for (let y = 0; y < canvas.height; y++) {

            setTimeout(() => {
                let color = getRgbFromPosition(x, y)
                if (!isColorMatching(colorToKeep, color, 50)) {
                    setColorAtPosition(x, y, {
                        r: 0,
                        g: 0,
                        b: 0
                    })
                }
            }, 0);

        }
    }
}

let tolerenceValue = 50
let iterations = 0

function setNeighboursColor(x, y, color, clickedColor) {
    
    setTimeout(() => {
        iterations++
        let right = getRgbFromPosition(x + 1, y)
        let left = getRgbFromPosition(x - 1, y)
        let top = getRgbFromPosition(x, y - 1)
        let bottom = getRgbFromPosition(x, y + 2)

        if (isColorMatching(right, clickedColor, tolerenceValue) && x < canvas.width - 1) {
            setColorAtPosition(x + 1, y, color)
            setNeighboursColor(x + 1, y, color, clickedColor)
        }
        if (isColorMatching(left, clickedColor, tolerenceValue) && x > 0) {
            setColorAtPosition(x - 1, y, color)
            setNeighboursColor(x - 1, y, color, clickedColor)
        }

        if (isColorMatching(top, clickedColor, tolerenceValue) && y > 0) {
            setColorAtPosition(x, y - 1, color)
            setNeighboursColor(x, y - 1, color, clickedColor)
        }
        if (isColorMatching(bottom, clickedColor, tolerenceValue) && y < canvas.height - 1) {
            setColorAtPosition(x, y + 1, color)
            setNeighboursColor(x, y + 1, color, clickedColor)
        }

    }, 0);




}

function isColorMatching(color1, color2, tolerance) {
    return Math.abs(color1.r - color2.r) <= tolerance &&
        Math.abs(color1.g - color2.g) <= tolerance &&
        Math.abs(color1.b - color2.b) <= tolerance
}

function setColorAtPosition(x, y, {
    r,
    g,
    b
}) {

    ctx.fillStyle = "rgba(" + r + "," + g + "," + b + ",1)";
    ctx.fillRect(x, y, 1, 1);

}

function getRgbFromPosition(x, y) {
    let data = ctx.getImageData(x, y, 1, 1).data
    return {
        r: data[0],
        g: data[1],
        b: data[2],
    }
}