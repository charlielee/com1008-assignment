/*!
  JavaScript for Block Slider 3 game
  Author: Charles Lee
  Created: 11/11/16
*/

// Images to use
var srcDir   = "img/block-slider-3/",
    srcList  = ["1.jpg", "2.png", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg"];

// Game area canvas
var canvas  = document.getElementById("game-area"),
    context = canvas.getContext("2d");

const CANVAS_WIDTH  = canvas.width,
      CANVAS_HEIGHT = canvas.height;

// Game area grid
const GRID_WIDTH       = 3,
      GRID_HEIGHT      = 3,
      GRID_TOTAL       = GRID_WIDTH * GRID_HEIGHT,
      GRID_CELL_WIDTH  = canvas.width/GRID_WIDTH,
      GRID_CELL_HEIGHT = canvas.height/GRID_HEIGHT;

// Gameplay state
var currentBoard = [],
    blankCell    = {},
    curImage,
    noOfMoves    = 0;

/**
 * Creates an image element for a file listed in "srcList"
 */
function createImage(file) {
  // Create image element
  curImage = new Image();
  curImage.src = srcDir + file;

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
  var blankCellNo = Math.floor(Math.random() * GRID_TOTAL)+1;

  var blankImage = new Image();
  blankImage.src = srcDir + "blank.png";

  blankImage.onload = function() {
    drawTile(blankImage, 1, blankCellNo);

    blankCell.j    = getGridX(blankCellNo);
    blankCell.i    = getGridY(blankCellNo);
    blankCell.pos  = getPosition(blankCell.j, blankCell.i);
    blankCell.img  = blankImage;
    // The part of the image the blank cell has replaced
    blankCell.orig = currentBoard[blankCellNo-1];
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
 * Get the chronological position of of a grid cell
 */
function getPosition(j, i) {
  return j + (i-1)*GRID_WIDTH;
}

/**
 * Get the position of the mouse within the canvas
 * (from COM1008 lecture 15)
 */
function getMouseXY(e) {
  var boundingRect = canvas.getBoundingClientRect(),
      offsetX      = boundingRect.left,
      offsetY      = boundingRect.top,
      w            = (boundingRect.width-canvas.width)/2,
      h            = (boundingRect.height-canvas.height)/2;

  offsetX += w;
  offsetY += h;

  var mx = Math.round(e.clientX-offsetX),
      my = Math.round(e.clientY-offsetY);

  // Return object with mouse coordinates
  return {x: mx, y: my};
}

/**
 * Check if mouse is inside a grid cell
 * (from COM1008 lecture 15)
 */
function whichGridCell(x, y) {
  if (x<0) x = 0;
  if (y<0) y = 0;
  if (x>=CANVAS_WIDTH) x = CANVAS_WIDTH-1;
  if (y>=CANVAS_HEIGHT) y = CANVAS_HEIGHT-1;
  var gx = Math.floor(x/GRID_CELL_WIDTH)+1;
  var gy = Math.floor(y/GRID_CELL_HEIGHT)+1;
  // need to be careful here
  // x, y on screen is j,i in grid
  return {j: gx, i: gy};
}

/**
 * When a grid cell is selected
 */
function selectCell(e) {
  // Get the coordinates of the grid cell
  var pos = getMouseXY(e),
      gridCell = whichGridCell(pos.x, pos.y),
      chronPos = getPosition(gridCell.j, gridCell.i),
      section = currentBoard[chronPos-1];

  // Check if selected cell is next to blank cell
  if (gridCell.j == blankCell.j && gridCell.i != blankCell.i ||
      gridCell.j != blankCell.j && gridCell.i == blankCell.i) {
    // Swap positions of blank cell and the selected cell
    drawTile(curImage, currentBoard[chronPos-1], blankCell.pos);
    drawTile(blankCell.img, 1, chronPos);

    // Update position of blank cell with value of selected cell
    currentBoard[blankCell.pos-1] = section;
    // Update position of selected cell with blank cell original value
    currentBoard[chronPos-1] = blankCell.orig;

    // Update blank cell position
    blankCell.j = gridCell.j;
    blankCell.i = gridCell.i;
    blankCell.pos = getPosition(blankCell.j, blankCell.i);

    // Check if board completed
    if(isFinished()) {
      gameComplete();
    } else {
      updateScore();
    }
  }
}

function isFinished() {
  var finishedTiles = 0;

  for (var i=0; i<GRID_TOTAL; i++) {
    if (currentBoard[i] == i+1) {
      finishedTiles++;
    }
  }

  if (finishedTiles == GRID_TOTAL) {
    return true;
  } else {
    return false;
  }
}

function updateScore() {
  var scoreDisplay = document.getElementById("no-of-moves");
  noOfMoves++
  scoreDisplay.textContent = noOfMoves;
}

function gameComplete() {
  // Fill in the blanked out tile
  drawTile(curImage, blankCell.orig, blankCell.pos);
  context.font = "3em Verdana";
  context.fillStyle = "rgb(255,255,0)";
  context.fillText("Puzzle complete!", CANVAS_WIDTH/8, CANVAS_HEIGHT/2);
}

function init() {
  // Choose a random image from "srcList"
  var i = Math.floor(Math.random() * srcList.length);
  // Create an image using it;
  createImage(srcList[i]);
}

canvas.addEventListener("click", selectCell);

init();
