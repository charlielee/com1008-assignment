/*!
  JavaScript for Block Slider 3 game
  Author: Charles Lee
  Created: 11/11/16
*/

var gameArea = document.getElementById("game-area"),
    context  = gameArea.getContext("2d"),
    srcDir   = "img/block-slider-3/",
    srcList  = ["1.jpg", "2.png", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg"];

// Game area grid
var GRID_WIDTH       = 3,
    GRID_HEIGHT      = 3,
    GRID_TOTAL       = GRID_WIDTH * GRID_HEIGHT,
    GRID_CELL_WIDTH  = gameArea.width/GRID_WIDTH,
    GRID_CELL_HEIGHT = gameArea.height/GRID_HEIGHT;

// Gameplay state
var currentBoard = [],
    blankCell    = 0,
    curImage;

/**
 * Creates an image element for a file listed in "srcList"
 */
function createImage(file) {
  // Create image element
  curImage = new Image();
  curImage.src = srcDir + "test.png";

  curImage.onload = function() {
    // On load split the image into sections
    splitImage(curImage);
  };
}

/**
 * Split the image into sections in a random order
 * @param {HTMLImageElement} image - The image to split into sections
 */
function splitImage(image) {
  // List of images parts that need assigning a grid cell
  var unassignedParts = new Array(GRID_TOTAL);

  // Fill array with linear sequence up to the size of the grid
  for (var i=0; i<unassignedParts.length; i++) {
    unassignedParts[i] = i+1;
  }

  // Cycle through each cell of the grid
  for (var cell=1; cell<=GRID_TOTAL; cell++) {

    // Get a random part of the image
    var partNo = Math.floor(Math.random() * unassignedParts.length);

    // Draw image part on the grid
    drawTile(image, unassignedParts[partNo], cell)

    // Add the part to list of current board positions
    currentBoard[cell-1] = unassignedParts[partNo];

    // Remove part from list of parts left to create
    unassignedParts.splice(partNo, 1);
  }

  // Blank one random cell of grid
  blankCell = Math.floor(Math.random() * GRID_TOTAL)+1;

  var blankImage = new Image();
  blankImage.src = srcDir + "blank.png";

  blankImage.onload = function() {
    drawTile(blankImage, 1, blankCell);
  };
}


/**
 * Draw a part of an image at a particular location on the grid
 * @param image The image to get a cell from
 * @param section The grid cell of the image to draw
 * @param drawAt The grid cell of the the canvas to draw the section at
 */
function drawTile(image, section, drawAt) {
  // Position to begin crop from in source image
  var sourceX = (getGridX(section) - 1) * image.width/GRID_WIDTH,
      sourceY = (getGridY(section) - 1) * image.height/GRID_HEIGHT;

  // Position on canvas
   var canvasX = (getGridX(drawAt) - 1) * GRID_CELL_WIDTH,
       canvasY = (getGridY(drawAt) - 1) * GRID_CELL_HEIGHT;

  context.drawImage(image,
    // Coordinates and size of crop from source image
    sourceX, sourceY, image.width/GRID_WIDTH, image.height/GRID_HEIGHT,
    // Coordinates and size of grid cell to draw on canvas
    canvasX, canvasY, GRID_CELL_WIDTH, GRID_CELL_HEIGHT
  );
}

/**
 * Get the X position of an image within the grid based on its position
 */
function getGridX(position) {
  if (position%GRID_WIDTH == 0) {
    return GRID_WIDTH;
  } else {
    return position%GRID_WIDTH;
  }
}

/**
 * Get the Y position of an image within the grid based on its position
 */
function getGridY(position) {
  return Math.ceil(position/GRID_HEIGHT);
}

/**
 * Move a tile from one position in the grid to another
 */
function swapTile(posFrom, posTo) {

}

function init() {
  // Choose a random image from "srcList"
  var i = Math.floor(Math.random() * srcList.length);
  // Create an image using it;
  createImage(srcList[i]);
}

init();



















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



function test(a, b) {
  // Create image element
  var picture = new Image();
  picture.src = srcDir + srcList[0];

  // Split the image into sections when the canvas has loaded
  picture.onload = function() {
    drawTile(picture, a, b);
  };
}
