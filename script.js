const uploadBox = document.querySelector(".upload-box"),
  previewImg = uploadBox.querySelector("img"),
  fileInput = uploadBox.querySelector("input"),
  widthInput = document.querySelector(".width input"),
  heightInput = document.querySelector(".height input"),
  ratioInput = document.querySelector("#ratio"),
  qualityInput = document.querySelector("#quality"),
  downloadBtn = document.querySelector(".download-btn");

let ogImageRatio;
const loadFile = (e) => {
  const file = e.target.files[0]; // getting first user selected file
  if (!file) return; // return if user hasn't selected any file
  PeriodicWave.src = URL.createObjectURL(file); // passing selected file url to previewImg
  previewImg.addEventListener("load", () => {
    // once image loaded
    widthInput.value = previewImg.naturalWidth;
    heightInput.value = previewImg.naturalHeight;
    ogImageRatio = previewImg.naturalWidth / previewImg.naturalHeight;
    document.querySelector(".container").classList.add("active");
  });
};

widthInput.addEventListener("keyup", () => {
  //getting height according to the ratio check box status
  const height = ratioInput.checked
    ? widthInput.value / ogImageRatio
    : heightInput.value;
  heightInput.value = Math.floor(height);
});
heightInput.addEventListener("keyup", () => {
  //getting width according to the ratio check box status
  const width = ratioInput.checked
    ? heightInput.value * ogImageRatio
    : widthInput.value;
  widthInput.value = Math.floor(width);
});

const resizeAndDownload = () => {
  const canvas = document.createElement("canvas");
  const a = document.createElement("a");
  const ctx = canvas.getContext("2d");

  // 1.0 is 100% quality and 0.7 is 70% quality of Total
  const imgQuality = qualityInput.checked ? 0.7 : 1.0;

  //setting canvas width & height according to the input values
  canvas.width = widthInput.value;
  canvas.height = heightInput.value;

  //drawing user selected image into the canvas
  ctx.drawImage(previewImg, 0, 0, canvas.width, canvas.height);

  // passing canvas data url as href value of <a> element
  a.href = canvas.toDataURL("image/jpeg", imgQuality);
  a.download = new Date().getTime(); //passing current time as download value
  a.click(); // clicking <a> element so the file download
};

downloadBtn.addEventListener("click", resizeAndDownload);
fileInput.addEventListener("change", loadFile);
uploadBox.addEventListener("click", () => fileInput.click());
