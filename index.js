const imagePathButton = document.querySelector('.imagePathButton');
const detectButton = document.querySelector('.detectButton');
imagePathButton.addEventListener('change', event => {
    let file = event.target.files;
    let reader = new FileReader();
    reader.readAsDataURL(file[0]);
    reader.onload = () => {
        let dataUrl = reader.result;
        document.querySelector('.background').innerHTML = "<img class='image' src='" + dataUrl + "'>";
        document.querySelector(".url").value = dataUrl;
    }
}, false);
detectButton.addEventListener('click', event => {
    const image = document.querySelector('.image');
    const faceDetector = new window.FaceDetector();
    faceDetector.detect(image).then(function (faces) {
        faces.forEach(function (face) {
            drawFace(face);
        })
    })
})

function drawFace(face) {
    const {
        width,
        height,
        top,
        left
    } = face.boundingBox;
    // Offset
    const offset = document.querySelector('.image').getBoundingClientRect();
    const faceBox = document.createElement('div');
    faceBox.classList.add('face');
    faceBox.style.cssText =
        `width: ${width}px;height: ${height}px;top: ${offset.top + top}px;left: ${offset.left + left}px;`;
    face.landmarks.forEach(landmark => {
        const el = document.createElement('div');
        el.classList.add('landmark', landmark.type);
        if (landmark.type === 'eye')
            el.style.cssText =
            `top: ${landmark.location.y - (offset.top + top)}px;left: calc(${landmark.location.x - (offset.left + left)}px - 15%);`;
        else if (landmark.type === 'mouth')
            el.style.cssText =
            `top: ${landmark.location.y - (offset.top + top)}px;left: calc(${landmark.location.x - (offset.left + left)}px - 30%);`;
        else
            el.style.cssText = ''
        faceBox.appendChild(el);
    })
    document.querySelector('.background').appendChild(faceBox);
}