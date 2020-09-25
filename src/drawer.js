class Drawer {
    constructor(canvasInput, canvasOutput) {
        this.canvasInput = canvasInput
        this.canvasOutput = canvasOutput

        this.ctxInput = canvasInput.getContext("2d");
        this.ctxOutput = canvasOutput.getContext("2d");

        this.pathColor = "#ff0000"
        this.tolerance = 30
        this.clickedPoint = {
            x: 0,
            y: 0
        }

        this.canvasInput.addEventListener("mousedown", (event) => {
            this.setClickedPoint(getMousePosition(this.canvasInput, event))
            this.createHitBox()
        });
    }

    drawImage(image) {
        this.canvasInput.width = image.width;
        this.canvasInput.height = image.height;
        this.canvasOutput.width = image.width;
        this.canvasOutput.height = image.height;

        // this.ctxInput = canvasInput.getContext("2d");

        // this.ctxInput.imageSmoothingQuality = "low";
        this.ctxInput.drawImage(image, 0, 0, image.width, image.height);
    }

    setClickedPoint({x,y}) {
        this.clickedPoint = {
            x,
            y
        }
    }

    setPathColor(color) {
        this.pathColor = color
    }

    setTolerance(tolerance) {
        this.tolerance = tolerance
    }

    createHitBox() {
        let clickedColor = this.getClickedColor() /* {r: 200, g: 200, b: 200} */
        let fillColor = hexToRgbA(this.pathColor)
        let image = this.getInputCanvasData()

        let backColor = {
            r: 0,
            g: 0,
            b: 0,
            a: 0
        }

        for (let i = 0; i < image.data.length; i += 4) {
            let currentColor = {
                r: image.data[i],
                g: image.data[i + 1],
                b: image.data[i + 2]
            }
            if (!isColorMatching(clickedColor, currentColor, this.tolerance)) {
                image.data[i] = 0;
                image.data[i + 1] = 0;
                image.data[i + 2] = 0;
                image.data[i + 3] = 0;
                // fillColorInData(image.data, backColor, i)

            } else {
                image.data[i] = fillColor.r;
                image.data[i + 1] = fillColor.g;
                image.data[i + 2] = fillColor.b;
                // fillColorInData(image.data, fillColor, i)
            }
        }

        this.ctxOutput.putImageData(image, 0, 0);
    }

    getClickedColor() {
        return this.getRgbFromPosition(this.clickedPoint.x, this.clickedPoint.y)

    }

    getRgbFromPosition(x, y) {
      console.log(x)
      console.log(y)

        let data = this.ctxInput.getImageData(x, y, 1, 1).data
        return {
            r: data[0],
            g: data[1],
            b: data[2],
        }
    }

    getInputCanvasData() {
        return this.ctxInput.getImageData(0, 0, this.canvasInput.width, this.canvasInput.height)
    }



}

function isColorMatching(color1, color2, tolerance) {
    return Math.abs(color1.r - color2.r) <= tolerance &&
        Math.abs(color1.g - color2.g) <= tolerance &&
        Math.abs(color1.b - color2.b) <= tolerance
}

function hexToRgbA(hex) {
    var c;
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
        c = hex.substring(1).split('');
        if (c.length == 3) {
            c = [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c = '0x' + c.join('');

        return {
            r: (c >> 16) & 255,
            g: (c >> 8) & 255,
            b: c & 255,
            a: 1
        }
    }
}

function fillColorInData(data, color, gap) {
    let decalage = gap * 4
    data[decalage] = color.r;
    data[decalage + 1] = color.g;
    data[decalage + 2] = color.b;
    data[decalage + 3] = color.a;
}

function getMousePosition(canvas, event) {
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    return {
        x: Math.floor(x),
        y: Math.floor(y)
    }
}
