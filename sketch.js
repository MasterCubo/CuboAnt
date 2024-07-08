// all code was done by hand by me. Research citations:

//https://josephpetitti.com/ant
//https://arxiv.org/abs/math/9501233
//https://lospec.com/palette-list/
//https://en.wikipedia.org/wiki/Langton's_ant#Extension_to_multiple_ants
//https://lucasschuermann.com/writing/langtons-ant
//https://www.reddit.com/r/cellular_automata/comments/h83t3z/this_is_the_largest_highway_ive_found_on_langtons/
//https://mathtician.weebly.com/langtons-ant.html

// NOTICE
// in js, ANY `let new = arr` creates a REFERENCE of the array, even if its 1D. Use `let new = Array.from(arr)` `arr.slice()` or `[...arr]` instead

// TODO
// allow for custom rulesets using JSON (I could make a null preset for custom uploads, and then set the custom preset in the load button function))
// allow for custom palletes using JSON (you cant rn because I have the preset loading in the setup phase :D 
// set mobile zoom to 200? idk
// move presetInfo update to handlePresetHTML
// make neumorphic UI? (new version pls cuz it might look dumb on all the buttons)


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
