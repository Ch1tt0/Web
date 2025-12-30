const bear = document.getElementById("bear");
let isRotated = false;

setInterval(() => {
    if (isRotated) {
        bear.style.transform ="scale(-1, 1)";
        isRotated = !isRotated;
    } else {
        bear.style.transform ="scale(1, 1)";
        isRotated = !isRotated;
    }
}, 1000)
