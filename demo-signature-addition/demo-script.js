const submitButton = document.getElementById('submit-button');


const loginInput = document.getElementById('login');
const emailInput = document.getElementById('email');

// ethalone
const drawCanvas = document.getElementById('drawer-canvas');
const submitCanvas = document.getElementById('submit-canvas');
const drawerCanvasContext = drawCanvas.getContext('2d');
const submitCanvasContext = submitCanvas.getContext('2d');
const drawCanvasData = new DrawCanvasData();
setUpDrawCanvas(drawCanvas, drawCanvasData, drawerCanvasContext, submitCanvasContext);


submitButton.addEventListener("click", async () => {
    const ethalone = pixels2DListToString(drawCanvasData.pictureList, pixelsDelimeter, stringPixelsDelimeter);

    const login = loginInput.value;
    const email = emailInput.value;
    try {
        const response = await fetch('https://signature-app-test-c8657519366a.herokuapp.com/signature', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({"login": login, "email": email, "signature": ethalone})
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