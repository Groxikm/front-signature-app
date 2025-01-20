const submitButton = document.getElementById('submit-button');

// ethalone
const drawCanvas = document.getElementById('drawer-ethalone-canvas');
const submitCanvas = document.getElementById('submit-ethalone-canvas');
const drawerCanvasContext = drawCanvas.getContext('2d');
const submitCanvasContext = submitCanvas.getContext('2d');
const drawCanvasData = new DrawCanvasData();
setUpDrawCanvas(drawCanvas, drawCanvasData, drawerCanvasContext, submitCanvasContext);

// comparable
const drawComparableCanvas = document.getElementById('drawer-comparable-canvas');
const submitComparableCanvas = document.getElementById('submit-comparable-canvas');
const drawerComparableCanvasContext = drawComparableCanvas.getContext('2d');
const submitComparableCanvasContext = submitComparableCanvas.getContext('2d');
const drawComparableCanvasData = new DrawCanvasData();
setUpDrawCanvas(drawComparableCanvas, drawComparableCanvasData, drawerComparableCanvasContext, submitComparableCanvasContext);

const stringContentField = document.getElementById("string-content");

submitButton.addEventListener("click", async () => {
    const ethalone = pixels2DListToString(drawCanvasData.pictureList, pixelsDelimeter, stringPixelsDelimeter);
    const comparable = pixels2DListToString(drawComparableCanvasData.pictureList, pixelsDelimeter, stringPixelsDelimeter);
    try {
        const response = await fetch('https://signature-app-test-c8657519366a.herokuapp.com/signature/compare', {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({"ethaloneSignature": ethalone, "comparableSignature": comparable, "tolerance": 20})
        });
        console.log(response);
        const result = await response.json();
        if (response.ok) {
            console.log(result); // success message
            stringContentField.innerText = result.percentageOfMatch;
        } else {
            alert(result.message); // failure message
        }
    } catch (error) {
        console.error('Error:', error);
    }
});