var gameArea = document.getElementById("game-area"),
    context  = gameArea.getContext("2d"),
    srcDir = "img/block-slider-3/",
    srcList  = ["1.jpg", "2.png", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg", "8.jpg"];

var GRID_WIDTH  = 3,
    GRID_HEIGHT = 3,
    GRID_TOTAL = GRID_WIDTH * GRID_HEIGHT;

var GRID_CELL_WIDTH = gameArea.width/GRID_WIDTH,
    GRID_CELL_HEIGHT = gameArea.height/GRID_HEIGHT;

// Gameplay
var blankCell = 0,
    curImage = "";


/**
 * Creates an image element for a file listed in "srcList"
 */
function createImage(file) {
  // Create image element
  var picture = new Image();
  picture.src = srcDir + file;

  // Split the image into sections when the canvas has loaded
  picture.onload = function() {
    curImage = picture;

    splitImage(picture);
    nextFrame();

  };
}

var request = 0;

function nextFrame() {
  if (request > 100) {
    cancelAnimationFrame(request);
  } else {
    request = requestAnimationFrame(nextFrame);
  }
  if (request%4 == 0) {
    splitImage(curImage);
  }
}

/**
 * Split the image into sections in a random order
 */
function splitImage(image) {
  var sections = new Array(GRID_TOTAL);

  // Fill array with linear sequence up to the size of the grid
  for (var i=0; i<sections.length; i++) {
    sections[i] = i+1;
  }

  // Cycle through each cell of the grid
  for (var cell=1; cell<=GRID_TOTAL; cell++) {

    // Get a random section of the image
    var pos = Math.floor(Math.random() * sections.length);

    // Create a tile using it
    drawTile(image, sections[pos], cell)

    // Remove the selected part of the image from "sections"
    sections.splice(pos, 1);

  }

  // Blank one random cell
  blankCell = Math.floor(Math.random() * GRID_TOTAL)+1;
  var grid = new Image();
  grid.src = srcDir + "grid1.png";

  grid.onload = function() {
    drawTile(grid, 1, blankCell);
  };
}

function test(a, b) {
  // Create image element
  var picture = new Image();
  picture.src = srcDir + srcList[0];

  // Split the image into sections when the canvas has loaded
  picture.onload = function() {
    drawTile(picture, a, b);
  };
}


/**
 * Draw a part of an image at a particular location on the grid
 * @param image The image to get a cell from
 * @param section The grid cell of the image to draw
 * @param drawAt The grid cell of the the canvas to draw the section at
 */
function drawTile(image, section, drawAt) {
  // if (section > 9 || section < 1 || drawAt > 9 || drawAt < 1) {
  //   console.error(`section: ${section}, drawAt: ${drawAt}`);
  // } else {
  //   console.info(`dt section: ${section}, drawAt: ${drawAt}`);
  // }
  var imageCell = new gridCell(image, section);
  var canvasCell = new gridCell(image, drawAt);
  // console.log(imageCell);
  // console.log(canvasCell);

  /*// Draw image onto canvas
  context.drawImage(image,
  // Crop a section of the image
  imageCell.posX, imageCell.posY, imageCell.width, imageCell.height,
  // Draw the image to fill the canvas
  canvasCell.posX, canvasCell.posY, canvasCell.width, canvasCell.height);*/

// context.drawImage(image, imageCell.pos.x, imageCell.pos.y);
  var cellX = getGridX(section),
      cellY = getGridY(section);

  // Position on canvas
   var canvasX = (getGridX(drawAt) - 1) * GRID_CELL_WIDTH,
       canvasY = (getGridY(drawAt) - 1) * GRID_CELL_HEIGHT;

  context.drawImage(image, image.width/GRID_WIDTH * (cellX - 1), image.height/GRID_HEIGHT * (cellY - 1),
  image.width/GRID_WIDTH, image.height/GRID_HEIGHT,
  canvasX, canvasY, GRID_CELL_WIDTH, GRID_CELL_HEIGHT);
}

function gridCell(parent, num) {
  this.cellX = function() {
    if (id%GRID_WIDTH == 0) {
      return GRID_WIDTH;
    } else {
      return id%GRID_WIDTH;
    }
  };
  this.cellY = function() {
    return Math.ceil(id/GRID_HEIGHT);
  }
  this.posX = function() {
    console.log(parent.width/GRID_WIDTH * (this.cellX - 1));
    return parent.width/GRID_WIDTH * (this.cellX - 1);
  };
  this.posY = function() {
    return parent.height/GRID_HEIGHT * (this.cellY - 1);
  };
  this.width = function() {
    return parent.width/GRID_WIDTH;
  };
  this.height = function() {
    return parent.height/GRID_HEIGHT;
  };
}

/**
 * Move a tile from one position in the grid to another
 */
function swapTile(posFrom, posTo) {

}

/**
 * Get the X position of an image within the grid based on its ID
 */
function getGridX(id) {
  if (id%GRID_WIDTH == 0) {
    return GRID_WIDTH;
  } else {
    return id%GRID_WIDTH;
  }
}

/**
 * Get the Y position of an image within the grid based on its ID
 */
function getGridY(id) {
  return Math.ceil(id/GRID_HEIGHT);
}



function init() {
  // Choose a random image from "srcList"
  var i = Math.floor(Math.random() * srcList.length);
  // Create an image using it;
  createImage(srcList[i]);
}

init();