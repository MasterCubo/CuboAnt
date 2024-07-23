// all code was done by hand by me. Research citations:

//https://josephpetitti.com/ant
//https://arxiv.org/abs/math/9501233
//https://lospec.com/palette-list/
//https://en.wikipedia.org/wiki/Langton's_ant#Extension_to_multiple_ants
//https://lucasschuermann.com/writing/langtons-ant
//https://www.reddit.com/r/cellular_automata/comments/h83t3z/this_is_the_largest_highway_ive_found_on_langtons/
//https://mathtician.weebly.com/langtons-ant.html

// TODO
// allow for custom rulesets using JSON (I could make a null preset for custom uploads, and then set the custom preset in the load button function))
// allow for custom palletes using JSON (you cant rn because I have the preset loading in the setup phase :D 
// set mobile zoom to 200? idk
// move presetInfo update to handlePresetHTML
// make neumorphic UI? (new version pls cuz it might look dumb on all the buttons)
// some user feedback for a dead ant
// add gif exporting (seperate div, enter dims, start iter, end iter, palette and ipr. you can speed up urself, provide link)
// //  https://nono.ma/export-gif-p5js ^^
// use vm or em or whatever in css to use all the available space :D
// move some presets back to the center (floor) so that you can give them more room to expand
// stop creating so many canvas objects
// add breaks in calculate ants if dir ever becomes NaN


// ERROR
// i tried fixing the fact that every call to restartSim() created another canvas element by using resizeCanvas() instead of createCanvas(), but this messed up the width and height changeing, by making the direction NaN somehow
// spamming loadPallete can effect the initial direction of the ant... this may be related to the first error
// i also tried overloading p5 in order to make reading the image data more effecient... but how much more effecient is it...
// given how much laggier a 800x800 canvas is than a 600x600, id figure a lot.

let W;
let H;
let SF;
let rulesC;
let rulesD;
let ants;

let turn_R = -90;
let turn_L = 90;
let turn_N = 0;
let turn_U = 180;

let dir_U = 0;
let dir_L = 90;
let dir_D = 180;
let dir_R = 270;

let frameBuffer;
let fillColor;
let ipr; // iterations per refresh
let iterCount;
let fR = 60;
//let wrap

W = 100;
H = 100;
SF = 4; // scale factor

let reverse;

let presetInfo;
let p_presetInfo;

let preset = 0;

let renderAnts;

let p_iterCount = document.getElementById("p_iterCount")
let p_fps = document.getElementById("p_fps")
let lastSecond
let fpsSum = 0

let wrap = document.getElementById("p_wrap")


function preload() {
  loadAllJSON(); // in presets.js
  
  handleUI(); // in UI.js

  Promise.all(...promises)
    .then((results) => {
      // idk !! tee hee
    })
    .catch((error) => {
      //console.error("Error loading JSON files: ", error);
      // this fires every time and nothing's wrong
    });
}

function setup() {
  loadPreset()  
  createCanvas(W*SF, H*SF)
  restartSim()
  lastSecond = millis()
  
}

function draw() {    
  
   // calculate ant
  for (let i of new Array(ipr).keys()) {
    calculateAnts();
  }
  
  image(frameBuffer, 0, 0, width, height);

  // draw ants :D
  if (document.getElementById("renderAnts").checked) {
    drawAnts();
    drawAntsDir();
  }
    
      // display iteration
  p_iterCount.innerText = iterCount
  
  fpsSum += 1000/deltaTime
  if (millis() - lastSecond >= 1000){
    
    let avgFPS = round(fpsSum/frameCount)
    p_fps.innerText = avgFPS
    fpsSum = 0
    frameCount = 0
    lastSecond = millis()
    
  }
  
}

function drawAnts() {
    for (let i = 0; i < ants.length; i++) {
      stroke("blue");
      noFill()
      strokeWeight(2);
      circle(ants[i][0] * SF + SF / 2, (ants[i][1]) * SF + SF / 2, SF);
    }
}

function drawAntsDir() {
  // draw ants
  for (let i = 0; i < ants.length; i++) {
    stroke("red");
    strokeWeight(2);

    switch (ants[i][2]) {
      case dir_U:
        line(
          ants[i][0] * SF + SF / 2,
          ants[i][1] * SF + SF / 2,
          ants[i][0] * SF + SF / 2,
          ants[i][1] * SF + SF / 2 - SF
        );
        break;
      case dir_D:
        line(
          ants[i][0] * SF + SF / 2,
          ants[i][1] * SF + SF / 2,
          ants[i][0] * SF + SF / 2,
          ants[i][1] * SF + SF / 2 + SF
        );
        break;
      case dir_L:
        line(
          ants[i][0] * SF + SF / 2,
          ants[i][1] * SF + SF / 2,
          ants[i][0] * SF + SF / 2 - SF,
          ants[i][1] * SF + SF / 2
        );
        break;
      case dir_R:
        line(
          ants[i][0] * SF + SF / 2,
          ants[i][1] * SF + SF / 2,
          ants[i][0] * SF + SF / 2 + SF,
          ants[i][1] * SF + SF / 2
        );
        break;
    }
  }
}


function setPixel(x, y, c) {
  frameBuffer.pixels[x * 4 + y * W * 4] = red(c);
  frameBuffer.pixels[x * 4 + y * W * 4 + 1] = green(c);
  frameBuffer.pixels[x * 4 + y * W * 4 + 2] = blue(c);
}
