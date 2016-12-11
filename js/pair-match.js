var gameArea = document.getElementById("game-area"),
    context  = gameArea.getContext("2d"),
    srcDir = "img/pair-match/",
    srcList  = ["1.jpg", "2.png", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg", "8.jpg"],
    tileList  = [];

var totalImages = 0;

var GRID_WIDTH  = 3,
    GRID_HEIGHT = 3;

var GRID_CELL_WIDTH = gameArea.width/GRID_WIDTH,
    GRID_CELL_HEIGHT = gameArea.height/GRID_HEIGHT;


function createGrid() {
  while (srcList.length > 0) {
    // Get a random img from "srcList"
    var pos = Math.floor(Math.random() * srcList.length);
    console.log(`length: ${srcList.length}, pos: ${pos}`);
    // Create a tile using it
    createImage(srcList[pos]);
    // Remove the img from "srcList"
    srcList.splice(pos, 1);
  }
  console.log(tileList);
}

createGrid();


/**
 * Creates a new tile for the game area
 */
function Tile(img) {
  this.debug = img.src.substr(-5);
  this.img = img;
  this.id = totalImages;
  this.pos = {
    x: getGridX(this.id),
    y: getGridY(this.id)
  }
}

/**
 * Creates an image element for a file listed in "srcList"
 */
function createImage(file) {
  // Create image element
  var picture = new Image();
  picture.src = srcDir + file;

  // Create a tile from the image
  picture.onload = function() {
    totalImages++;
    var tile = new Tile(picture);
    tileList.push(tile);

    drawImage(tile);

  }
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

/**
 * Draw a tile on the grid
 */
function drawImage(tile) {
  // Position on canvas
  var canvasX = (tile.pos.x - 1) * GRID_CELL_WIDTH,
      canvasY = (tile.pos.y - 1) * GRID_CELL_HEIGHT;

  // Draw image onto canvas
  context.drawImage(tile.img,
  // Crop the center of the of the image
  tile.img.width/8, tile.img.height/8, tile.img.width*3/4, tile.img.height*3/4,
  // Draw the image on the grid at the grid position specified
  canvasX, canvasY, GRID_CELL_WIDTH, GRID_CELL_HEIGHT);
}