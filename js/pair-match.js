var gameArea = document.getElementById("game-area"),
    context  = gameArea.getContext("2d");
    srcList  = ["1.jpg", "2.png", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg", "8.jpg"],
    imgList  = [];

var GRID_WIDTH  = 4,
    GRID_HEIGHT = 4;

var totalImages = 0,
    curRow = 1;



/**
 * Creates image elements for each of the "srcList" elements
 */
function createImage(name) {
  // Create image element
  var picture = new Image();
  picture.src = "img/pair-match/" + name;

  // Load the image to the "imgList" array
    picture.onload = function() {
      totalImages++;
      imgList.push(picture);
      drawImage(picture, totalImages);
    }
}

/**
 * Draw an image at a specified grid position
 */
function drawImage(picture, position) {
  if (totalImages%4 == 0) curRow++
  xPos = position&GRID_WIDTH;
  yPos = curRow;
  context.drawImage(picture,
  // Crop the center of the of the image
  picture.width/8, picture.height/8, picture.width*3/4, picture.height*3/4,
  // Draw the image on the grid at the grid position specified
  gameArea.width/GRID_WIDTH*xPos, gameArea.height/GRID_HEIGHT*yPos, gameArea.width/GRID_WIDTH, gameArea.height/GRID_HEIGHT);
}


function createGrid() {
  for (var i=0; i<srcList.length; i++) {
    createImage(srcList[i]);
  }
}

createGrid();

function Square(position, imgSrc) {
  this.position = position;
  
}