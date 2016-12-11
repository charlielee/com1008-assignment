var gameArea = document.getElementById("game-area"),
    context  = gameArea.getContext("2d");
    srcList  = ["1.jpg", "2.png", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg", "8.jpg"],
    imgList  = [];

var totalImages = 0;

var GRID_WIDTH  = 4,
    GRID_HEIGHT = 4;

var GRID_CELL_WIDTH = gameArea.width/GRID_WIDTH,
    GRID_CELL_HEIGHT = gameArea.height/GRID_HEIGHT;



/**
 * Creates image elements for each of the "srcList" elements
 */
function createImage(name) {
  // Create image element
  var picture = new Image();
  picture.src = "img/pair-match/" + name;

  // Load the image to the "imgList" array
  picture.onload = function() {
    imgList.push(picture);
    drawImage(picture, imgList.length);
    totalImages == imgList.length;

    if (imgList.length == srcList.length) {
      console.log("YA");
    }
  }
}

/**
 * Draw an image on the grid
 */
function drawImage(picture, imgNo) {
  // Position with the grid
  var gridX = imgNo%GRID_WIDTH == 0 ? GRID_WIDTH : imgNo%GRID_WIDTH,
      gridY = Math.ceil(imgNo/GRID_HEIGHT);


  console.log(`AP:${imgNo} X:${gridX} and Y:${gridY}, ${picture.src.substr(-5)}`)

  // Position on canvas
  var canvasX = (gridX - 1) * GRID_CELL_WIDTH,
      canvasY = (gridY - 1) * GRID_CELL_HEIGHT;

  context.drawImage(picture,
  // Crop the center of the of the image
  picture.width/8, picture.height/8, picture.width*3/4, picture.height*3/4,
  // Draw the image on the grid at the grid position specified
  canvasX, canvasY, GRID_CELL_WIDTH, GRID_CELL_HEIGHT);
}


function createGrid() {
  for (var i=0; i<srcList.length; i++) {
    var tile = new Tile(srcList[i])


    createImage(srcList[i]);
  }
}

createGrid();





function Tile(img) {
  this.img = img;
  this.id = totalImages;
}


