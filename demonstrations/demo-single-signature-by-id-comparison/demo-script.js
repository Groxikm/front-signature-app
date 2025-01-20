const submitButton = document.getElementById('submit-button');

const idInput = document.getElementById('id');


// ethalone
const drawCanvas = document.getElementById('drawer-canvas');
const submitCanvas = document.getElementById('submit-canvas');
const drawerCanvasContext = drawCanvas.getContext('2d');
const submitCanvasContext = submitCanvas.getContext('2d');
const drawCanvasData = new DrawCanvasData();
setUpDrawCanvas(drawCanvas, drawCanvasData, drawerCanvasContext, submitCanvasContext);

const stringContentField = document.getElementById("string-content");


submitButton.addEventListener("click", async () => {
    const ethalone = pixels2DListToString(drawCanvasData.pictureList, pixelsDelimeter, stringPixelsDelimeter);

    const id = idInput.value;
    try {
        const response = await fetch('https://signature-app-test-c8657519366a.herokuapp.com/signature/compare/server', {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({"comparingSignature": ethalone, "signatureId": id, "tolerance": 10})
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

const resetButton = document.getElementById('reset-button');
resetButton.addEventListener("click", async () => {
    resetContent(drawerCanvasContext, drawCanvasData);
    resetContent(submitCanvasContext, drawCanvasData);
});