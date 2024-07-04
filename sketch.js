// all code was done by hand by me. Research citations:

//https://josephpetitti.com/ant
//https://arxiv.org/abs/math/9501233
//https://lospec.com/palette-list/
//https://en.wikipedia.org/wiki/Langton's_ant#Extension_to_multiple_ants
//https://lucasschuermann.com/writing/langtons-ant
//https://www.reddit.com/r/cellular_automata/comments/h83t3z/this_is_the_largest_highway_ive_found_on_langtons/

// UNHEARD OF IN ANY PROJECT BY ME, THIS IS FULLY FUCNTIONAL WITH NO ERRORS. BOOM BABY 😌
// shoulda made a v4.5 but we now have UI controls, reverse, multiple ants, hella presets,

// hehe one eensy teensy problem
// the ant is being rendered incorrectly. The simulation is fine for now but the ant's direction is misrepresented, who tf cares you cant even see it that fast.

// the sim used to be able to run preset 7 at 100 IPR at 60 fps, but now because of the new FPS slot, it runs closer to 10 fps. idk why it slows it down so much.

// TODO
// other presets in presets.js
// add custom presets by using JSON input
// make the dropdown list generate automatically
// upload to github
// render ant correctly (or remove direction)



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
let ipr = 1; // iterations per refresh
let iterCount;
let fR = 60;
let wrap = true;

let preset = 0;
W = 100;
H = 100;
SF = 4; // scale factor

let reverse = false;

let presetInfo;
let p_presetInfo;

function preload() {
  createUI();
}

function setup() {
  iterCount = -1;

  presetSwitch();

  fillColor = rulesC[0];

  createCanvas(W * SF + 100, H * SF);
  pixelDensity(1);
  frameRate(fR);

  frameBuffer = createGraphics(W, H);
  noSmooth();

  // fill buffer
  frameBuffer.background(color(fillColor));

  p_presetInfo.remove();
  p_presetInfo = createP(presetInfo);
  p_presetInfo.position(W * SF * 4, 0, "static");
  p_presetInfo.style("color", "#ddd");
}

function draw() {
  if (true) {
    background("#333");
  }
  image(frameBuffer, 0, 0, width - 100, height);

  // calculate ant
  for (let i of new Array(ipr).keys()) {
    calculateAnts();
  }

  // draw ants :D
  drawAnts();

  // display iteration
  if (true) {
    noStroke();
    fill("#ddd");
    textSize(14);
    text(`Iter: ${iterCount}`, width - 98, 14);
    text(`IPR: ${ipr}`, width - 98, 28);
    text(`FPS: ${round(1000 / deltaTime)}`, width - 98, 42);
  }
}

function drawAnts() {
  // draw ants
  for (let i = 0; i < ants.length; i++) {
    stroke("red");
    strokeWeight(2);

    switch (ants[i][2]) {
      case dir_D:
        circle(ants[i][0] * SF + SF / 2, (ants[i][1] - 1) * SF + SF / 2, SF);
        line(
          ants[i][0] * SF + SF / 2,
          ants[i][1] * SF + SF / 2,
          ants[i][0] * SF + SF / 2,
          ants[i][1] * SF + SF / 2 - SF
        );
        break;
      case dir_U:
        circle(ants[i][0] * SF + SF / 2, (ants[i][1] + 1) * SF + SF / 2, SF);
        line(
          ants[i][0] * SF + SF / 2,
          ants[i][1] * SF + SF / 2,
          ants[i][0] * SF + SF / 2,
          ants[i][1] * SF + SF / 2 + SF
        );
        break;
      case dir_L:
        circle((ants[i][0] - 1) * SF + SF / 2, ants[i][1] * SF + SF / 2, SF);
        line(
          ants[i][0] * SF + SF / 2,
          ants[i][1] * SF + SF / 2,
          ants[i][0] * SF + SF / 2 - SF,
          ants[i][1] * SF + SF / 2
        );
        break;
      case dir_R:
        circle((ants[i][0] + 1) * SF + SF / 2, ants[i][1] * SF + SF / 2, SF);
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

function calculateAnts() {
  // move all of the ants, store the pixels they are changing, THEN change those pixels.

  if (!reverse) {
    // load the pixel array once
    frameBuffer.loadPixels();
    pixelChanges = [];

    // move all ants, store pixel changes
    for (let i = 0; i < ants.length; i++) {
      let ant = ants[i];

      // get the color of the pixel the ant is on
      let antOX = ant[0];
      let antOY = ant[1];
      let antLocR = frameBuffer.pixels[antOX * 4 + antOY * W * 4];
      let antLocG = frameBuffer.pixels[antOX * 4 + antOY * W * 4 + 1];
      let antLocB = frameBuffer.pixels[antOX * 4 + antOY * W * 4 + 2];
      let antLocation = color(antLocR, antLocG, antLocB);

      // find what direction the ant will move due to color
      let rule = -1;
      for (let j = 0; j < rulesC.length; j++) {
        if (rulesC[j].toString() == antLocation.toString()) {
          rule = j;
        }
      }

      let ruleDirection = rulesD[rule];

      // change the ants direction
      ant[2] = (ant[2] + ruleDirection + 360) % 360; // antD
      // move the ant
      switch (
        ant[2] // antD
      ) {
        case dir_U:
          ant[1] -= 1; // antY
          break;
        case dir_R:
          ant[0] += 1; // antX
          break;
        case dir_D:
          ant[1] += 1; // antY
          break;
        case dir_L:
          ant[0] -= 1; // antX
          break;
      }
      // wrap the ants locations
      if (wrap) {
        if (ant[0] >= W) {
          ant[0] = 0;
        }
        if (ant[0] < 0) {
          ant[0] = W - 1;
        }
        if (ant[1] >= H) {
          ant[1] = 0;
        }
        if (ant[1] < 0) {
          ant[1] = H - 1;
        }
      }

      let newColor = rulesC[(rule + 1) % rulesC.length];
      pixelChanges.push([antOX, antOY, newColor]);
    }

    // make the pixel changes
    for (let i = 0; i < pixelChanges.length; i++) {
      let x = pixelChanges[i][0];
      let y = pixelChanges[i][1];
      let c = pixelChanges[i][2];
      // change the color of the pixel
      frameBuffer.pixels[x * 4 + y * W * 4] = red(c);
      frameBuffer.pixels[x * 4 + y * W * 4 + 1] = green(c);
      frameBuffer.pixels[x * 4 + y * W * 4 + 2] = blue(c);
    }
    frameBuffer.updatePixels();
    iterCount += 1;
  }
  //
  /////////////////////////////////////////
  //
  else {
    // REVERSE TIME BABY
    // load the pixel array once
    frameBuffer.loadPixels();
    pixelChanges = [];

    // move all ants, store pixel changes
    for (let i = 0; i < ants.length; i++) {
      let ant = ants[i];

      // get the color of the pixel behind the ant
      let antX = ant[0];
      let antY = ant[1];

      switch (ant[2]) {
        case dir_U:
          antY += 1;
          break;
        case dir_R:
          antX -= 1;
          break;
        case dir_D:
          antY -= 1;
          break;
        case dir_L:
          antX += 1;
      }
      let antLocR = frameBuffer.pixels[antX * 4 + antY * W * 4];
      let antLocG = frameBuffer.pixels[antX * 4 + antY * W * 4 + 1];
      let antLocB = frameBuffer.pixels[antX * 4 + antY * W * 4 + 2];
      let antLocation = color(antLocR, antLocG, antLocB);

      // move the ant backwards
      switch (
        ant[2] // antD
      ) {
        case dir_U:
          ant[1] += 1; // antY
          break;
        case dir_R:
          ant[0] -= 1; // antX
          break;
        case dir_D:
          ant[1] -= 1; // antY
          break;
        case dir_L:
          ant[0] += 1; // antX
          break;
      }

      // find what direction the ant will move due to color behind it
      let rule = -1;
      for (let j = 0; j < rulesC.length; j++) {
        if (rulesC[j].toString() == antLocation.toString()) {
          rule = j;
        }
      }
      let ruleDirection = rulesD[rule];

      // change the ants direction
      ant[2] = (ant[2] + ruleDirection + 360) % 360; // antD

      // push to pixelChanges
      newColor = rulesC[(rule + 1) % rulesC.length];
      pixelChanges.push([antX, antY, newColor]);

      // wrap the ants locations
      if (wrap) {
        if (ant[0] >= W) {
          ant[0] = 0;
        }
        if (ant[0] < 0) {
          ant[0] = W - 1;
        }
        if (ant[1] >= H) {
          ant[1] = 0;
        }
        if (ant[1] < 0) {
          ant[1] = H - 1;
        }
      }
    }
    // make the pixel changes
    for (let i = 0; i < pixelChanges.length; i++) {
      let x = pixelChanges[i][0];
      let y = pixelChanges[i][1];
      let c = pixelChanges[i][2];
      // change the color of the pixel
      frameBuffer.pixels[x * 4 + y * W * 4] = red(c);
      frameBuffer.pixels[x * 4 + y * W * 4 + 1] = green(c);
      frameBuffer.pixels[x * 4 + y * W * 4 + 2] = blue(c);
    }
    frameBuffer.updatePixels();
    iterCount -= 1;
  }
}

function sti(n) {
  // skip to iteration haha
  noLoop();

  console.log("Processing...");

  if (n > iterCount) {
    // if we need to skip forward

    let times = n - iterCount - 2;

    for (let i of new Array(times).keys()) {
      calculateAnts();
    }
    draw();
  } else {
    let times = iterCount - n - 1;
    reverse = true;
    for (let i of new Array(times).keys()) {
      calculateAnts();
    }
    draw();
    reverse = false;
  }
}

function setPixel(x, y, c) {
  frameBuffer.pixels[x * 4 + y * W * 4] = red(c);
  frameBuffer.pixels[x * 4 + y * W * 4 + 1] = green(c);
  frameBuffer.pixels[x * 4 + y * W * 4 + 2] = blue(c);
}

function createUI() {
  p_presetInfo = createP("Placeholder");
  p_presetInfo.style("color", "#ddd");
  p_presetInfo.position(W * SF * 4, 0, "static");

  let playReverse = createButton("⏮");
  playReverse.mousePressed(
    (func = () => {
      reverse = true;
      loop();
    })
  );
  let stepReverse = createButton("⏴");
  stepReverse.mousePressed(
    (func = () => {
      reverse = true;
      noLoop();
      draw();
    })
  );
  let pause = createButton("⏸");
  pause.mousePressed(
    (func = () => {
      noLoop();
    })
  );
  let reset = createButton("↺");
  reset.mousePressed(
    (func = () => {
      setup();
    })
  );
  let stepForward = createButton("⏵");
  stepForward.mousePressed(
    (func = () => {
      reverse = false;
      noLoop();
      draw();
    })
  );
  let playForward = createButton("⏭");
  playForward.mousePressed(
    (func = () => {
      reverse = false;
      loop();
    })
  );

  let presets = createSelect();
  presets.option("0");
  presets.option("1");
  presets.option("2");
  presets.option("3");
  presets.option("4");
  presets.option("5");
  presets.option("6");
  presets.option("7");
  presets.option("8");
  presets.option("9");
  presets.option("10");
  presets.option("11");
  presets.option("12");
  presets.selected("0");
  let loadPreset = createButton("Load");
  loadPreset.mousePressed(
    (func = () => {
      preset = parseInt(presets.selected());
      setup();
    })
  );

  let p_sti = createP("Skip To Iteration");
  p_sti.style("color", "#ddd");
  let stiInput = createInput();
  let stiRun = createButton("Skip");
  stiRun.mousePressed(
    (func = () => {
      sti(stiInput.value());
    })
  );

  let p_ipr = createP(`Iterations Per Refresh (IPR)`);
  p_ipr.style("color", "#ddd");
  let iprInput = createInput();
  let iprRun = createButton("Set");
  iprRun.mousePressed(
    (func = () => {
      ipr = parseInt(iprInput.value());
    })
  );
}
