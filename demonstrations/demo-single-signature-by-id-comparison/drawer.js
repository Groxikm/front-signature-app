const defaultInteger = -1;
const pixelsOffset = 10;
const stringPixelsDelimeter = "/";
const pixelsDelimeter = ",";
const submitRadius = 5;

class DrawCanvasData {
    constructor() {
        this.isDrawing = false;
        this.pixelX = 0;
        this.pixelY = 0;
        this.previousX = defaultInteger;
        this.previousY = defaultInteger;
        this.pictureList = [];
    }
}

class PixelModel {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    toModel() {
        return {
            "x": this.x,
            "y": this.y
        };
    }
}

class PixelListModel {
    constructor(pixels) {
        this.pixels = pixels;
    }

    toModel() {
        let models = [];
        this.pixels.forEach(pixel => {
            models.push(pixel.toModel());
        });

        return {
            "pixels": models
        };
    }
}

function setUpDrawCanvas(drawCanvas, drawCanvasData, drawerCanvasContext, submitCanvasContext) {
    drawCanvas.addEventListener('mousedown', (e) => {
        drawCanvasData.isDrawing = true;
        [drawCanvasData.pixelX, drawCanvasData.pixelY] = [e.offsetX, e.offsetY];
    });
    drawCanvas.addEventListener('mousemove', (e) => {
        if (drawCanvasData.isDrawing) {
            const newX = e.offsetX;
            const newY = e.offsetY;
            if (drawCanvasData.previousX === defaultInteger) drawCanvasData.previousX = newX;
            if (drawCanvasData.previousY === defaultInteger) drawCanvasData.previousY = newY;
            drawLine(drawCanvasData.pixelX, drawCanvasData.pixelY, newX, newY, drawerCanvasContext);
            if (isValidToAdd(drawCanvasData.previousX, drawCanvasData.previousY, newX, newY, pixelsOffset)) {
                drawCanvasData.previousX = newX;
                drawCanvasData.previousY = newY;
                drawCanvasData.pictureList.push([newX, newY]);
                drawPoint(newX, newY, submitCanvasContext, submitRadius);
            }
            [drawCanvasData.pixelX, drawCanvasData.pixelY] = [newX, newY];
        }
    });
    drawCanvas.addEventListener('mouseup', () => {
        drawCanvasData.isDrawing = false;
    });
}

function isValidToAdd(previousX, previousY, x, y, offset) {
    return Math.pow(x - previousX, 2) + Math.pow(y - previousY, 2) >= offset * offset;
}

function pixels2DListToString(pixels, delimeter, betweenDelimeter) {
    const length = pixels.length;
    let string = "";

    for (let i = 0; i < length; i++) {
        const pixel = pixels[i];
        string = string.concat(pixel[0]).concat(delimeter).concat(pixel[1]);
        if (i < length-1) {
            string = string.concat(betweenDelimeter);
        }
    }

    return string;
}

function pixels2DListToModel(pixels) {
    const length = pixels.length;
    let pixelsList = [];

    for (let i = 0; i < length; i++) {
        const pixel = pixels[i];
        const pixelModel = new PixelModel(pixel[0], pixel[1]);
        pixelsList.push(pixelModel);
    }

    let pixelsListModel = new PixelListModel(pixelsList);

    return pixelsListModel.toModel();
}

function drawLine(fromX, fromY, toX, toY, canvasContext) {
    canvasContext.beginPath();
    canvasContext.moveTo(fromX, fromY);
    canvasContext.lineTo(toX, toY);
    canvasContext.stroke();
}

function drawPoint(x, y, canvasContext, radius) {
    canvasContext.beginPath();
    canvasContext.arc(x, y, radius, 0, 2 * Math.PI, false);
    canvasContext.fillStyle = 'green';
    canvasContext.fill();
    canvasContext.stroke();
}

function resetContent(canvas, canvasData){
    canvasData.isDrawing = false;
    canvasData.pixelX = 0;
    canvasData.pixelY = 0;
    canvasData.previousX = defaultInteger;
    canvasData.previousY = defaultInteger;
    canvasData.pictureList = [];
    canvas.clearRect(0, 0, 500, 300);
}
