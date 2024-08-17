import "../styles.css";

console.log("This is the 'White Noise' page");

const CANVAS_WIDTH_PX = 512;
const CANVAS_HEIGHT_PX = 512;

const canvas = document.getElementById("canvas");
canvas.setAttribute("width", CANVAS_WIDTH_PX);
canvas.setAttribute("height", CANVAS_HEIGHT_PX);
canvas.classList.remove("hidden");

const context = canvas.getContext("2d");

const rafCb = () => {
  const imageData = context.createImageData(CANVAS_WIDTH_PX, CANVAS_HEIGHT_PX);
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    const grayValue = Math.random() * 255;
    data[i] = grayValue;
    data[i + 1] = grayValue;
    data[i + 2] = grayValue;
    data[i + 3] = 255;
  }

  context.putImageData(imageData, 0, 0);

  requestAnimationFrame(rafCb);
};

requestAnimationFrame(rafCb);
